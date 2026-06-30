export type Locale = 'en' | 'es';

const LOCALE_KEY = 'peggasusd_locale';
let currentLocale: Locale = (typeof localStorage !== 'undefined' ? localStorage.getItem(LOCALE_KEY) as Locale : null) || 'es';

export const locale = {
  get: (): Locale => currentLocale,
};

export function setLocale(l: Locale): void {
  currentLocale = l;
  localStorage.setItem(LOCALE_KEY, l);
  window.location.reload();
}

export type TranslationKey =
  // Common
  | 'appName'
  | 'send'
  | 'receive'
  | 'scan'
  | 'balance'
  | 'backup'
  | 'settings'
  | 'about'
  | 'logout'
  | 'cancel'
  | 'confirm'
  | 'save'
  | 'delete'
  | 'close'
  | 'back'
  | 'goBack'
  | 'continue'
  | 'done'
  | 'processing'
  | 'error'
  | 'copy'
  | 'copied'
  | 'share'
  | 'saving'
  | 'loading'
  | 'retry'
  | 'tryAgain'
  | 'notNow'
  | 'installing'
  | 'install'
  | 'edit'
  | 'add'
  | 'poweredBy'
  | 'logoutWarning'
  | 'logoutMessage'
  | 'logoutMessagePasskey'
  // Home
  | 'home.tagline'
  | 'home.getStarted'
  | 'home.restoreFromBackup'
  | 'home.usePasskeyInstead'
  | 'home.createPasskey'
  | 'home.useExistingPasskey'
  | 'home.useRecoveryPhrase'
  // Wallet
  | 'wallet.syncing'
  | 'wallet.noPayments'
  | 'wallet.noPaymentsDesc'
  | 'wallet.payments'
  | 'wallet.pendingConfirmation'
  | 'wallet.pendingApproval'
  | 'wallet.failed'
  | 'wallet.fee'
  | 'wallet.refund'
  | 'wallet.saveContact'
  | 'wallet.save'
  | 'wallet.openMenu'
  | 'wallet.paymentReceived'
  | 'wallet.tapToDismiss'
  | 'wallet.balanceLabel'
  | 'wallet.change'
  | 'wallet.justNow'
  | 'wallet.minutesAgo'
  | 'wallet.hoursAgo'
  | 'wallet.daysAgo'
  | 'wallet.monthsAgo'
  | 'wallet.yearsAgo'
  // Camera / QR Scanner
  | 'scanner.initializing'
  | 'scanner.notAvailable'
  | 'scanner.pointCamera'
  | 'scanner.noQrFound'
  | 'scanner.cameraPermissionDenied'
  | 'scanner.cameraPermissionDeniedDesc'
  // Backup
  | 'backup.title'
  | 'backup.passkeyProtected'
  | 'backup.passkeyProtectedDesc'
  | 'backup.revealPhrase'
  | 'backup.authRequired'
  | 'backup.completeAuth'
  | 'backup.noOneWatching'
  | 'backup.recoveryPhrase'
  | 'backup.hide'
  | 'backup.noBackupFound'
  | 'backup.noBackupDesc'
  | 'backup.passkeyUnavailable'
  | 'backup.passkeyUnavailableDesc'
  // Settings
  | 'settings.title'
  | 'settings.saveChanges'
  | 'settings.display'
  | 'settings.fiatCurrencies'
  | 'settings.passkey'
  | 'settings.passkeyLabels'
  | 'settings.diagnostics'
  | 'settings.downloadLogs'
  | 'settings.preparing'
  | 'settings.database'
  | 'settings.exportDatabase'
  | 'settings.exporting'
  | 'settings.network'
  | 'settings.mainnet'
  | 'settings.regtest'
  | 'settings.networkHelp'
  | 'settings.privacy'
  | 'settings.privateMode'
  | 'settings.privateModeDesc'
  | 'settings.preferSpark'
  | 'settings.preferSparkDesc'
  | 'settings.sendUsd'
  | 'settings.sendUsdDesc'
  | 'settings.depositClaimFee'
  | 'settings.maxFeeType'
  | 'settings.fixedSats'
  | 'settings.rateSatVb'
  | 'settings.networkLeeway'
  | 'settings.syncInterval'
  | 'settings.lnurl'
  | 'settings.customDomain'
  | 'settings.version'
  | 'settings.dev'
  | 'settings.devModeTaps'
  | 'settings.moreTapsTo'
  | 'settings.enable'
  | 'settings.disable'
  | 'settings.e.g30'
  | 'settings.exampleDotCom'
  // Receive
  | 'receive.title'
  | 'receive.createInvoice'
  | 'receive.amount'
  | 'receive.descriptionOptional'
  | 'receive.whatsThisFor'
  | 'receive.invalidAmount'
  | 'receive.generateInvoice'
  | 'receive.lightning'
  | 'receive.bitcoin'
  | 'receive.lightningInvoice'
  | 'receive.sparkAddress'
  | 'receive.bitcoinAddress'
  | 'receive.paymentRequest'
  | 'receive.scanToPay'
  | 'receive.useThisAddress'
  | 'receive.sendBitcoinTo'
  | 'receive.createLightningAddress'
  | 'receive.editLightningAddress'
  | 'receive.createAddress'
  | 'receive.editAddress'
  | 'receive.receivePaymentsEasily'
  | 'receive.lnurlPay'
  | 'receive.generatingInvoice'
  | 'receive.loadingLightningAddress'
  | 'receive.generatingSpark'
  | 'receive.generatingBitcoin'
  | 'receive.confirmUsernameChange'
  | 'receive.change'
  // Send
  | 'send.sendBtcOrUsd'
  | 'send.sendBtc'
  | 'send.payTo'
  | 'send.amount'
  | 'send.destination'
  | 'send.enterAmountSats'
  | 'send.enterAmountToken'
  | 'send.enterAmountUsd'
  | 'send.sendAll'
  | 'send.balanceUpdating'
  | 'send.paste'
  | 'send.scan'
  | 'send.contacts'
  | 'send.lightningInvoice'
  | 'send.sparkAddress'
  | 'send.bitcoinAddress'
  | 'send.lnurlPay'
  | 'send.lightningAddress'
  | 'send.lnurlAuth'
  | 'send.sendUsd'
  | 'send.payment'
  | 'send.enterValidAmount'
  | 'send.enterDestination'
  | 'send.invalidDestination'
  | 'send.amountExceedsBalance'
  | 'send.paymentFailed'
  | 'send.operationFailed'
  | 'send.youreSending'
  | 'send.recipientGets'
  | 'send.conversionAmount'
  | 'send.conversionFee'
  | 'send.insufficientFunds'
  | 'send.send'
  | 'send.paymentSent'
  | 'send.paymentFailedTitle'
  | 'send.authenticated'
  | 'send.authenticationFailed'
  | 'send.successDescription'
  | 'send.authSuccessDescription'
  | 'send.failedDescription'
  | 'send.authFailedDescription'
  | 'send.close'
  | 'send.done'
  | 'send.processingTitle'
  | 'send.convertingTitle'
  | 'send.sendingTitle'
  | 'send.processingAuthDesc'
  | 'send.processingConversionDesc'
  | 'send.processingSendingDesc'
  | 'send.commentMaxLength'
  | 'send.minAmount'
  | 'send.maxAmount'
  | 'send.commentOptional'
  | 'send.addMessage'
  | 'send.failedToPrepare'
  | 'send.invalidPaymentDestination'
  | 'send.selectFeeRate'
  | 'send.slow'
  | 'send.medium'
  | 'send.fast'
  | 'send.networkFee'
  | 'send.youReceive'
  // Contacts
  | 'contacts.title'
  | 'contacts.add'
  | 'contacts.noMatches'
  | 'contacts.noContacts'
  | 'contacts.tryDifferentSearch'
  | 'contacts.addContactsToSend'
  | 'contacts.editContact'
  | 'contacts.newContact'
  | 'contacts.name'
  | 'contacts.lightningAddress'
  | 'contacts.saving'
  | 'contacts.save'
  | 'contacts.deleteContact'
  | 'contacts.deleteConfirm'
  | 'contacts.delete'
  | 'contacts.nameRequired'
  | 'contacts.addressRequired'
  | 'contacts.invalidAddress'
  | 'contacts.addressNotFound'
  | 'contacts.contactSaved'
  | 'contacts.searchContacts'
  | 'contacts.clearSearch'
  | 'contacts.addContact'
  | 'contacts.failedToSave'
  | 'contacts.failedToUpdate'
  | 'contacts.failedToAdd'
  // Get Refund
  | 'refund.title'
  | 'refund.loading'
  | 'refund.allClear'
  | 'refund.noDeposits'
  | 'refund.amount'
  | 'refund.transactionId'
  | 'refund.refundTransactionId'
  | 'refund.broadcasting'
  | 'refund.continue'
  | 'refund.refundSent'
  | 'refund.refundFailed'
  | 'refund.refundToBitcoin'
  | 'refund.destination'
  | 'refund.destinationHelp'
  | 'refund.selectFeeRate'
  | 'refund.slow'
  | 'refund.medium'
  | 'refund.fast'
  | 'refund.youReceive'
  | 'refund.networkFee'
  | 'refund.refund'
  | 'refund.processing'
  | 'refund.refundBroadcast'
  | 'refund.refundBroadcastDesc'
  | 'refund.done'
  | 'refund.failedToLoad'
  | 'refund.failedToRefund'
  // Restore
  | 'restore.title'
  | 'restore.restoring'
  | 'restore.restoreWallet'
  | 'restore.instruction'
  | 'restore.placeholder'
  | 'restore.invalidPhrase'
  | 'restore.apiError'
  // Generate (new wallet)
  | 'generate.title'
  | 'generate.settingUp'
  | 'generate.savedPhrase'
  | 'generate.instruction'
  | 'generate.copied'
  | 'generate.copyClipboard'
  | 'generate.keepSecret'
  | 'generate.neverShare'
  // Unlock
  | 'unlock.unlockPasskey'
  | 'unlock.unlockBiometric'
  | 'unlock.lockedPasskey'
  | 'unlock.lockedBiometric'
  | 'unlock.welcomeBack'
  | 'unlock.failed'
  | 'unlock.useDifferentWallet'
  | 'unlock.unlocking'
  // Fiat Currencies
  | 'fiat.title'
  | 'fiat.failedToLoad'
  | 'fiat.moveUp'
  | 'fiat.moveDown'
  // Payment Details
  | 'paymentDetails.amount'
  | 'paymentDetails.fee'
  | 'paymentDetails.dateTime'
  | 'paymentDetails.receivedAmount'
  | 'paymentDetails.network'
  | 'paymentDetails.recipientAddress'
  | 'paymentDetails.description'
  | 'paymentDetails.lightningAddress'
  | 'paymentDetails.lnurlPayment'
  | 'paymentDetails.comment'
  | 'paymentDetails.invoice'
  | 'paymentDetails.paymentPreimage'
  | 'paymentDetails.destinationPublicKey'
  | 'paymentDetails.successAction'
  | 'paymentDetails.message'
  | 'paymentDetails.url'
  | 'paymentDetails.transactionId'
  | 'paymentDetails.conversionDetails'
  | 'paymentDetails.provider'
  | 'paymentDetails.initialAmount'
  | 'paymentDetails.convertedAmount'
  | 'paymentDetails.unknown'
  // Passkey
  | 'passkey.createYourPasskey'
  | 'passkey.secureFunds'
  | 'passkey.alertTitle'
  | 'passkey.alertText'
  | 'passkey.selectLabel'
  | 'passkey.selectLabelDesc'
  | 'passkey.createNewLabel'
  | 'passkey.labelName'
  | 'passkey.labelExists'
  | 'passkey.verificationFailed'
  | 'passkey.verificationDesc'
  | 'passkey.diagnosticDetails'
  | 'passkey.diagnosticInfo'
  | 'passkey.retryCheck'
  | 'passkey.shareDiagnostics'
  | 'passkey.useAnotherPasskey'
  | 'passkey.createNewPasskey'
  | 'passkey.createPasskey'
  | 'passkey.usePasskey'
  | 'passkey.getStarted'
  | 'passkey.passkeyExists'
  | 'passkey.signInCancelled'
  | 'passkey.passkeyUnavailable'
  | 'passkey.signInFailed'
  | 'passkey.couldNotSaveLabel'
  | 'passkey.couldNotConnect'
  | 'passkey.couldNotCreatePasskey'
  | 'passkey.somethingWentWrong'
  | 'passkey.confirmDeleted'
  | 'passkey.continueUnsure'
  | 'passkey.alreadyExists'
  | 'passkey.notOnDevice'
  | 'passkey.passkeyRemoved'
  | 'passkey.couldNotFind'
  | 'passkey.couldNotSignIn'
  | 'passkey.signInTimedOut'
  | 'passkey.signInCancelledErr'
  | 'passkey.failedToSaveLabel'
  // Stable Balance
  | 'stableBalance.title'
  | 'stableBalance.description'
  | 'stableBalance.enable'
  | 'stableBalance.convertToUsd'
  | 'stableBalance.convertToBtc'
  | 'stableBalance.convertUsdDesc'
  | 'stableBalance.convertBtcDesc'
  | 'stableBalance.conversionFee'
  | 'stableBalance.balanceTooLow'
  | 'stableBalance.couldNotEstimateFee'
  | 'stableBalance.confirm'
  | 'stableBalance.usdDetected'
  | 'stableBalance.restorePrompt'
  // Install Prompt
  | 'install.title'
  | 'install.description'
  | 'install.install'
  | 'install.notNow'
  // About
  | 'about.title'
  | 'about.description'
  | 'about.forkInfo'
  | 'about.version'
  | 'about.technology'
  | 'about.technologyDesc'
  | 'about.features'
  | 'about.featuresList'
  | 'about.disclaimer'
  // Cross-chain send
  | 'sendCrossChain.amountTooSmall'
  | 'sendCrossChain.amountTooLarge'
  | 'sendCrossChain.failedQuote'
  | 'sendCrossChain.noRoutes'
  | 'sendCrossChain.noAssets'
  | 'sendCrossChain.fetchingRoutes'
  | 'sendCrossChain.selectCoin'
  | 'sendCrossChain.selectNetwork'
  | 'sendCrossChain.selectProvider'
  | 'sendCrossChain.gettingQuote'
  | 'sendCrossChain.receiving'
  | 'sendCrossChain.fee'
  | 'sendCrossChain.chain'
  | 'sendCrossChain.provider'
  | 'sendCrossChain.address'
  | 'sendCrossChain.changeAmount'
  | 'sendCrossChain.youreSending'
  | 'sendCrossChain.noQuote'
  | 'sendCrossChain.tryAgain'
  // LnurlAuth
  | 'lnurlAuth.register'
  | 'lnurlAuth.logIn'
  | 'lnurlAuth.linkAccount'
  | 'lnurlAuth.authenticate'
  | 'lnurlAuth.wantsYouTo'
  | 'lnurlAuth.privacyDesc'
  | 'lnurlAuth.authenticating'
  | 'lnurlAuth.authFailed'
  // Staging Gate
  | 'staging.title'
  | 'staging.description'
  | 'staging.enterPassword'
  | 'staging.continue'
  | 'staging.incorrectPassword';

