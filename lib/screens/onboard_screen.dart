import 'package:bip39/bip39.dart' as bip39;
import 'package:flutter/material.dart';
import '../app_config.dart';
import '../sdk_service.dart';
import 'home_screen.dart';

class OnboardScreen extends StatefulWidget {
  const OnboardScreen({super.key});

  @override
  State<OnboardScreen> createState() => _OnboardScreenState();
}

class _OnboardScreenState extends State<OnboardScreen> {
  bool _isRestore = false;
  final _mnemonicController = TextEditingController();
  final _apiKeyController = TextEditingController();
  bool _loading = false;

  @override
  void dispose() {
    _mnemonicController.dispose();
    _apiKeyController.dispose();
    super.dispose();
  }

  Future<void> _createWallet() async {
    final mnemonic = bip39.generateMnemonic();
    _mnemonicController.text = mnemonic;
    setState(() {});
  }

  Future<void> _submit() async {
    final mnemonic = _mnemonicController.text.trim();
    final apiKey = AppConfig.hasApiKey
        ? AppConfig.breezApiKey
        : _apiKeyController.text.trim();

    if (mnemonic.isEmpty) {
      _showError('Enter or generate a mnemonic phrase');
      return;
    }
    if (apiKey.isEmpty) {
      _showError('Enter your Breez API key');
      return;
    }

    setState(() => _loading = true);

    try {
      await SdkService.instance.saveMnemonic(mnemonic);
      await SdkService.instance.saveApiKey(apiKey);
      await SdkService.instance.init(
        mnemonic: mnemonic,
        apiKey: apiKey,
      );

      if (!mounted) return;
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const HomeScreen()),
      );
    } catch (e) {
      _showError('Error initializing: $e');
      setState(() => _loading = false);
    }
  }

  void _showError(String msg) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('PEGGASUSD')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Lightning Wallet for Cuba',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => setState(() => _isRestore = false),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _isRestore ? null : Theme.of(context).colorScheme.primaryContainer,
                    ),
                    child: const Text('New Wallet'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => setState(() => _isRestore = true),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _isRestore ? Theme.of(context).colorScheme.primaryContainer : null,
                    ),
                    child: const Text('Restore'),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            TextField(
              controller: _mnemonicController,
              maxLines: 3,
              decoration: InputDecoration(
                labelText: 'Mnemonic (12/24 words)',
                border: const OutlineInputBorder(),
                suffixIcon: _isRestore
                    ? null
                    : IconButton(
                        icon: const Icon(Icons.refresh),
                        onPressed: _createWallet,
                      ),
              ),
            ),
            if (!_isRestore) ...[
              const SizedBox(height: 8),
              ElevatedButton.icon(
                onPressed: _createWallet,
                icon: const Icon(Icons.refresh),
                label: const Text('Generate Mnemonic'),
              ),
            ],
            const SizedBox(height: 16),
            if (AppConfig.hasApiKey)
              const Card(
                color: Colors.green,
                child: Padding(
                  padding: EdgeInsets.all(12),
                  child: Text('API key configured',
                      style: TextStyle(color: Colors.white)),
                ),
              )
            else
              TextField(
                controller: _apiKeyController,
                decoration: const InputDecoration(
                  labelText: 'Breez API Key',
                  border: OutlineInputBorder(),
                ),
              ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: _loading ? null : _submit,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
              child: _loading
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Text('Connect', style: TextStyle(fontSize: 18)),
            ),
          ],
        ),
      ),
    );
  }
}
