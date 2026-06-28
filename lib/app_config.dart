class AppConfig {
  static const String breezApiKey = String.fromEnvironment('BREEZ_API_KEY', defaultValue: '');
  static bool get hasApiKey => breezApiKey.isNotEmpty;
}
