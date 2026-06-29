import React from 'react';

export interface GlowLogoProps {
  /** Logo display size in px (used for both width & height of the box). */
  sizePx: number;
  /** Optional click handler on the logo image. */
  onClick?: () => void;
  /** Extra classes for the <img> (e.g. drop-shadow). */
  imgClassName?: string;
  /** Image alt text. */
  alt?: string;
}

const GlowLogo: React.FC<GlowLogoProps> = ({
  sizePx,
  onClick,
  imgClassName = '',
  alt = 'PEGGASUSD',
}) => {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: sizePx, height: sizePx }}
    >
      <img
        src="/assets/PEGGASUSD_Logo.png"
        alt={alt}
        className={`w-full h-full object-contain ${imgClassName}`}
        onClick={onClick}
        style={{ transform: 'translateZ(0)' }}
      />
    </div>
  );
};

export default GlowLogo;
