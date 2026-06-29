export type Locale = 'en' | 'es';

const LOCALE_KEY = 'peggasusd_locale';
let currentLocale: Locale = (localStorage.getItem(LOCALE_KEY) as Locale) || 'es';

export const locale = {
  get: (): Locale => currentLocale,
};

export function setLocale(l: Locale): void {
  currentLocale = l;
  localStorage.setItem(LOCALE_KEY, l);
  // Reload so all UI strings pick up the new locale
  window.location.reload();
}

export type TranslationKey =
  | 'appName'
  | 'send'
  | 'receive'
  | 'scan'
  | 'balance'
  | 'backup'
  | 'settings'
  | 'logout'
  | 'cancel'
  | 'getRefund'
  | 'logoutWarning'
  | 'logoutMessage'
  | 'logoutMessagePasskey'
  | 'poweredBy';

const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    appName: 'PEGGASUSD',
    send: 'Send',
    receive: 'Receive',
    scan: 'Scan QR Code',
    balance: 'Balance',
    backup: 'Backup',
    settings: 'Settings',
    logout: 'Logout',
    cancel: 'Cancel',
    getRefund: 'Get Refund',
    logoutWarning: 'Logout Warning',
    logoutMessage: "Make sure you've saved your recovery phrase before logging out. You'll need it to access your funds again.",
    logoutMessagePasskey: "You'll need to authenticate with the same passkey to access your funds again.",
    poweredBy: 'Powered by Breez SDK',
  },
  es: {
    appName: 'PEGGASUSD',
    send: 'Enviar',
    receive: 'Recibir',
    scan: 'Escanear Código QR',
    balance: 'Saldo',
    backup: 'Copia de seguridad',
    settings: 'Configuración',
    logout: 'Cerrar sesión',
    cancel: 'Cancelar',
    getRefund: 'Obtener reembolso',
    logoutWarning: 'Advertencia',
    logoutMessage: 'Asegúrate de haber guardado tu frase de recuperación antes de cerrar sesión. La necesitarás para acceder a tus fondos de nuevo.',
    logoutMessagePasskey: 'Necesitarás autenticarte con la misma passkey para acceder a tus fondos de nuevo.',
    poweredBy: 'Desarrollado por Breez SDK',
  },
};

export function t(key: TranslationKey): string {
  return translations[currentLocale][key];
}
