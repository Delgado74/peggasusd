import 'dart:async';
import 'package:breez_sdk_spark_flutter/breez_sdk_spark.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:logging/logging.dart';
import 'package:path_provider/path_provider.dart';

final Logger _logger = Logger('SdkService');

class SdkService {
  SdkService._();

  static final SdkService _instance = SdkService._();
  static SdkService get instance => _instance;

  BreezSdk? _sdk;
  BreezSdk? get sdk => _sdk;

  bool _initialized = false;
  bool get isInitialized => _initialized;

  String? _mnemonic;
  String? get mnemonic => _mnemonic;

  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  static const _mnemonicKey = 'peggasusd_mnemonic';
  static const _apiKeyKey = 'peggasusd_api_key';

  StreamSubscription<SdkEvent>? _eventSubscription;
  final StreamController<SdkEvent> _eventController =
      StreamController<SdkEvent>.broadcast();
  Stream<SdkEvent> get eventStream => _eventController.stream;

  final StreamController<GetInfoResponse> _infoController =
      StreamController<GetInfoResponse>.broadcast();
  Stream<GetInfoResponse> get infoStream => _infoController.stream;

  GetInfoResponse? _lastInfo;
  GetInfoResponse? get lastInfo => _lastInfo;

  // Token metadata is accessed via lastInfo.tokenBalances[tokenId].tokenMetadata

  Future<bool> hasStoredMnemonic() async {
    final mnemonic = await _storage.read(key: _mnemonicKey);
    return mnemonic != null && mnemonic.isNotEmpty;
  }

  Future<void> saveMnemonic(String mnemonic) async {
    await _storage.write(key: _mnemonicKey, value: mnemonic);
  }

  Future<String?> loadMnemonic() async {
    return await _storage.read(key: _mnemonicKey);
  }

  Future<void> saveApiKey(String apiKey) async {
    await _storage.write(key: _apiKeyKey, value: apiKey);
  }

  Future<String?> loadApiKey() async {
    return await _storage.read(key: _apiKeyKey);
  }

  Future<void> init({
    required String mnemonic,
    required String apiKey,
    String? storageDirPath,
    bool customOperators = true,
  }) async {
    if (_initialized) return;

    await BreezSdkSparkLib.init();
    initLogging();

    _mnemonic = mnemonic;

    final seed = Seed.mnemonic(mnemonic: mnemonic, passphrase: null);
    var config = defaultConfig(network: Network.mainnet)
        .copyWith(apiKey: apiKey);

    if (customOperators) {
      config = config.copyWith(sparkConfig: _customSparkConfig());
    }

    final dir = await getApplicationDocumentsDirectory();
    final storageDir = storageDirPath ?? '${dir.path}/spark_sdk';
    final connectRequest = ConnectRequest(
      config: config,
      seed: seed,
      storageDir: storageDir,
    );

    _sdk = await connect(request: connectRequest);
    _listenToEvents();
    _initialized = true;
    await refreshInfo();
    _logger.info('SDK initialized');
  }

  SparkConfig _customSparkConfig() {
    return SparkConfig(
      coordinatorIdentifier:
          '0000000000000000000000000000000000000000000000000000000000000001',
      threshold: 2,
      signingOperators: _customOperators(),
      sspConfig: _customSspConfig(),
      expectedWithdrawBondSats: BigInt.from(10000),
      expectedWithdrawRelativeBlockLocktime: BigInt.from(1000),
    );
  }

  List<SparkSigningOperator> _customOperators() {
    return [
      SparkSigningOperator(
        id: 1,
        identifier:
            '0000000000000000000000000000000000000000000000000000000000000002',
        address: 'https://spark-operator.breez.technology',
        identityPublicKey:
            '03e625e9768651c9be268e287245cc33f96a68ce9141b0b4769205db027ee8ed77',
        caCertPem: null,
      ),
      SparkSigningOperator(
        id: 2,
        identifier:
            '0000000000000000000000000000000000000000000000000000000000000003',
        address: 'https://2.spark.flashnet.xyz',
        identityPublicKey:
            '022eda13465a59205413086130a65dc0ed1b8f8e51937043161f8be0c369b1a410',
        caCertPem: null,
      ),
    ];
  }

  SparkSspConfig _customSspConfig() {
    return SparkSspConfig(
      baseUrl: 'https://api.lightspark.com',
      identityPublicKey:
          '023e33e2920326f64ea31058d44777442d97d7d5cbfcf54e3060bc1695e5261c93',
      schemaEndpoint: null,
    );
  }

  void _listenToEvents() {
    final stream = _sdk!.addEventListener();
    _eventSubscription = stream.listen((event) {
      _eventController.add(event);
      if (event is SdkEvent_Synced) {
        refreshInfo();
      }
    });
  }

  Future<void> refreshInfo() async {
    if (_sdk == null) return;
    try {
      final info =
          await _sdk!.getInfo(request: const GetInfoRequest(ensureSynced: false));
      _lastInfo = info;
      _infoController.add(info);
    } catch (e) {
      _logger.severe('Failed to refresh info: $e');
    }
  }