const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    // Common
    appName: 'PEGGASUSD',
    send: 'Send',
    receive: 'Receive',
    scan: 'Scan QR Code',
    balance: 'Balance',
    backup: 'Backup',
    settings: 'Settings',
    about: 'About',
    logout: 'Logout',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    close: 'Close',
    back: 'Back',
    goBack: 'Go back',
    continue: 'Continue',
    done: 'Done',
    processing: 'Processing...',
    error: 'Error',
    copy: 'Copy',
    copied: 'Copied!',
    share: 'Share',
    saving: 'Saving...',
    loading: 'Loading...',
    retry: 'Retry',
    tryAgain: 'Try Again',
    notNow: 'Not Now',
    installing: 'Installing...',
    install: 'Install',
    edit: 'Edit',
    add: 'Add',
    poweredBy: 'Powered by Breez SDK',
    logoutWarning: 'Logout Warning',
    logoutMessage: "Make sure you've saved your recovery phrase before logging out. You'll need it to access your funds again.",
    logoutMessagePasskey: "You'll need to authenticate with the same passkey to access your funds again.",
    // Home
    'home.tagline': 'Lightning + USD Balance',
    'home.getStarted': 'Get Started',
    'home.restoreFromBackup': 'Restore from Backup',
    'home.usePasskeyInstead': 'Use Passkey Instead',
    'home.createPasskey': 'Create Passkey',
    'home.useExistingPasskey': 'Use Existing Passkey',
    'home.useRecoveryPhrase': 'Use Recovery Phrase Instead',
    // Wallet
    'wallet.syncing': 'Syncing',
    'wallet.noPayments': 'No payments yet',
    'wallet.noPaymentsDesc': 'Your payment history will appear here once you send or receive your first payment.',
    'wallet.payments': 'Payments',
    'wallet.pendingConfirmation': 'Pending Confirmation',
    'wallet.pendingApproval': 'Pending Approval',
    'wallet.failed': 'Failed',
    'wallet.fee': 'fee',
    'wallet.refund': 'Refund',
    'wallet.saveContact': 'Save as contact?',
    'wallet.save': 'Save',
    'wallet.openMenu': 'Open menu',
    'wallet.paymentReceived': 'Payment Received',
    'wallet.tapToDismiss': 'Tap anywhere to dismiss',
    'wallet.balanceLabel': 'Balance',
    'wallet.change': 'change',
    'wallet.justNow': 'Just now',
    'wallet.minutesAgo': '{m}m ago',
    'wallet.hoursAgo': '{h}h ago',
    'wallet.daysAgo': '{d}d ago',
    'wallet.monthsAgo': '{mo}mo ago',
    'wallet.yearsAgo': '{y}y ago',
    // Camera / QR Scanner
    'scanner.initializing': 'Initializing camera...',
    'scanner.notAvailable': 'Camera not available',
    'scanner.pointCamera': 'Point camera at QR code',
    'scanner.noQrFound': 'No QR code found in image',
    'scanner.cameraPermissionDenied': 'Camera permission denied',
    'scanner.cameraPermissionDeniedDesc': 'Please enable camera access in your device settings to scan QR codes.',
    // Backup
    'backup.title': 'Backup',
    'backup.passkeyProtected': 'Passkey Protected',
    'backup.passkeyProtectedDesc': 'Your recovery phrase is derived from your passkey. To restore on another device, use your passkey or the recovery phrase below.',
    'backup.revealPhrase': 'Tap to reveal phrase',
    'backup.authRequired': 'Requires passkey authentication',
    'backup.completeAuth': 'Complete passkey authentication',
    'backup.noOneWatching': 'Make sure no one is watching',
    'backup.recoveryPhrase': 'Recovery Phrase',
    'backup.hide': 'Hide',
    'backup.noBackupFound': 'No Backup Found',
    'backup.noBackupDesc': 'Could not find a recovery phrase for this wallet.',
    'backup.passkeyUnavailable': 'Passkey Unavailable',
    'backup.passkeyUnavailableDesc': 'Your recovery phrase is derived from your passkey. Without it, the phrase cannot be retrieved on this device. Sign in on a device where the passkey is still available to view it.',
    // Settings
    'settings.title': 'Settings',
    'settings.saveChanges': 'Save Changes',
    'settings.display': 'Display',
    'settings.fiatCurrencies': 'Fiat Currencies',
    'settings.passkey': 'Passkey',
    'settings.passkeyLabels': 'Passkey & Labels',
    'settings.diagnostics': 'Diagnostics',
    'settings.downloadLogs': 'Download Logs',
    'settings.preparing': 'Preparing...',
    'settings.database': 'Database',
    'settings.exportDatabase': 'Export Database',
    'settings.exporting': 'Exporting...',
    'settings.network': 'Network',
    'settings.mainnet': 'Mainnet',
    'settings.regtest': 'Regtest',
    'settings.networkHelp': 'Changing network will reload the app and reconnect.',
    'settings.privacy': 'Privacy',
    'settings.privateMode': 'Private Mode',
    'settings.privateModeDesc': 'Hide your address from public explorers (not suitable for zaps)',
    'settings.preferSpark': 'Prefer Spark',
    'settings.preferSparkDesc': 'Use Spark address over Lightning invoice when available',
    'settings.sendUsd': 'Send USD',
    'settings.sendUsdDesc': 'Enable sending to USDC/USDT addresses on other chains',
    'settings.depositClaimFee': 'Deposit Claim Fee',
    'settings.maxFeeType': 'Max fee type',
    'settings.fixedSats': 'Fixed (sats)',
    'settings.rateSatVb': 'Rate (sat/vB)',
    'settings.networkLeeway': 'Network + leeway',
    'settings.syncInterval': 'Sync interval (seconds)',
    'settings.lnurl': 'LNURL',
    'settings.customDomain': 'Custom domain',
    'settings.version': 'PEGGASUSD v1.0.0',
    'settings.dev': '(dev)',
    'settings.devModeTaps': 'more taps to',
    'settings.enable': 'enable',
    'settings.disable': 'disable',
    'settings.e.g30': 'e.g. 30',
    'settings.exampleDotCom': 'example.com',
    // Receive
    'receive.title': 'Receive',
    'receive.createInvoice': 'Create Invoice',
    'receive.amount': 'Amount',
    'receive.descriptionOptional': 'Description (optional)',
    'receive.whatsThisFor': "What's this for?",
    'receive.invalidAmount': 'Invalid amount',
    'receive.generateInvoice': 'Generate Invoice',
    'receive.lightning': 'Lightning',
    'receive.bitcoin': 'Bitcoin',
    'receive.lightningInvoice': 'Lightning Invoice',
    'receive.sparkAddress': 'Spark Address',
    'receive.bitcoinAddress': 'Bitcoin Address',
    'receive.paymentRequest': 'Payment Request',
    'receive.scanToPay': 'Scan to pay this Lightning invoice',
    'receive.useThisAddress': 'Use this address to receive payments',
    'receive.sendBitcoinTo': 'Send Bitcoin to this address for automatic Lightning conversion',
    'receive.createLightningAddress': 'Create Lightning Address',
    'receive.editLightningAddress': 'Edit Lightning Address',
    'receive.createAddress': 'Create Address',
    'receive.editAddress': 'Edit Address',
    'receive.receivePaymentsEasily': 'Create a Lightning Address to receive payments easily',
    'receive.lnurlPay': 'LNURL-Pay',
    'receive.generatingInvoice': 'Generating invoice...',
    'receive.loadingLightningAddress': 'Loading Lightning Address...',
    'receive.generatingSpark': 'Generating Spark address...',
    'receive.generatingBitcoin': 'Generating Bitcoin address...',
    'receive.confirmUsernameChange': 'Confirm Username Change',
    'receive.change': 'Change',
    // Send
    'send.sendBtcOrUsd': 'Send BTC or USD',
    'send.sendBtc': 'Send BTC',
    'send.payTo': 'Pay to',
    'send.amount': 'Amount',
    'send.destination': 'Destination',
    'send.enterAmountSats': 'Enter amount in satoshis',
    'send.enterAmountToken': 'Enter amount in {tokenSymbol}',
    'send.enterAmountUsd': 'Enter amount in USD',
    'send.sendAll': 'Send All',
    'send.balanceUpdating': 'Balance is updating. Try again in a moment.',
    'send.paste': 'Paste',
    'send.scan': 'Scan',
    'send.contacts': 'Contacts',
    'send.lightningInvoice': 'Lightning Invoice',
    'send.sparkAddress': 'Spark Address',
    'send.bitcoinAddress': 'Bitcoin Address',
    'send.lnurlPay': 'LNURL Pay',
    'send.lightningAddress': 'Lightning Address',
    'send.lnurlAuth': 'LNURL Auth',
    'send.sendUsd': 'Send USD',
    'send.payment': 'Payment',
    'send.enterValidAmount': 'Please enter a valid amount',
    'send.enterDestination': 'Please enter a payment destination',
    'send.invalidDestination': 'Invalid payment destination',
    'send.amountExceedsBalance': 'Amount exceeds available balance',
    'send.paymentFailed': 'Payment failed: {error}',
    'send.operationFailed': 'Operation failed: {error}',
    'send.youreSending': "You're sending",
    'send.recipientGets': 'Recipient gets',
    'send.conversionAmount': 'Conversion amount',
    'send.conversionFee': 'Conversion fee',
    'send.insufficientFunds': 'Insufficient funds',
    'send.send': 'Send',
    'send.paymentSent': 'Payment Sent!',
    'send.paymentFailedTitle': 'Payment Failed',
    'send.authenticated': 'Authenticated!',
    'send.authenticationFailed': 'Authentication Failed',
    'send.successDescription': 'Your payment has been successfully sent to the recipient.',
    'send.authSuccessDescription': 'You have successfully authenticated with the service.',
    'send.failedDescription': 'There was an error processing your payment. Please try again.',
    'send.authFailedDescription': 'There was an error during authentication. Please try again.',
    'send.close': 'Close',
    'send.done': 'Done',
    'send.processingTitle': 'Sending...',
    'send.convertingTitle': 'Converting...',
    'send.sendingTitle': 'Sending...',
    'send.processingAuthDesc': 'Please wait while we verify your identity...',
    'send.processingConversionDesc': 'Please wait while we convert the amount...',
    'send.processingSendingDesc': 'Please wait while we process your transaction...',
    'send.commentMaxLength': 'Comment must be at most {maxLen} characters',
    'send.minAmount': 'Amount must be at least ₿{minSats}',
    'send.maxAmount': 'Amount must be at most ₿{maxSats}',
    'send.commentOptional': 'Comment (optional)',
    'send.addMessage': 'Add a message...',
    'send.failedToPrepare': 'Failed to prepare payment: {error}',
    'send.invalidPaymentDestination': 'Invalid payment destination',
    'send.selectFeeRate': 'Select Fee Rate',
    'send.slow': 'Slow',
    'send.medium': 'Medium',
    'send.fast': 'Fast',
    'send.networkFee': 'Network fee',
    'send.youReceive': 'You receive',
    // Contacts
    'contacts.title': 'Contacts',
    'contacts.add': 'Add',
    'contacts.noMatches': 'No matches',
    'contacts.noContacts': 'No contacts yet',
    'contacts.tryDifferentSearch': 'Try a different search term.',
    'contacts.addContactsToSend': 'Add contacts to quickly send payments.',
    'contacts.editContact': 'Edit Contact',
    'contacts.newContact': 'New Contact',
    'contacts.name': 'Name',
    'contacts.lightningAddress': 'Lightning Address',
    'contacts.saving': 'Saving...',
    'contacts.save': 'Save',
    'contacts.deleteContact': 'Delete Contact',
    'contacts.deleteConfirm': 'Are you sure you want to delete "{name}"?',
    'contacts.delete': 'Delete',
    'contacts.nameRequired': 'Name is required',
    'contacts.addressRequired': 'Address is required',
    'contacts.invalidAddress': 'Invalid Lightning address format',
    'contacts.addressNotFound': 'Lightning address not found',
    'contacts.contactSaved': 'Contact saved',
    'contacts.searchContacts': 'Search contacts...',
    'contacts.clearSearch': 'Clear search',
    'contacts.addContact': 'Add contact',
    'contacts.failedToSave': 'Failed to save contact',
    'contacts.failedToUpdate': 'Failed to update contact',
    'contacts.failedToAdd': 'Failed to add contact',
    // Get Refund
    'refund.title': 'Get Refund',
    'refund.loading': 'Loading rejected deposits...',
    'refund.allClear': 'All Clear!',
    'refund.noDeposits': 'No rejected deposits pending refund.',
    'refund.amount': 'Amount',
    'refund.transactionId': 'Transaction ID',
    'refund.refundTransactionId': 'Refund Transaction ID',
    'refund.broadcasting': 'Broadcasting',
    'refund.continue': 'Continue',
    'refund.refundSent': 'Refund Sent',
    'refund.refundFailed': 'Refund Failed',
    'refund.refundToBitcoin': 'Refund to Bitcoin',
    'refund.destination': 'Destination',
    'refund.destinationHelp': 'Enter the Bitcoin address where you want to receive the refund.',
    'refund.selectFeeRate': 'Select Fee Rate',
    'refund.slow': 'Slow',
    'refund.medium': 'Medium',
    'refund.fast': 'Fast',
    'refund.youReceive': 'You receive',
    'refund.networkFee': 'Network fee',
    'refund.refund': 'Refund',
    'refund.processing': 'Processing refund...',
    'refund.refundBroadcast': 'Refund Broadcast',
    'refund.refundBroadcastDesc': 'Your refund has been sent to the Bitcoin network.',
    'refund.done': 'Done',
    'refund.failedToLoad': 'Failed to load rejected deposits',
    'refund.failedToRefund': 'Failed to refund deposit',
    // Restore
    'restore.title': 'Restore from Backup',
    'restore.restoring': 'Restoring...',
    'restore.restoreWallet': 'Restore Wallet',
    'restore.instruction': 'Enter your 12 or 24-word recovery phrase to restore your wallet. Words should be separated by spaces.',
    'restore.placeholder': 'word1 word2 word3 ...',
    'restore.invalidPhrase': 'Please enter a valid 12 or 24-word recovery phrase',
    'restore.apiError': 'Invalid recovery phrase. Please check your words and try again.',
    // Generate
    'generate.title': 'Get Started',
    'generate.settingUp': 'Setting up PEGGASUSD...',
    'generate.savedPhrase': "I've Saved My Phrase",
    'generate.instruction': 'Write down these words in order. This is your only backup to recover your funds.',
    'generate.copied': 'Copied!',
    'generate.copyClipboard': 'Copy to Clipboard',
    'generate.keepSecret': 'Keep it Secret',
    'generate.neverShare': 'Never share your recovery phrase. Anyone with these words can access your funds.',
    // Unlock
    'unlock.unlockPasskey': 'Unlock with passkey',
    'unlock.unlockBiometric': 'Unlock',
    'unlock.lockedPasskey': 'Your wallet is locked. Unlock with your passkey to continue.',
    'unlock.lockedBiometric': 'Your wallet is locked. Unlock with your biometric to continue.',
    'unlock.welcomeBack': 'Welcome back',
    'unlock.failed': 'Unlock failed',
    'unlock.useDifferentWallet': 'Use a Different Wallet',
    'unlock.unlocking': 'Authenticating...',
    // Fiat Currencies
    'fiat.title': 'Fiat Currencies',
    'fiat.failedToLoad': 'Failed to load currencies. Please try again.',
    'fiat.moveUp': 'Move up',
    'fiat.moveDown': 'Move down',
    // Payment Details
    'paymentDetails.amount': 'Amount',
    'paymentDetails.fee': 'Fee',
    'paymentDetails.dateTime': 'Date & Time',
    'paymentDetails.receivedAmount': 'Received Amount',
    'paymentDetails.network': 'Network',
    'paymentDetails.recipientAddress': 'Recipient Address',
    'paymentDetails.description': 'Description',
    'paymentDetails.lightningAddress': 'Lightning Address',
    'paymentDetails.lnurlPayment': 'LNURL Payment',
    'paymentDetails.comment': 'Comment',
    'paymentDetails.invoice': 'Invoice',
    'paymentDetails.paymentPreimage': 'Payment Preimage',
    'paymentDetails.destinationPublicKey': 'Destination Public Key',
    'paymentDetails.successAction': 'Success Action',
    'paymentDetails.message': 'Message',
    'paymentDetails.url': 'URL',
    'paymentDetails.transactionId': 'Transaction ID',
    'paymentDetails.conversionDetails': 'Conversion Details',
    'paymentDetails.provider': 'Provider',
    'paymentDetails.initialAmount': 'Initial Amount',
    'paymentDetails.convertedAmount': 'Converted Amount',
    'paymentDetails.unknown': 'Unknown',
    // Passkey
    'passkey.createYourPasskey': 'Create your passkey',
    'passkey.secureFunds': 'A passkey will be created on your device to secure your funds.',
    'passkey.alertTitle': 'Your passkey is how you access your funds',
    'passkey.alertText': 'Deleting your passkey from your device, browser, or password manager may make your funds permanently inaccessible.',
    'passkey.selectLabel': 'Select a label',
    'passkey.selectLabelDesc': 'Select an existing label or create a new one to connect with.',
    'passkey.createNewLabel': 'Create a new label...',
    'passkey.labelName': 'Label name',
    'passkey.labelExists': 'A label with this name already exists',
    'passkey.verificationFailed': 'Passkey verification failed',
    'passkey.verificationDesc': "This device can't complete a passkey ceremony until the app's domain configuration is recognized.",
    'passkey.diagnosticDetails': 'Diagnostic details',
    'passkey.diagnosticInfo': 'This typically happens when the app\'s domain configuration is not yet recognized by your device. Please ensure the app is properly installed.',
    'passkey.retryCheck': 'Retry Check',
    'passkey.shareDiagnostics': 'Share Diagnostic Logs',
    'passkey.useAnotherPasskey': 'Use Another Passkey',
    'passkey.createNewPasskey': 'Create New Passkey',
    'passkey.createPasskey': 'Create Passkey',
    'passkey.usePasskey': 'Use Passkey',
    'passkey.getStarted': 'Get Started',
    'passkey.passkeyExists': 'Passkey already exists',
    'passkey.signInCancelled': 'Sign-in cancelled',
    'passkey.passkeyUnavailable': 'Passkey unavailable',
    'passkey.signInFailed': 'Sign-in failed',
    'passkey.couldNotSaveLabel': "Couldn't save label",
    'passkey.couldNotConnect': "Couldn't connect",
    'passkey.couldNotCreatePasskey': "Couldn't create passkey",
    'passkey.somethingWentWrong': 'Something went wrong',
    'passkey.confirmDeleted': 'I confirm that this passkey was deleted.',
    'passkey.continueUnsure': 'Optional. Continue without ticking if unsure.',
    'passkey.alreadyExists': 'You already have a PEGGASUSD passkey on this device. Use it to sign in.',
    'passkey.notOnDevice': 'That passkey is no longer on this device.',
    'passkey.passkeyRemoved': 'Your PEGGASUSD passkey is no longer on this device. You can create a new one.',
    'passkey.couldNotFind': 'Could not find your PEGGASUSD passkey on this device. Try again, or check Settings → Passwords.',
    'passkey.couldNotSignIn': 'Could not sign in with that passkey. It may have been removed, or the prompt was cancelled.',
    'passkey.signInTimedOut': 'Sign-in timed out. Please try again.',
    'passkey.signInCancelledErr': 'Sign-in cancelled. Please try again.',
    'passkey.failedToSaveLabel': 'Failed to save label to Nostr',
    // Stable Balance
    'stableBalance.title': 'Stable Balance',
    'stableBalance.description': 'Your balance is held in USD and automatically converts to BTC when you make a Lightning payment.',
    'stableBalance.enable': 'Enable',
    'stableBalance.convertToUsd': 'Convert to USD',
    'stableBalance.convertToBtc': 'Convert to BTC',
    'stableBalance.convertUsdDesc': 'Your BTC balance will be converted to USD.',
    'stableBalance.convertBtcDesc': 'Your USD balance will be converted back to BTC.',
    'stableBalance.conversionFee': 'Conversion fee: ',
    'stableBalance.balanceTooLow': 'Balance too low to convert — it will remain as change',
    'stableBalance.couldNotEstimateFee': "Couldn't estimate fee",
    'stableBalance.confirm': 'Confirm',
    'stableBalance.usdDetected': 'USD Balance Detected',
    'stableBalance.restorePrompt': "We've detected USD funds in your wallet. You can convert them back to BTC.",
    // Install Prompt
    'install.title': 'Install PEGGASUSD',
    'install.description': 'Add to your home screen for quick access and a better experience.',
    'install.install': 'Install',
    'install.notNow': 'Not Now',
    // About
    'about.title': 'About',
    'about.description': 'PEGGASUSD is a self-custodial Lightning Network wallet that supports both SAT (Bitcoin) and USD (Spark tokens). It allows you to send and receive payments instantly with low fees.',
    'about.forkInfo': 'PEGGASUSD is a fork of Glow, an open-source wallet built by the Breez team. It has been customized with a new brand identity, theme, and language support while maintaining the same powerful SDK foundation.',
    'about.version': 'Version',
    'about.technology': 'Technology',
    'about.technologyDesc': 'Built with React, TypeScript, and the Breez SDK — powered by the Lightning Network and Spark Protocol for instant, low-cost transactions.',
    'about.features': 'Features',
    'about.featuresList': '• Instant Lightning payments\n• USD stable balance via Spark\n• QR code scanning\n• Contact management\n• Passkey & biometric authentication\n• Backup & restore with recovery phrase\n• Real-time transaction history',
    'about.disclaimer': 'PEGGASUSD is experimental software. Use at your own risk.',
    // Cross-chain
    'sendCrossChain.amountTooSmall': 'Amount too small for this route.',
    'sendCrossChain.amountTooLarge': 'Amount too large for this route.',
    'sendCrossChain.failedQuote': 'Failed to get quote.',
    'sendCrossChain.noRoutes': 'No cross-chain routes available for this address',
    'sendCrossChain.noAssets': 'No supported stablecoin routes available for this address',
    'sendCrossChain.fetchingRoutes': 'Fetching routes...',
    'sendCrossChain.selectCoin': 'Select coin',
    'sendCrossChain.selectNetwork': 'Select Network for {asset}',
    'sendCrossChain.selectProvider': 'Select Provider for {asset} ({chain})',
    'sendCrossChain.gettingQuote': 'Getting quote...',
    'sendCrossChain.receiving': 'Receiving',
    'sendCrossChain.fee': 'Fee',
    'sendCrossChain.chain': 'Chain',
    'sendCrossChain.provider': 'Provider',
    'sendCrossChain.address': 'Address',
    'sendCrossChain.changeAmount': 'Change Amount',
    'sendCrossChain.youreSending': "You're sending",
    'sendCrossChain.noQuote': "Couldn't get a quote",
    'sendCrossChain.tryAgain': 'Try Again',
    // LnurlAuth
    'lnurlAuth.register': 'Register',
    'lnurlAuth.logIn': 'Log in',
    'lnurlAuth.linkAccount': 'Link account',
    'lnurlAuth.authenticate': 'Authenticate',
    'lnurlAuth.wantsYouTo': 'wants you to',
    'lnurlAuth.privacyDesc': 'PEGGASUSD will sign a message to prove your identity without sharing any personal information.',
    'lnurlAuth.authenticating': 'Authenticating...',
    'lnurlAuth.authFailed': 'Authentication failed: {error}',
    // Staging Gate
    'staging.title': 'Staging Environment',
    'staging.description': 'This is a development build. Enter the password to continue.',
    'staging.enterPassword': 'Enter password',
    'staging.continue': 'Continue',
    'staging.incorrectPassword': 'Incorrect password',
  },

  es: {
    // Common
    appName: 'PEGGASUSD',
    send: 'Enviar',
    receive: 'Recibir',
    scan: 'Escanear Código QR',
    balance: 'Saldo',
    backup: 'Copia de seguridad',
    settings: 'Configuración',
    about: 'Acerca de',
    logout: 'Cerrar sesión',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    delete: 'Eliminar',
    close: 'Cerrar',
    back: 'Atrás',
    goBack: 'Volver',
    continue: 'Continuar',
    done: 'Listo',
    processing: 'Procesando...',
    error: 'Error',
    copy: 'Copiar',
    copied: '¡Copiado!',
    share: 'Compartir',
    saving: 'Guardando...',
    loading: 'Cargando...',
    retry: 'Reintentar',
    tryAgain: 'Intentar de nuevo',
    notNow: 'Ahora no',
    installing: 'Instalando...',
    install: 'Instalar',
    edit: 'Editar',
    add: 'Añadir',
    poweredBy: 'Desarrollado por Breez SDK',
    logoutWarning: 'Advertencia',
    logoutMessage: 'Asegúrate de haber guardado tu frase de recuperación antes de cerrar sesión. La necesitarás para acceder a tus fondos de nuevo.',
    logoutMessagePasskey: 'Necesitarás autenticarte con la misma passkey para acceder a tus fondos de nuevo.',
    // Home
    'home.tagline': 'Saldo Lightning + USD',
    'home.getStarted': 'Comenzar',
    'home.restoreFromBackup': 'Restaurar desde copia',
    'home.usePasskeyInstead': 'Usar Passkey en su lugar',
    'home.createPasskey': 'Crear Passkey',
    'home.useExistingPasskey': 'Usar Passkey existente',
    'home.useRecoveryPhrase': 'Usar frase de recuperación',
    // Wallet
    'wallet.syncing': 'Sincronizando',
    'wallet.noPayments': 'Aún no hay pagos',
    'wallet.noPaymentsDesc': 'Tu historial de pagos aparecerá aquí cuando envíes o recibas tu primer pago.',
    'wallet.payments': 'Pagos',
    'wallet.pendingConfirmation': 'Pendiente de confirmación',
    'wallet.pendingApproval': 'Pendiente de aprobación',
    'wallet.failed': 'Fallido',
    'wallet.fee': 'comisión',
    'wallet.refund': 'Reembolso',
    'wallet.saveContact': '¿Guardar como contacto?',
    'wallet.save': 'Guardar',
    'wallet.openMenu': 'Abrir menú',
    'wallet.paymentReceived': 'Pago recibido',
    'wallet.tapToDismiss': 'Toca en cualquier lugar para cerrar',
    'wallet.balanceLabel': 'Saldo',
    'wallet.change': 'cambio',
    'wallet.justNow': 'Ahora mismo',
    'wallet.minutesAgo': 'hace {m}m',
    'wallet.hoursAgo': 'hace {h}h',
    'wallet.daysAgo': 'hace {d}d',
    'wallet.monthsAgo': 'hace {mo}mes',
    'wallet.yearsAgo': 'hace {y}a',
    // Camera / QR Scanner
    'scanner.initializing': 'Iniciando cámara...',
    'scanner.notAvailable': 'Cámara no disponible',
    'scanner.pointCamera': 'Apunta la cámara al código QR',
    'scanner.noQrFound': 'No se encontró código QR en la imagen',
    'scanner.cameraPermissionDenied': 'Permiso de cámara denegado',
    'scanner.cameraPermissionDeniedDesc': 'Habilita el acceso a la cámara en la configuración del dispositivo para escanear códigos QR.',
    // Backup
    'backup.title': 'Copia de seguridad',
    'backup.passkeyProtected': 'Protegido con Passkey',
    'backup.passkeyProtectedDesc': 'Tu frase de recuperación se deriva de tu passkey. Para restaurar en otro dispositivo, usa tu passkey o la frase de recuperación.',
    'backup.revealPhrase': 'Toca para revelar la frase',
    'backup.authRequired': 'Requiere autenticación con passkey',
    'backup.completeAuth': 'Completa la autenticación con passkey',
    'backup.noOneWatching': 'Asegúrate de que nadie esté mirando',
    'backup.recoveryPhrase': 'Frase de recuperación',
    'backup.hide': 'Ocultar',
    'backup.noBackupFound': 'No se encontró copia',
    'backup.noBackupDesc': 'No se pudo encontrar una frase de recuperación para esta billetera.',
    'backup.passkeyUnavailable': 'Passkey no disponible',
    'backup.passkeyUnavailableDesc': 'Tu frase de recuperación se deriva de tu passkey. Sin ella, no se puede recuperar en este dispositivo. Inicia sesión en un dispositivo donde la passkey esté disponible.',
    // Settings
    'settings.title': 'Configuración',
    'settings.saveChanges': 'Guardar cambios',
    'settings.display': 'Pantalla',
    'settings.fiatCurrencies': 'Monedas fiduciarias',
    'settings.passkey': 'Passkey',
    'settings.passkeyLabels': 'Passkey y etiquetas',
    'settings.diagnostics': 'Diagnóstico',
    'settings.downloadLogs': 'Descargar registros',
    'settings.preparing': 'Preparando...',
    'settings.database': 'Base de datos',
    'settings.exportDatabase': 'Exportar base de datos',
    'settings.exporting': 'Exportando...',
    'settings.network': 'Red',
    'settings.mainnet': 'Mainnet',
    'settings.regtest': 'Regtest',
    'settings.networkHelp': 'Cambiar la red recargará la aplicación y se reconectará.',
    'settings.privacy': 'Privacidad',
    'settings.privateMode': 'Modo privado',
    'settings.privateModeDesc': 'Oculta tu dirección de exploradores públicos (no apto para zaps)',
    'settings.preferSpark': 'Preferir Spark',
    'settings.preferSparkDesc': 'Usar dirección Spark en lugar de factura Lightning cuando esté disponible',
    'settings.sendUsd': 'Enviar USD',
    'settings.sendUsdDesc': 'Habilitar envíos a direcciones USDC/USDT en otras cadenas',
    'settings.depositClaimFee': 'Comisión de reclamación',
    'settings.maxFeeType': 'Tipo de comisión máxima',
    'settings.fixedSats': 'Fijo (sats)',
    'settings.rateSatVb': 'Tarifa (sat/vB)',
    'settings.networkLeeway': 'Red + margen',
    'settings.syncInterval': 'Intervalo de sincronización (segundos)',
    'settings.lnurl': 'LNURL',
    'settings.customDomain': 'Dominio personalizado',
    'settings.version': 'PEGGASUSD v1.0.0',
    'settings.dev': '(dev)',
    'settings.devModeTaps': 'toques más para',
    'settings.enable': 'activar',
    'settings.disable': 'desactivar',
    'settings.e.g30': 'ej. 30',
    'settings.exampleDotCom': 'ejemplo.com',
    // Receive
    'receive.title': 'Recibir',
    'receive.createInvoice': 'Crear factura',
    'receive.amount': 'Cantidad',
    'receive.descriptionOptional': 'Descripción (opcional)',
    'receive.whatsThisFor': '¿Para qué es?',
    'receive.invalidAmount': 'Cantidad no válida',
    'receive.generateInvoice': 'Generar factura',
    'receive.lightning': 'Lightning',
    'receive.bitcoin': 'Bitcoin',
    'receive.lightningInvoice': 'Factura Lightning',
    'receive.sparkAddress': 'Dirección Spark',
    'receive.bitcoinAddress': 'Dirección Bitcoin',
    'receive.paymentRequest': 'Solicitud de pago',
    'receive.scanToPay': 'Escanea para pagar esta factura Lightning',
    'receive.useThisAddress': 'Usa esta dirección para recibir pagos',
    'receive.sendBitcoinTo': 'Envía Bitcoin a esta dirección para conversión automática a Lightning',
    'receive.createLightningAddress': 'Crear dirección Lightning',
    'receive.editLightningAddress': 'Editar dirección Lightning',
    'receive.createAddress': 'Crear dirección',
    'receive.editAddress': 'Editar dirección',
    'receive.receivePaymentsEasily': 'Crea una dirección Lightning para recibir pagos fácilmente',
    'receive.lnurlPay': 'LNURL-Pay',
    'receive.generatingInvoice': 'Generando factura...',
    'receive.loadingLightningAddress': 'Cargando dirección Lightning...',
    'receive.generatingSpark': 'Generando dirección Spark...',
    'receive.generatingBitcoin': 'Generando dirección Bitcoin...',
    'receive.confirmUsernameChange': 'Confirmar cambio de usuario',
    'receive.change': 'Cambiar',
    // Send
    'send.sendBtcOrUsd': 'Enviar BTC o USD',
    'send.sendBtc': 'Enviar BTC',
    'send.payTo': 'Pagar a',
    'send.amount': 'Cantidad',
    'send.destination': 'Destino',
    'send.enterAmountSats': 'Introduce cantidad en satoshis',
    'send.enterAmountToken': 'Introduce cantidad en {tokenSymbol}',
    'send.enterAmountUsd': 'Introduce cantidad en USD',
    'send.sendAll': 'Enviar todo',
    'send.balanceUpdating': 'El saldo se está actualizando. Intenta de nuevo en un momento.',
    'send.paste': 'Pegar',
    'send.scan': 'Escanear',
    'send.contacts': 'Contactos',
    'send.lightningInvoice': 'Factura Lightning',
    'send.sparkAddress': 'Dirección Spark',
    'send.bitcoinAddress': 'Dirección Bitcoin',
    'send.lnurlPay': 'Pago LNURL',
    'send.lightningAddress': 'Dirección Lightning',
    'send.lnurlAuth': 'Autenticación LNURL',
    'send.sendUsd': 'Enviar USD',
    'send.payment': 'Pago',
    'send.enterValidAmount': 'Introduce una cantidad válida',
    'send.enterDestination': 'Introduce un destino de pago',
    'send.invalidDestination': 'Destino de pago no válido',
    'send.amountExceedsBalance': 'La cantidad excede el saldo disponible',
    'send.paymentFailed': 'Pago fallido: {error}',
    'send.operationFailed': 'Operación fallida: {error}',
    'send.youreSending': 'Estás enviando',
    'send.recipientGets': 'El destinatario recibe',
    'send.conversionAmount': 'Cantidad convertida',
    'send.conversionFee': 'Comisión de conversión',
    'send.insufficientFunds': 'Fondos insuficientes',
    'send.send': 'Enviar',
    'send.paymentSent': '¡Pago enviado!',
    'send.paymentFailedTitle': 'Pago fallido',
    'send.authenticated': '¡Autenticado!',
    'send.authenticationFailed': 'Autenticación fallida',
    'send.successDescription': 'Tu pago ha sido enviado correctamente al destinatario.',
    'send.authSuccessDescription': 'Te has autenticado correctamente con el servicio.',
    'send.failedDescription': 'Hubo un error al procesar tu pago. Intenta de nuevo.',
    'send.authFailedDescription': 'Hubo un error durante la autenticación. Intenta de nuevo.',
    'send.close': 'Cerrar',
    'send.done': 'Listo',
    'send.processingTitle': 'Enviando...',
    'send.convertingTitle': 'Convirtiendo...',
    'send.sendingTitle': 'Enviando...',
    'send.processingAuthDesc': 'Por favor espera mientras verificamos tu identidad...',
    'send.processingConversionDesc': 'Por favor espera mientras convertimos la cantidad...',
    'send.processingSendingDesc': 'Por favor espera mientras procesamos tu transacción...',
    'send.commentMaxLength': 'El comentario debe tener como máximo {maxLen} caracteres',
    'send.minAmount': 'La cantidad debe ser al menos ₿{minSats}',
    'send.maxAmount': 'La cantidad debe ser como máximo ₿{maxSats}',
    'send.commentOptional': 'Comentario (opcional)',
    'send.addMessage': 'Añade un mensaje...',
    'send.failedToPrepare': 'Error al preparar el pago: {error}',
    'send.invalidPaymentDestination': 'Destino de pago no válido',
    'send.selectFeeRate': 'Seleccionar tarifa',
    'send.slow': 'Lenta',
    'send.medium': 'Media',
    'send.fast': 'Rápida',
    'send.networkFee': 'Comisión de red',
    'send.youReceive': 'Tú recibes',
    // Contacts
    'contacts.title': 'Contactos',
    'contacts.add': 'Añadir',
    'contacts.noMatches': 'Sin coincidencias',
    'contacts.noContacts': 'Aún no hay contactos',
    'contacts.tryDifferentSearch': 'Prueba con otro término de búsqueda.',
    'contacts.addContactsToSend': 'Añade contactos para enviar pagos rápidamente.',
    'contacts.editContact': 'Editar contacto',
    'contacts.newContact': 'Nuevo contacto',
    'contacts.name': 'Nombre',
    'contacts.lightningAddress': 'Dirección Lightning',
    'contacts.saving': 'Guardando...',
    'contacts.save': 'Guardar',
    'contacts.deleteContact': 'Eliminar contacto',
    'contacts.deleteConfirm': '¿Estás seguro de que quieres eliminar a "{name}"?',
    'contacts.delete': 'Eliminar',
    'contacts.nameRequired': 'El nombre es obligatorio',
    'contacts.addressRequired': 'La dirección es obligatoria',
    'contacts.invalidAddress': 'Formato de dirección Lightning no válido',
    'contacts.addressNotFound': 'Dirección Lightning no encontrada',
    'contacts.contactSaved': 'Contacto guardado',
    'contacts.searchContacts': 'Buscar contactos...',
    'contacts.clearSearch': 'Limpiar búsqueda',
    'contacts.addContact': 'Añadir contacto',
    'contacts.failedToSave': 'Error al guardar el contacto',
    'contacts.failedToUpdate': 'Error al actualizar el contacto',
    'contacts.failedToAdd': 'Error al añadir el contacto',
    // Get Refund
    'refund.title': 'Obtener reembolso',
    'refund.loading': 'Cargando depósitos rechazados...',
    'refund.allClear': '¡Todo en orden!',
    'refund.noDeposits': 'No hay depósitos rechazados pendientes de reembolso.',
    'refund.amount': 'Cantidad',
    'refund.transactionId': 'ID de transacción',
    'refund.refundTransactionId': 'ID de reembolso',
    'refund.broadcasting': 'Transmitiendo',
    'refund.continue': 'Continuar',
    'refund.refundSent': 'Reembolso enviado',
    'refund.refundFailed': 'Reembolso fallido',
    'refund.refundToBitcoin': 'Reembolso a Bitcoin',
    'refund.destination': 'Destino',
    'refund.destinationHelp': 'Introduce la dirección Bitcoin donde deseas recibir el reembolso.',
    'refund.selectFeeRate': 'Seleccionar tarifa',
    'refund.slow': 'Lenta',
    'refund.medium': 'Media',
    'refund.fast': 'Rápida',
    'refund.youReceive': 'Tú recibes',
    'refund.networkFee': 'Comisión de red',
    'refund.refund': 'Reembolsar',
    'refund.processing': 'Procesando reembolso...',
    'refund.refundBroadcast': 'Reembolso transmitido',
    'refund.refundBroadcastDesc': 'Tu reembolso ha sido enviado a la red Bitcoin.',
    'refund.done': 'Listo',
    'refund.failedToLoad': 'Error al cargar depósitos rechazados',
    'refund.failedToRefund': 'Error al reembolsar el depósito',
    // Restore
    'restore.title': 'Restaurar desde copia',
    'restore.restoring': 'Restaurando...',
    'restore.restoreWallet': 'Restaurar billetera',
    'restore.instruction': 'Introduce tu frase de recuperación de 12 o 24 palabras para restaurar tu billetera. Las palabras deben estar separadas por espacios.',
    'restore.placeholder': 'palabra1 palabra2 palabra3 ...',
    'restore.invalidPhrase': 'Introduce una frase de recuperación válida de 12 o 24 palabras',
    'restore.apiError': 'Frase de recuperación no válida. Verifica tus palabras e inténtalo de nuevo.',
    // Generate
    'generate.title': 'Comenzar',
    'generate.settingUp': 'Configurando PEGGASUSD...',
    'generate.savedPhrase': 'He guardado mi frase',
    'generate.instruction': 'Escribe estas palabras en orden. Esta es tu única copia de seguridad para recuperar tus fondos.',
    'generate.copied': '¡Copiado!',
    'generate.copyClipboard': 'Copiar al portapapeles',
    'generate.keepSecret': 'Mantenlo en secreto',
    'generate.neverShare': 'Nunca compartas tu frase de recuperación. Cualquiera con estas palabras puede acceder a tus fondos.',
    // Unlock
    'unlock.unlockPasskey': 'Desbloquear con passkey',
    'unlock.unlockBiometric': 'Desbloquear',
    'unlock.lockedPasskey': 'Tu billetera está bloqueada. Desbloquéala con tu passkey para continuar.',
    'unlock.lockedBiometric': 'Tu billetera está bloqueada. Desbloquéala con tu biometría para continuar.',
    'unlock.welcomeBack': 'Bienvenido de nuevo',
    'unlock.failed': 'Desbloqueo fallido',
    'unlock.useDifferentWallet': 'Usar otra billetera',
    'unlock.unlocking': 'Autenticando...',
    // Fiat Currencies
    'fiat.title': 'Monedas fiduciarias',
    'fiat.failedToLoad': 'Error al cargar monedas. Intenta de nuevo.',
    'fiat.moveUp': 'Subir',
    'fiat.moveDown': 'Bajar',
    // Payment Details
    'paymentDetails.amount': 'Cantidad',
    'paymentDetails.fee': 'Comisión',
    'paymentDetails.dateTime': 'Fecha y hora',
    'paymentDetails.receivedAmount': 'Cantidad recibida',
    'paymentDetails.network': 'Red',
    'paymentDetails.recipientAddress': 'Dirección del destinatario',
    'paymentDetails.description': 'Descripción',
    'paymentDetails.lightningAddress': 'Dirección Lightning',
    'paymentDetails.lnurlPayment': 'Pago LNURL',
    'paymentDetails.comment': 'Comentario',
    'paymentDetails.invoice': 'Factura',
    'paymentDetails.paymentPreimage': 'Preimagen del pago',
    'paymentDetails.destinationPublicKey': 'Clave pública del destino',
    'paymentDetails.successAction': 'Acción de éxito',
    'paymentDetails.message': 'Mensaje',
    'paymentDetails.url': 'URL',
    'paymentDetails.transactionId': 'ID de transacción',
    'paymentDetails.conversionDetails': 'Detalles de conversión',
    'paymentDetails.provider': 'Proveedor',
    'paymentDetails.initialAmount': 'Cantidad inicial',
    'paymentDetails.convertedAmount': 'Cantidad convertida',
    'paymentDetails.unknown': 'Desconocido',
    // Passkey
    'passkey.createYourPasskey': 'Crea tu passkey',
    'passkey.secureFunds': 'Se creará una passkey en tu dispositivo para proteger tus fondos.',
    'passkey.alertTitle': 'Tu passkey es cómo accedes a tus fondos',
    'passkey.alertText': 'Eliminar tu passkey de tu dispositivo, navegador o gestor de contraseñas puede hacer que tus fondos sean permanentemente inaccesibles.',
    'passkey.selectLabel': 'Selecciona una etiqueta',
    'passkey.selectLabelDesc': 'Selecciona una etiqueta existente o crea una nueva para conectarte.',
    'passkey.createNewLabel': 'Crear nueva etiqueta...',
    'passkey.labelName': 'Nombre de la etiqueta',
    'passkey.labelExists': 'Ya existe una etiqueta con este nombre',
    'passkey.verificationFailed': 'Verificación de passkey fallida',
    'passkey.verificationDesc': 'Este dispositivo no puede completar una ceremonia de passkey hasta que se reconozca la configuración del dominio de la aplicación.',
    'passkey.diagnosticDetails': 'Detalles de diagnóstico',
    'passkey.diagnosticInfo': 'Esto ocurre típicamente cuando la configuración del dominio de la aplicación aún no es reconocida por tu dispositivo. Asegúrate de que la aplicación esté correctamente instalada.',
    'passkey.retryCheck': 'Reintentar verificación',
    'passkey.shareDiagnostics': 'Compartir registros de diagnóstico',
    'passkey.useAnotherPasskey': 'Usar otra passkey',
    'passkey.createNewPasskey': 'Crear nueva passkey',
    'passkey.createPasskey': 'Crear Passkey',
    'passkey.usePasskey': 'Usar Passkey',
    'passkey.getStarted': 'Comenzar',
    'passkey.passkeyExists': 'La passkey ya existe',
    'passkey.signInCancelled': 'Inicio de sesión cancelado',
    'passkey.passkeyUnavailable': 'Passkey no disponible',
    'passkey.signInFailed': 'Inicio de sesión fallido',
    'passkey.couldNotSaveLabel': 'No se pudo guardar la etiqueta',
    'passkey.couldNotConnect': 'No se pudo conectar',
    'passkey.couldNotCreatePasskey': 'No se pudo crear la passkey',
    'passkey.somethingWentWrong': 'Algo salió mal',
    'passkey.confirmDeleted': 'Confirmo que esta passkey fue eliminada.',
    'passkey.continueUnsure': 'Opcional. Continúa sin marcar si no estás seguro.',
    'passkey.alreadyExists': 'Ya tienes una passkey de PEGGASUSD en este dispositivo. Úsala para iniciar sesión.',
    'passkey.notOnDevice': 'Esa passkey ya no está en este dispositivo.',
    'passkey.passkeyRemoved': 'Tu passkey de PEGGASUSD ya no está en este dispositivo. Puedes crear una nueva.',
    'passkey.couldNotFind': 'No se pudo encontrar tu passkey de PEGGASUSD en este dispositivo. Intenta de nuevo o revisa Configuración → Contraseñas.',
    'passkey.couldNotSignIn': 'No se pudo iniciar sesión con esa passkey. Puede que haya sido eliminada o que la solicitud se haya cancelado.',
    'passkey.signInTimedOut': 'La solicitud de inicio de sesión expiró. Intenta de nuevo.',
    'passkey.signInCancelledErr': 'Inicio de sesión cancelado. Intenta de nuevo.',
    'passkey.failedToSaveLabel': 'Error al guardar la etiqueta en Nostr',
    // Stable Balance
    'stableBalance.title': 'Saldo estable',
    'stableBalance.description': 'Tu saldo se mantiene en USD y se convierte automáticamente a BTC cuando realizas un pago Lightning.',
    'stableBalance.enable': 'Activar',
    'stableBalance.convertToUsd': 'Convertir a USD',
    'stableBalance.convertToBtc': 'Convertir a BTC',
    'stableBalance.convertUsdDesc': 'Tu saldo BTC se convertirá a USD.',
    'stableBalance.convertBtcDesc': 'Tu saldo USD se convertirá de vuelta a BTC.',
    'stableBalance.conversionFee': 'Comisión de conversión: ',
    'stableBalance.balanceTooLow': 'Saldo demasiado bajo para convertir — permanecerá como cambio',
    'stableBalance.couldNotEstimateFee': 'No se pudo estimar la comisión',
    'stableBalance.confirm': 'Confirmar',
    'stableBalance.usdDetected': 'Saldo USD detectado',
    'stableBalance.restorePrompt': 'Hemos detectado fondos en USD en tu billetera. Puedes convertirlos de vuelta a BTC.',
    // Install Prompt
    'install.title': 'Instalar PEGGASUSD',
    'install.description': 'Añádela a tu pantalla de inicio para acceso rápido y una mejor experiencia.',
    'install.install': 'Instalar',
    'install.notNow': 'Ahora no',
    // About
    'about.title': 'Acerca de',
    'about.description': 'PEGGASUSD es una billetera auto-custodial de la Red Lightning que admite saldos en SAT (Bitcoin) y USD (tokens Spark). Te permite enviar y recibir pagos al instante con comisiones bajas.',
    'about.forkInfo': 'PEGGASUSD es un fork de Glow, una billetera de código abierto construida por el equipo de Breez. Ha sido personalizada con una nueva identidad de marca, tema y soporte de idiomas, manteniendo la misma base sólida del SDK.',
    'about.version': 'Versión',
    'about.technology': 'Tecnología',
    'about.technologyDesc': 'Construida con React, TypeScript y Breez SDK — impulsada por la Red Lightning y el Protocolo Spark para transacciones instantáneas y de bajo costo.',
    'about.features': 'Características',
    'about.featuresList': '• Pagos Lightning instantáneos\n• Saldo USD estable vía Spark\n• Escaneo de códigos QR\n• Gestión de contactos\n• Autenticación con passkey y biometría\n• Copia de seguridad y restauración con frase de recuperación\n• Historial de transacciones en tiempo real',
    'about.disclaimer': 'PEGGASUSD es software experimental. Úsalo bajo tu propio riesgo.',
    // Cross-chain
    'sendCrossChain.amountTooSmall': 'Cantidad demasiado pequeña para esta ruta.',
    'sendCrossChain.amountTooLarge': 'Cantidad demasiado grande para esta ruta.',
    'sendCrossChain.failedQuote': 'Error al obtener cotización.',
    'sendCrossChain.noRoutes': 'No hay rutas entre cadenas disponibles para esta dirección',
    'sendCrossChain.noAssets': 'No hay rutas de stablecoin disponibles para esta dirección',
    'sendCrossChain.fetchingRoutes': 'Buscando rutas...',
    'sendCrossChain.selectCoin': 'Seleccionar moneda',
    'sendCrossChain.selectNetwork': 'Seleccionar red para {asset}',
    'sendCrossChain.selectProvider': 'Seleccionar proveedor para {asset} ({chain})',
    'sendCrossChain.gettingQuote': 'Obteniendo cotización...',
    'sendCrossChain.receiving': 'Recibiendo',
    'sendCrossChain.fee': 'Comisión',
    'sendCrossChain.chain': 'Red',
    'sendCrossChain.provider': 'Proveedor',
    'sendCrossChain.address': 'Dirección',
    'sendCrossChain.changeAmount': 'Cambiar cantidad',
    'sendCrossChain.youreSending': 'Estás enviando',
    'sendCrossChain.noQuote': 'No se pudo obtener cotización',
    'sendCrossChain.tryAgain': 'Intentar de nuevo',
    // LnurlAuth
    'lnurlAuth.register': 'Registrarse',
    'lnurlAuth.logIn': 'Iniciar sesión',
    'lnurlAuth.linkAccount': 'Vincular cuenta',
    'lnurlAuth.authenticate': 'Autenticar',
    'lnurlAuth.wantsYouTo': 'quiere que',
    'lnurlAuth.privacyDesc': 'PEGGASUSD firmará un mensaje para probar tu identidad sin compartir información personal.',
    'lnurlAuth.authenticating': 'Autenticando...',
    'lnurlAuth.authFailed': 'Autenticación fallida: {error}',
    // Staging Gate
    'staging.title': 'Entorno de desarrollo',
    'staging.description': 'Esta es una compilación de desarrollo. Introduce la contraseña para continuar.',
    'staging.enterPassword': 'Introduce la contraseña',
    'staging.continue': 'Continuar',
    'staging.incorrectPassword': 'Contraseña incorrecta',
  },
};

export function t(key: TranslationKey, params?: Record<string, string | number>): string {
  let value = translations[currentLocale][key];
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(`{${k}}`, String(v));
    }
  }
  return value;
}
