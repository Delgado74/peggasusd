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
  }) async {
    if (_initialized) return;

    await BreezSdkSparkLib.init();
    initLogging();

    _mnemonic = mnemonic;

    final seed = Seed.mnemonic(mnemonic: mnemonic, passphrase: null);
    final config = defaultConfig(network: Network.mainnet)
        .copyWith(apiKey: apiKey);

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
