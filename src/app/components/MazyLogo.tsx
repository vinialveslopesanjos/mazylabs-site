interface MazyLogoProps {
  className?: string;
  color?: string;
}

export default function MazyLogo({ className = "w-32 h-32", color = "currentColor" }: MazyLogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 90V25H35V55L50 70L65 55V25H80V90"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <rect x="44" y="25" width="12" height="12" fill={color} />
    </svg>
  );
}