  Future<void> clearMnemonic() async {
    await _storage.delete(key: _mnemonicKey);
    await _storage.delete(key: _apiKeyKey);
  }

  Future<void> disconnect() async {
    await _eventSubscription?.cancel();
    await _sdk?.disconnect();
    _sdk = null;
    _initialized = false;
  }

  // ─── Onchain Bitcoin receive ────────────────────────────────────────────────

  Future<String> receiveBitcoinAddress({bool newAddress = false}) async {
    final request = ReceivePaymentRequest(
      paymentMethod: ReceivePaymentMethod.bitcoinAddress(
        newAddress: newAddress,
      ),
    );
    final response = await _sdk!.receivePayment(request: request);
    await refreshInfo();
    return response.paymentRequest;
  }

  // ─── Lightning / SAT receive ──────────────────────────────────────────────

  Future<String> receiveLightningInvoice({
    String? description,
    BigInt? amountSats,
    int? expirySecs,
  }) async {
    final request = ReceivePaymentRequest(
      paymentMethod: ReceivePaymentMethod.bolt11Invoice(
        description: description ?? 'PEGGASUSD',
        amountSats: amountSats,
        expirySecs: expirySecs,
        paymentHash: null,
      ),
    );
    final response = await _sdk!.receivePayment(request: request);
    await refreshInfo();
    return response.paymentRequest;
  }

  Future<String> receiveSparkAddress() async {
    final request = ReceivePaymentRequest(
      paymentMethod: ReceivePaymentMethod.sparkAddress(),
    );
    final response = await _sdk!.receivePayment(request: request);
    await refreshInfo();
    return response.paymentRequest;
  }

  // ─── Token receive (USD) ───────────────────────────────────────────────────

  Future<String> receiveTokenInvoice({
    required String tokenIdentifier,
    String? description,
    BigInt? amount,
  }) async {
    final request = ReceivePaymentRequest(
      paymentMethod: ReceivePaymentMethod.sparkInvoice(
        tokenIdentifier: tokenIdentifier,
        description: description ?? 'PEGGASUSD',
        amount: amount,
        expiryTime: null,
        senderPublicKey: null,
      ),
    );
    final response = await _sdk!.receivePayment(request: request);
    await refreshInfo();
    return response.paymentRequest;
  }

  // ─── Send payment ─────────────────────────────────────────────────────────

  Future<InputType> parseInput({required String input}) async {
    return await _sdk!.parse(input: input);
  }

  Future<PrepareSendPaymentResponse> prepareSendPayment({
    required String input,
    BigInt? amount,
    String? tokenIdentifier,
    ConversionOptions? conversionOptions,
    FeePolicy? feePolicy,
  }) async {
    final request = PrepareSendPaymentRequest(
      paymentRequest: PaymentRequest.input(input: input),
      amount: amount,
      tokenIdentifier: tokenIdentifier,
      conversionOptions: conversionOptions,
      feePolicy: feePolicy,
    );
    return await _sdk!.prepareSendPayment(request: request);
  }

  Future<Payment> sendPayment({
    required PrepareSendPaymentResponse prepareResponse,
    SendPaymentOptions? options,
    String? idempotencyKey,
  }) async {
    final request = SendPaymentRequest(
      prepareResponse: prepareResponse,
      options: options,
      idempotencyKey: idempotencyKey,
    );
    final response = await _sdk!.sendPayment(request: request);
    await refreshInfo();
    return response.payment;
  }

  // ─── Token conversion (swap SAT ↔ USD) ───────────────────────────────────

  Future<FetchConversionLimitsResponse> fetchConversionLimits({
    required ConversionType conversionType,
    String? tokenIdentifier,
  }) async {
    return await _sdk!.fetchConversionLimits(
      request: FetchConversionLimitsRequest(
        conversionType: conversionType,
        tokenIdentifier: tokenIdentifier,
      ),
    );
  }

  // ─── List payments ────────────────────────────────────────────────────────

  Future<List<Payment>> listPayments({
    List<PaymentType>? typeFilter,
    List<PaymentStatus>? statusFilter,
    AssetFilter? assetFilter,
    int? fromTimestamp,
    int? toTimestamp,
    int? offset,
    int? limit,
    bool sortAscending = false,
  }) async {
    final request = ListPaymentsRequest(
      typeFilter: typeFilter,
      statusFilter: statusFilter,
      assetFilter: assetFilter,
      fromTimestamp: fromTimestamp != null ? BigInt.from(fromTimestamp) : null,
      toTimestamp: toTimestamp != null ? BigInt.from(toTimestamp) : null,
      offset: offset ?? 0,
      limit: limit ?? 50,
      sortAscending: sortAscending,
    );
    final response = await _sdk!.listPayments(request: request);
    return response.payments;
  }

  // ─── Lightning Address ────────────────────────────────────────────────────

  Future<LightningAddressInfo?> getLightningAddress() async {
    try {
      return await _sdk!.getLightningAddress();
    } catch (_) {
      return null;
    }
  }

  void dispose() {
    _eventSubscription?.cancel();
    _eventController.close();
    _infoController.close();
  }
}
