/**
 * UnlockingPage — branded placeholder shown on cold launch while the
 * auto-triggered system BiometricPrompt is visible.
 *
 * Pure status screen: Glow logo + "Authenticating…" spinner, no
 * interactive controls. Content is top-aligned with a generous
 * safe-area-aware padding because on some OEM skins the system
 * biometric dialog occupies roughly the bottom half of the
 * viewport, and we want the branded content to stay visible
 * above it rather than being hidden behind the dialog.
 *
 * On cancel / lockout / retry, useBreezSdk transitions
 * startupState to 'native-locked' which renders the separate,
 * interactive UnlockPage.
 */

import React, { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { logger, LogCategory } from '../services/logger';

const UnlockingPage: React.FC = () => {
  useEffect(() => {
    logger.info(LogCategory.UI, 'UnlockingPage:mounted');
    // Second effect runs after paint (via rAF) so we can distinguish
    // mount-commit from paint-on-screen in shared logs.
    requestAnimationFrame(() => {
      logger.info(LogCategory.UI, 'UnlockingPage:painted');
    });
  }, []);

  return (
    <div className="min-h-dvh h-dvh w-full flex flex-col bg-spark-surface relative">
      <div
        className="w-full flex flex-col items-center px-6"
        style={{
          // Native biometric dialogs cover the bottom half of the
          // screen, so keep content near the top there. On web the
          // WebAuthn prompt is small and top/center, so push down.
          paddingTop: Capacitor.isNativePlatform()
            ? 'calc(env(safe-area-inset-top, 0px) + 3rem)'
            : 'calc(env(safe-area-inset-top, 0px) + 8rem)',
        }}
      >
        <div className="max-w-sm w-full flex flex-col items-center gap-8">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Rotating stars */}
            <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
              <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A,0_0_8px_rgba(247,147,26,0.4)]" style={{ top: '0', left: '50%', transform: 'translateX(-50%)' }} />
              <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A,0_0_8px_rgba(247,147,26,0.4)]" style={{ top: '2%', right: '12%' }} />
              <div className="absolute w-1 h-1 bg-[#00C7B7] rounded-full shadow-[0_0_4px_#00C7B7,0_0_8px_rgba(0,199,183,0.4)]" style={{ right: '0', top: '30%' }} />
              <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A,0_0_8px_rgba(247,147,26,0.4)]" style={{ right: '2%', bottom: '25%' }} />
              <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A,0_0_8px_rgba(247,147,26,0.4)]" style={{ bottom: '2%', right: '15%' }} />
              <div className="absolute w-1 h-1 bg-[#00C7B7] rounded-full shadow-[0_0_4px_#00C7B7,0_0_8px_rgba(0,199,183,0.4)]" style={{ bottom: '0', left: '50%', transform: 'translateX(-50%)' }} />
              <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A,0_0_8px_rgba(247,147,26,0.4)]" style={{ bottom: '2%', left: '15%' }} />
              <div className="absolute w-1 h-1 bg-[#00C7B7] rounded-full shadow-[0_0_4px_#00C7B7,0_0_8px_rgba(0,199,183,0.4)]" style={{ left: '2%', bottom: '25%' }} />
              <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A,0_0_8px_rgba(247,147,26,0.4)]" style={{ left: '0', top: '30%' }} />
              <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A,0_0_8px_rgba(247,147,26,0.4)]" style={{ top: '2%', left: '12%' }} />
            </div>
            {/* Inner ring */}
            <div className="absolute w-32 h-32 rounded-full border border-[rgba(247,147,26,0.1)] animate-[spin_8s_linear_infinite_reverse]">
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_6px_#F7931A]" />
            </div>
            {/* Logo */}
            <img
              src="/assets/PEGGASUSD_Logo.png"
              alt="PEGGASUSD"
              className="w-16 h-16 relative z-10"
            />
          </div>

          <div className="flex items-center justify-center gap-3 text-spark-text-secondary text-sm">
            <div className="w-5 h-5 rounded-full border-2 border-spark-primary border-t-transparent animate-spin" />
            <span>Authenticating…</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockingPage;
