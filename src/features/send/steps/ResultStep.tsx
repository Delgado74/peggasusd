import React from 'react';
import { PrimaryButton, ErrorMessageBox } from '../../../components/ui';
import { CloseIcon } from '../../../components/Icons';

export interface ResultStepProps {
  result: 'success' | 'failure';
  error: string | null;
  onClose: () => void;
  /** Operation type to customize messaging (default: 'payment') */
  operationType?: 'payment' | 'auth';
}

const ResultStep: React.FC<ResultStepProps> = ({ result, error, onClose, operationType = 'payment' }) => {
  const isSuccess = result === 'success';

  const getTitle = () => {
    if (operationType === 'auth') {
      return isSuccess ? 'Authenticated!' : 'Authentication Failed';
    }
    return isSuccess ? 'Payment Sent!' : 'Payment Failed';
  };

  const getSuccessDescription = () => {
    if (operationType === 'auth') {
      return 'You have successfully authenticated with the service.';
    }
    return 'Your payment has been successfully sent to the recipient.';
  };

  const getDefaultErrorMessage = () => {
    if (operationType === 'auth') {
      return 'There was an error during authentication. Please try again.';
    }
    return 'There was an error processing your payment. Please try again.';
  };

  if (!isSuccess) {
    // Auth failure: use ErrorMessageBox card style
    if (operationType === 'auth') {
      return (
        <div className="space-y-5">
          <ErrorMessageBox
            title={getTitle()}
            error={error || getDefaultErrorMessage()}
          />
          <PrimaryButton onClick={onClose} className="w-full">
            Close
          </PrimaryButton>
        </div>
      );
    }

    // Payment failure: circular error icon with glow
    return (
      <div className="flex flex-col items-center justify-center py-4" data-testid="payment-failure">
        <div className="relative mb-6">
          {/* Error glow */}
          <div className="absolute inset-0 w-20 h-20 rounded-full blur-xl bg-spark-error/30" />

          {/* Error icon */}
          <div className="relative w-20 h-20 rounded-full flex items-center justify-center bg-spark-error/20 border-2 border-spark-error">
            <CloseIcon className="w-10 h-10 text-spark-error" />
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold mb-2 text-spark-error">
          {getTitle()}
        </h3>

        <p className="text-spark-text-secondary text-center max-w-xs mb-8">
          {error || getDefaultErrorMessage()}
        </p>

        <PrimaryButton onClick={onClose} className="min-w-[200px]">
          Close
        </PrimaryButton>
      </div>
    );
  }

  // Success: show icon, title, description, and done button
  return (
    <div className="flex flex-col items-center justify-center py-4" data-testid={isSuccess ? 'payment-success' : 'payment-failure'}>
      {/* Result icon */}
      <div className="relative mb-6">
        {/* Glow effect */}
        <div className="absolute -inset-3 rounded-full blur-xl" style={{ background: 'rgba(247,147,26,0.20)' }} />

        {/* Logo with stars */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
            <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A]" style={{ top: '0', left: '50%', transform: 'translateX(-50%)' }} />
            <div className="absolute w-1 h-1 bg-[#00C7B7] rounded-full shadow-[0_0_4px_#00C7B7]" style={{ bottom: '0', left: '50%', transform: 'translateX(-50%)' }} />
            <div className="absolute w-1 h-1 bg-[#F7931A] rounded-full shadow-[0_0_4px_#F7931A]" style={{ left: '0', top: '50%', transform: 'translateY(-50%)' }} />
            <div className="absolute w-1 h-1 bg-[#00C7B7] rounded-full shadow-[0_0_4px_#00C7B7]" style={{ right: '0', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          <img
            src="/assets/PEGGASUSD_Logo.png"
            alt="PEGGASUSD"
            className="w-14 h-14 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(247,147,26,0.5)]"
          />
          <span
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-[2.5px] uppercase whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #F7931A, #00C7B7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            PEGGASUSD
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl font-bold mb-2 text-spark-primary">
        {getTitle()}
      </h3>

      {/* Description */}
      <p className="text-spark-text-secondary text-center max-w-xs mb-8">
        {getSuccessDescription()}
      </p>

      {/* Action button */}
      <PrimaryButton onClick={onClose} className="min-w-[200px]">
        Done
      </PrimaryButton>
    </div>
  );
};

export default ResultStep;
