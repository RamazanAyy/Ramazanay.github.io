import Image from 'next/image';

interface LogoProps {
  className?: string;
  height?: number;
  /** Beyaz/açık arka plan üzerinde mix-blend-mode:multiply ile arka planı şeffaflaştırır */
  blend?: boolean;
}

export default function Logo({ className = '', height = 40, blend = true }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Soft & Power"
      width={Math.round(height * 2.4)}
      height={height}
      className={className}
      style={{
        objectFit: 'contain',
        mixBlendMode: blend ? 'multiply' : undefined,
      }}
      priority
    />
  );
}
