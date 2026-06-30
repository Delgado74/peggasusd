import React from 'react';
import type { ProcessingPhase } from '../hooks/useSendPayment';

export interface ProcessingStepProps {
  /** Operation type to customize messaging (default: 'payment') */
  operationType?: 'payment' | 'auth';
  /** Processing phase for conversion payments */
  processingPhase?: ProcessingPhase;
}

const ProcessingStep: React.FC<ProcessingStepProps> = ({ operationType = 'payment', processingPhase = 'sending' }) => {
  const isAuth = operationType === 'auth';
  const isConverting = processingPhase === 'converting';

  const getTitle = () => {
    if (isAuth) return 'Authenticating...';
    if (isConverting) return 'Converting...';
    return 'Sending...';
  };
  const getDescription = () => {
    if (isAuth) return 'Please wait while we verify your identity...';
    if (isConverting) return 'Please wait while we convert the amount...';
    return 'Please wait while we process your transaction...';
  };

  // Key icon for auth, lightning bolt for payment
  const renderIcon = () => {
    if (isAuth) {
      return (
        <svg
          className="w-10 h-10 text-spark-electric"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      );
    }
    return (
      <svg
        className="w-10 h-10 text-spark-electric"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Animated PEGGASUSD logo with stars */}
      <div className="relative mb-8">
        {/* Logo container with spinning stars */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Spinning stars ring */}
          <span className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '12s' }}>
            <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A]" style={{ top: '0', left: '50%', transform: 'translateX(-50%)' }} />
            <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A]" style={{ top: '20%', right: '5%' }} />
            <div className="absolute w-1 h-1 bg-[#00C7B7] rounded-full shadow-[0_0_4px_#00C7B7]" style={{ right: '0', top: '45%' }} />
            <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A]" style={{ bottom: '20%', right: '5%' }} />
            <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A]" style={{ bottom: '0', left: '50%', transform: 'translateX(-50%)' }} />
            <div className="absolute w-1 h-1 bg-[#00C7B7] rounded-full shadow-[0_0_4px_#00C7B7]" style={{ bottom: '20%', left: '5%' }} />
            <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A]" style={{ left: '0', top: '45%' }} />
            <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A]" style={{ top: '20%', left: '5%' }} />
          </span>

          {/* Inner ring */}
          <span className="absolute inset-2 w-auto h-auto animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}>
            <div className="w-full h-full rounded-full border border-[rgba(247,147,26,0.15)]" />
          </span>

          {/* Icon */}
          {isAuth ? renderIcon() : (
            <img
              src="/assets/PEGGASUSD_Logo.png"
              alt="Processing"
              className="w-12 h-12 object-contain relative z-10"
            />
          )}
        </div>
      </div>

      {/* Text */}
      <h3 className="font-display text-xl font-semibold text-spark-text-primary mb-2">
        {getTitle()}
      </h3>
      <p className="text-spark-text-secondary text-sm text-center max-w-xs">
        {getDescription()}
      </p>

      {/* Animated dots in brand color */}
      <div className="flex gap-1.5 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-spark-primary"
            style={{
              animation: 'bounce 1s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessingStep;
