import 'package:breez_sdk_spark_flutter/breez_sdk_spark.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../sdk_service.dart';
import 'history_screen.dart';
import 'receive_screen.dart';
import 'send_screen.dart';
import 'settings_screen.dart';
import 'about_screen.dart';
import 'welcome_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final SdkService _sdk = SdkService.instance;
  GetInfoResponse? _info;
  List<Payment> _recentPayments = [];
  bool _showUsd = false;
  bool _usdInfoShown = false;
  final _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _loadData();
    _sdk.infoStream.listen((info) {
      if (mounted) setState(() => _info = info);
    });
    _sdk.eventStream.listen((event) {
      if (event is SdkEvent_Synced || event is SdkEvent_PaymentSucceeded) {
        _loadPayments();
      }
    });
  }

  Future<void> _loadData() async {
    _info = _sdk.lastInfo;
    await _loadPayments();
  }

  Future<void> _loadPayments() async {
    try {
      final payments = await _sdk.listPayments(limit: 5);
      if (mounted) setState(() => _recentPayments = payments);
    } catch (_) {}
  }

  String _formatSats(BigInt sats) {
    final n = sats.toInt();
    if (n >= 1000000) return '${(n / 1000000).toStringAsFixed(2)}M';
    if (n >= 1000) return '${(n / 1000).toStringAsFixed(1)}K';
    final f = NumberFormat('#,###');
    return f.format(n);
  }

  String _formatToken(BigInt? balance, int decimals) {
    if (balance == null) return '0';
    final val = balance.toInt();
    final divisor = BigInt.from(10).pow(decimals).toInt();
    final formatted = (val / divisor).toStringAsFixed(2);
    final f = NumberFormat('#,##0.00');
    return f.format(double.parse(formatted));
  }

  String _formatSatsFull(BigInt sats) {
    final f = NumberFormat('#,###');
    return '${f.format(sats.toInt())} sats';
  }

  void _openDrawer() {
    _scaffoldKey.currentState?.openDrawer();
  }

  void _toggleBalance() {
    final showUsd = !_showUsd;
    if (showUsd && !_usdInfoShown) {
      _usdInfoShown = true;
      _showUsdInfoDialog();
    } else {
      setState(() => _showUsd = showUsd);
    }
  }

  void _showUsdInfoDialog() {
    final theme = Theme.of(context);
    final ticker = _info?.tokenBalances.values.firstOrNull
        ?.tokenMetadata.ticker ?? 'USD';
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Saldo en USD'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.currency_exchange,
                    color: theme.colorScheme.primary),
                const SizedBox(width: 8),
                Text('$ticker (Spark Token)',
                    style: const TextStyle(fontWeight: FontWeight.w600)),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              'Tu saldo en USD está respaldado por Spark Tokens, '
              'una moneda estable con paridad 1:1 con el dólar.',
              style: TextStyle(
                color: theme.colorScheme.onSurfaceVariant,
                fontSize: 14,
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Icon(Icons.info_outline,
                    size: 18, color: theme.colorScheme.primary),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Montos menores a 1 $ticker se acumulan '
                    'automáticamente hasta completar la unidad.',
                    style: TextStyle(
                      fontSize: 13,
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(ctx).pop();
              setState(() => _showUsd = true);
            },
            child: const Text('Entendido'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final sats = _info?.balanceSats ?? BigInt.zero;
    final tokenBalances = _info?.tokenBalances ?? {};
    final firstToken =
        tokenBalances.entries.isNotEmpty ? tokenBalances.entries.first : null;

    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        title: const Text('PEGGASUSD'),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: _openDrawer,
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadData,
          ),
        ],
      ),
      drawer: _buildDrawer(theme),
      body: RefreshIndicator(
        onRefresh: _loadData,
        child: ListView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          children: [
            const SizedBox(height: 20),
            // Balance card - tap to toggle SAT/USD
            GestureDetector(
              onTap: () => _toggleBalance(),
              child: Card(
                elevation: 0,
                color: theme.colorScheme.surfaceContainerHighest,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(
                      vertical: 32, horizontal: 24),
                  child: Column(
                    children: [
                      Text(
                        _showUsd ? 'USD Balance' : 'Bitcoin Balance',
                        style: theme.textTheme.titleMedium
                            ?.copyWith(color: theme.colorScheme.onSurfaceVariant),
                      ),
                      const SizedBox(height: 12),
                      if (_showUsd && firstToken != null) ...[
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(top: 4),
                              child: Text('\$',
                                  style: theme.textTheme.headlineMedium
                                      ?.copyWith(
                                          fontWeight: FontWeight.bold,
                                          color: theme
                                              .colorScheme.onSurfaceVariant)),
                            ),
                            Text(
                              _formatToken(
                                firstToken.value.balance,
                                firstToken.value.tokenMetadata.decimals,
                              ),
                              style: theme.textTheme.headlineLarge
                                  ?.copyWith(fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                        Text(
                          firstToken.value.tokenMetadata.ticker,
                          style: theme.textTheme.titleMedium
                              ?.copyWith(color: theme.colorScheme.onSurfaceVariant),
                        ),
                      ] else ...[
                        Text(
                          _formatSats(sats),
                          style: theme.textTheme.headlineLarge
                              ?.copyWith(fontWeight: FontWeight.bold),
                        ),
                        const Text('sats',
                            style: TextStyle(
                                fontSize: 16, color: Colors.grey)),
                      ],
                      const SizedBox(height: 12),
                      Text(
                        _formatSatsFull(sats),
                        style: theme.textTheme.bodySmall
                            ?.copyWith(color: theme.colorScheme.onSurfaceVariant),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'toca para cambiar',
                        style: theme.textTheme.bodySmall
                            ?.copyWith(color: Colors.grey[500]),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(height: 24),
            // Send / Receive buttons
            Row(
              children: [
                Expanded(
                  child: SizedBox(
                    height: 56,
                    child: FilledButton.icon(
                      onPressed: () => Navigator.of(context).push(
                        MaterialPageRoute(
                            builder: (_) => const ReceiveScreen()),
                      ),
                      icon: const Icon(Icons.qr_code),
                      label: const Text('Recibir'),
                      style: FilledButton.styleFrom(
                        backgroundColor: theme.colorScheme.primary,
                        foregroundColor: theme.colorScheme.onPrimary,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(14)),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: SizedBox(
                    height: 56,
                    child: FilledButton.icon(
                      onPressed: () => Navigator.of(context).push(
                        MaterialPageRoute(
                            builder: (_) => const SendScreen()),
                      ),
                      icon: const Icon(Icons.send_rounded),
                      label: const Text('Enviar'),
                      style: FilledButton.styleFrom(
                        backgroundColor: theme.colorScheme.secondary,
                        foregroundColor: theme.colorScheme.onSecondary,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(14)),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),
            // Recent payments header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Pagos recientes',
                    style: theme.textTheme.titleMedium
                        ?.copyWith(fontWeight: FontWeight.w600)),
                TextButton(
                  onPressed: () => Navigator.of(context).push(
                    MaterialPageRoute(
                        builder: (_) => const HistoryScreen()),
                  ),
                  child: const Text('Ver todo'),
                ),
              ],
            ),
            if (_recentPayments.isEmpty)
              const Padding(
                padding: EdgeInsets.symmetric(vertical: 32),
                child: Center(
                  child: Text('No hay pagos aún',
                      style: TextStyle(color: Colors.grey)),
                ),
              )
            else
              ..._recentPayments.map((p) => _PaymentTile(payment: p)),
          ],
        ),
      ),
    );
  }

  Widget _buildDrawer(ThemeData theme) {
    return Drawer(
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              color: theme.colorScheme.surfaceContainerHighest,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Icon(Icons.bolt,
                      size: 40, color: theme.colorScheme.primary),
                  const SizedBox(height: 12),
                  Text('PEGGASUSD',
                      style: theme.textTheme.titleLarge
                          ?.copyWith(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 4),
                  Text('Lightning Wallet para Cuba',
                      style: TextStyle(
                          color: theme.colorScheme.onSurfaceVariant,
                          fontSize: 13)),
                ],
              ),
            ),
            const SizedBox(height: 8),
            ListTile(
              leading: const Icon(Icons.language),
              title: const Text('Idioma'),
              subtitle: const Text('Español'),
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const SettingsScreen()),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.info_outline),
              title: const Text('Acerca de'),
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const AboutScreen()),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.key),
              title: const Text('Frase de recuperación'),
              subtitle: const Text('Ver frase semilla'),
              onTap: () => _showSeedDialog(context),
            ),
            const Spacer(),
            const Divider(),
            ListTile(
              leading: Icon(Icons.logout, color: theme.colorScheme.error),
              title: Text('Cerrar sesión',
                  style: TextStyle(color: theme.colorScheme.error)),
              onTap: () => _confirmLogout(context),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  void _showSeedDialog(BuildContext context) {
    final mnemonic = _sdk.mnemonic;
    if (mnemonic == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('No hay frase de recuperación disponible')),
      );
      return;
    }
    final words = mnemonic.split(' ');
    Navigator.pop(context); // close drawer

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Frase de recuperación'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'Estas palabras son la única forma de recuperar tus fondos.',
              style: TextStyle(fontSize: 13),
            ),
            const SizedBox(height: 16),
            ...List.generate(12, (i) {
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 3),
                child: Row(
                  children: [
                    SizedBox(
                      width: 24,
                      child: Text('${i + 1}.',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context).colorScheme.primary,
                          )),
                    ),
                    Text(words[i], style: const TextStyle(fontSize: 15)),
                  ],
                ),
              );
            }),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Cerrar'),
          ),
        ],
      ),
    );
  }

  void _confirmLogout(BuildContext context) {
    Navigator.pop(context); // close drawer
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Cerrar sesión'),
        content: const Text(
          '¿Estás seguro? Se eliminarán los datos de la wallet '
          'de este dispositivo. Asegúrate de tener tu frase de '
          'recuperación guardada.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Cancelar'),
          ),
          FilledButton(
            onPressed: () {
              Navigator.of(ctx).pop();
              _doLogout();
            },
            style: FilledButton.styleFrom(
                backgroundColor: Theme.of(context).colorScheme.error),
            child: const Text('Cerrar sesión'),
          ),
        ],
      ),
    );
  }

  Future<void> _doLogout() async {
    await _sdk.disconnect();
    await _sdk.clearMnemonic();
    if (!mounted) return;
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (_) => const WelcomeScreen()),
      (route) => false,
    );
  }
}

class _PaymentTile extends StatelessWidget {
  final Payment payment;
  const _PaymentTile({required this.payment});

  @override
  Widget build(BuildContext context) {
    final isSend = payment.paymentType == PaymentType.send;
    final icon = isSend ? Icons.arrow_upward : Icons.arrow_downward;
    final color = isSend ? Colors.red : Colors.green;
    final amount = payment.amount;
    final status = payment.status;
    final isCompleted = status == PaymentStatus.completed;
    final isPending = status == PaymentStatus.pending;
    final statusColor = isCompleted
        ? Colors.green
        : isPending
            ? Colors.orange
            : Colors.red;

    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
      leading: CircleAvatar(
        backgroundColor: color.withValues(alpha: 0.15),
        child: Icon(icon, color: color, size: 20),
      ),
      title: Text(isSend ? 'Enviado' : 'Recibido',
          style: const TextStyle(fontWeight: FontWeight.w500)),
      subtitle: Text(
        isCompleted
            ? 'Completado'
            : isPending
                ? 'Pendiente'
                : 'Fallido',
        style: TextStyle(color: statusColor, fontSize: 13),
      ),
      trailing: Text(
        '$amount SAT',
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 15,
          color: color,
        ),
      ),
    );
  }
}
