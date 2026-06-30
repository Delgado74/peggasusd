import React from 'react';
import SlideInPage from '../components/layout/SlideInPage';
import GlowLogo from '../components/GlowLogo';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <SlideInPage title="Acerca de" onClose={onBack}>
      <div className="p-6 space-y-8">
        {/* Logo & Name */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <GlowLogo sizePx={80} />
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-spark-text-primary">PEGGASUSD</h2>
            <p className="text-sm text-spark-text-muted mt-1">v1.0.0</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-sm text-spark-text-secondary leading-relaxed">
            PEGGASUSD es una billetera auto-custodial de la Red Lightning que soporta saldos en SAT (Bitcoin) y USD (tokens Spark). Te permite enviar y recibir pagos al instante con comisiones bajas.
          </p>

          <div className="bg-spark-surface/50 border border-spark-border rounded-xl p-4">
            <p className="text-xs text-spark-text-muted leading-relaxed">
              PEGGASUSD es un fork de{' '}
              <a href="https://glow.app" target="_blank" rel="noopener noreferrer" className="text-spark-primary underline">
                Glow
              </a>
              , una billetera de código abierto construida por el equipo de{' '}
              <a href="https://breez.technology" target="_blank" rel="noopener noreferrer" className="text-spark-primary underline">
                Breez
              </a>
              . Ha sido personalizada con una nueva identidad de marca, tema oscuro y soporte de idiomas, manteniendo la misma base sólida del SDK.
            </p>
          </div>
        </div>

        {/* Technology */}
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-spark-text-primary text-sm uppercase tracking-wider">Tecnología</h3>
          <p className="text-sm text-spark-text-secondary leading-relaxed">
            Construida con React, TypeScript y Breez SDK — impulsada por la Red Lightning y el Protocolo Spark para transacciones instantáneas y de bajo costo.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-spark-text-primary text-sm uppercase tracking-wider">Características</h3>
          <ul className="text-sm text-spark-text-secondary space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-spark-primary mt-0.5">•</span>
              <span>Pagos Lightning instantáneos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-spark-primary mt-0.5">•</span>
              <span>Saldo USD estable vía Spark</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-spark-primary mt-0.5">•</span>
              <span>Escaneo de códigos QR</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-spark-primary mt-0.5">•</span>
              <span>Gestión de contactos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-spark-primary mt-0.5">•</span>
              <span>Autenticación con passkey y biometría</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-spark-primary mt-0.5">•</span>
              <span>Copia de seguridad y restauración con frase de recuperación</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-spark-primary mt-0.5">•</span>
              <span>Historial de transacciones en tiempo real</span>
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="bg-spark-warning/10 border border-spark-warning/20 rounded-xl p-4">
          <p className="text-xs text-spark-warning leading-relaxed">
            PEGGASUSD es software experimental. Úsalo bajo tu propio riesgo.
          </p>
        </div>

        {/* Credits */}
        <div className="text-center pb-4">
          <p className="text-xs text-spark-text-muted">
            Desarrollado por{' '}
            <a href="https://breez.technology/sdk/" target="_blank" rel="noopener noreferrer" className="text-spark-text-secondary underline">
              Breez SDK
            </a>
          </p>
        </div>
      </div>
    </SlideInPage>
  );
};

export default AboutPage;
