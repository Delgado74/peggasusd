import 'package:flutter/material.dart';
import '../sdk_service.dart';

class ReceiveScreen extends StatefulWidget {
  const ReceiveScreen({super.key});

  @override
  State<ReceiveScreen> createState() => _ReceiveScreenState();
}

class _ReceiveScreenState extends State<ReceiveScreen> {
  final SdkService _sdk = SdkService.instance;
  String? _paymentRequest;
  bool _loading = false;
  String _method = 'lightning';
  bool _showUsd = false;
  final _amountController = TextEditingController();

  @override
  void dispose() {
    _amountController.dispose();
    super.dispose();
  }

  Future<void> _generate() async {
    final amountText = _amountController.text.trim();
    setState(() => _loading = true);
    try {
      String result;
      switch (_method) {
        case 'bitcoin':
          result = await _sdk.receiveBitcoinAddress();
          break;
        case 'spark':
          final tokenId = _sdk.lastInfo?.tokenBalances.keys.firstOrNull;
          if (tokenId == null) {
            _showError('No token disponible');
            return;
          }
          final amount = _showUsd && amountText.isNotEmpty
              ? BigInt.from(double.parse(amountText) * 100)
              : null;
          result = await _sdk.receiveTokenInvoice(
            tokenIdentifier: tokenId,
            amount: amount,
          );
          break;
        default:
          final amountSats = !_showUsd && amountText.isNotEmpty
              ? BigInt.from(int.parse(amountText))
              : null;
          result = await _sdk.receiveLightningInvoice(amountSats: amountSats);
      }
      if (mounted) setState(() => _paymentRequest = result);
    } catch (e) {
      _showError('Error: $e');
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  void _showError(String msg) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final hasTokens = (_sdk.lastInfo?.tokenBalances.length ?? 0) > 0;
    final isUsd = _showUsd && (_method == 'lightning' || _method == 'spark');
    final showAmount = _method == 'lightning' || _method == 'spark';
    final tokenTicker = _sdk.lastInfo
            ?.tokenBalances.values.firstOrNull?.tokenMetadata.ticker ??
        'USD';

    return Scaffold(
      appBar: AppBar(title: const Text('Recibir')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          SegmentedButton<String>(
            segments: [
              const ButtonSegment(value: 'lightning', label: Text('Lightning')),
              const ButtonSegment(value: 'bitcoin', label: Text('Bitcoin')),
              if (hasTokens)
                ButtonSegment(
                    value: 'spark', label: Text(tokenTicker)),
            ],
            selected: {_method},
            onSelectionChanged: (v) => setState(() => _method = v.first),
          ),
          const SizedBox(height: 16),

          if (showAmount) ...[
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _amountController,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      labelText: 'Monto',
                      suffixText: _showUsd ? tokenTicker : 'SAT',
                      border: const OutlineInputBorder(),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  icon: Text(
                    _showUsd ? tokenTicker : 'SAT',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: theme.colorScheme.primary,
                    ),
                  ),
                  onPressed: () => setState(() => _showUsd = !_showUsd),
                ),
              ],
            ),
            if (isUsd && _amountController.text.isNotEmpty) ...[
              const SizedBox(height: 8),
              Card(
                color: theme.colorScheme.surfaceContainerHighest,
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Row(
                    children: [
                      Icon(Icons.info_outline,
                          size: 18, color: theme.colorScheme.primary),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          'Montos menores a 1 $tokenTicker se acumulan como '
                          'cambio hasta completar la unidad.',
                          style: TextStyle(
                            fontSize: 13,
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ],

          if (_method == 'bitcoin')
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Card(
                color: theme.colorScheme.surfaceContainerHighest,
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Row(
                    children: [
                      Icon(Icons.info_outline,
                          size: 18, color: theme.colorScheme.primary),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          'Dirección onchain para depósitos en BTC.',
                          style: TextStyle(
                            fontSize: 13,
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

          const SizedBox(height: 16),

          if (_paymentRequest != null) ...[
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: SelectableText(
                  _paymentRequest!,
                  style: const TextStyle(fontSize: 13),
                ),
              ),
            ),
            const SizedBox(height: 8),
            ElevatedButton.icon(
              onPressed: () {
                // Copy to clipboard handled by SelectableText
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Texto seleccionable')),
                );
              },
              icon: const Icon(Icons.copy),
              label: const Text('Copiar'),
            ),
          ],

          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton(
              onPressed: _loading ? null : _generate,
              child: _loading
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Text('Generar', style: TextStyle(fontSize: 16)),
            ),
          ),
        ],
      ),
    );
  }
}
