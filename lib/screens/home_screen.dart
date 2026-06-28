import 'package:breez_sdk_spark_flutter/breez_sdk_spark.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../sdk_service.dart';
import 'history_screen.dart';
import 'receive_screen.dart';
import 'send_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final SdkService _sdk = SdkService.instance;
  GetInfoResponse? _info;
  List<Payment> _recentPayments = [];
  bool _loading = true;
  bool _showUsd = false;

  @override
  void initState() {
    super.initState();
    _loadData();
    _sdk.infoStream.listen((info) {
      if (mounted) setState(() => _info = info);
    });
    _sdk.eventStream.listen((event) {
      if (event is SdkEvent_Synced) _loadPayments();
      if (event is SdkEvent_PaymentSucceeded) _loadPayments();
    });
  }

  Future<void> _loadData() async {
    _info = _sdk.lastInfo;
    await _loadPayments();
    if (mounted) setState(() => _loading = false);
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

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final sats = _info?.balanceSats ?? BigInt.zero;
    final tokenBalances = _info?.tokenBalances ?? {};
    final firstToken = tokenBalances.entries.isNotEmpty ? tokenBalances.entries.first : null;

    return Scaffold(
      appBar: AppBar(
        title: const Text('PEGGASUSD'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadData,
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _loadData,
        child: ListView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          children: [
            const SizedBox(height: 20),

            // Balance card - tap to toggle SAT/USD
            GestureDetector(
              onTap: () => setState(() => _showUsd = !_showUsd),
              child: Card(
                elevation: 2,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16)),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 24),
                  child: Column(
                    children: [
                      Text(
                        _showUsd ? 'USD Balance' : 'Bitcoin Balance',
                        style: theme.textTheme.titleMedium
                            ?.copyWith(color: Colors.grey[600]),
                      ),
                      const SizedBox(height: 12),
                      if (_showUsd && firstToken != null) ...[
                        Text(
                          _formatToken(
                              firstToken.value.balance,
                              firstToken.value.tokenMetadata?.decimals ?? 0),
                          style: theme.textTheme.headlineLarge
                              ?.copyWith(fontWeight: FontWeight.bold),
                        ),
                        Text(
                          firstToken.value.tokenMetadata?.ticker ?? 'USD',
                          style: theme.textTheme.titleMedium
                              ?.copyWith(color: Colors.grey[600]),
                        ),
                      ] else ...[
                        Text(
                          '${_formatSats(sats)}',
                          style: theme.textTheme.headlineLarge
                              ?.copyWith(fontWeight: FontWeight.bold),
                        ),
                        const Text('sats',
                            style: TextStyle(
                                fontSize: 16, color: Colors.grey)),
                      ],
                      const SizedBox(height: 4),
                      Text(
                        'tap to switch',
                        style: theme.textTheme.bodySmall
                            ?.copyWith(color: Colors.grey[400]),
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
                    child: ElevatedButton.icon(
                      onPressed: () => Navigator.of(context).push(
                        MaterialPageRoute(
                            builder: (_) => const ReceiveScreen()),
                      ),
                      icon: const Icon(Icons.qr_code),
                      label: const Text('Receive'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: theme.colorScheme.primary,
                        foregroundColor: theme.colorScheme.onPrimary,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12)),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: SizedBox(
                    height: 56,
                    child: ElevatedButton.icon(
                      onPressed: () => Navigator.of(context).push(
                        MaterialPageRoute(builder: (_) => const SendScreen()),
                      ),
                      icon: const Icon(Icons.send_rounded),
                      label: const Text('Send'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: theme.colorScheme.secondary,
                        foregroundColor: theme.colorScheme.onSecondary,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12)),
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
                Text('Recent Payments',
                    style: theme.textTheme.titleMedium
                        ?.copyWith(fontWeight: FontWeight.w600)),
                TextButton(
                  onPressed: () => Navigator.of(context).push(
                    MaterialPageRoute(
                        builder: (_) => const HistoryScreen()),
                  ),
                  child: const Text('View all'),
                ),
              ],
            ),

            if (_recentPayments.isEmpty)
              const Padding(
                padding: EdgeInsets.symmetric(vertical: 32),
                child: Center(
                  child: Text('No payments yet',
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
    final statusColor =
        isCompleted ? Colors.green : isPending ? Colors.orange : Colors.red;

    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
      leading: CircleAvatar(
        backgroundColor: color.withValues(alpha: 0.15),
        child: Icon(icon, color: color, size: 20),
      ),
      title: Text(isSend ? 'Sent' : 'Received',
          style: const TextStyle(fontWeight: FontWeight.w500)),
      subtitle: Text(
        isCompleted ? 'Completed' : isPending ? 'Pending' : 'Failed',
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
