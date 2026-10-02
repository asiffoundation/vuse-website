import { Briefcase, GraduationCap, HandHeart, Heart, HeartPulse, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = { Briefcase, GraduationCap, HandHeart, Heart, HeartPulse };

export default function Icon({ name, className }: { name: string; className?: string }) {
  const C = map[name] ?? Heart;
  return <C className={className} aria-hidden />;
}

// lucide-react không còn icon thương hiệu → vẽ Facebook bằng SVG.
export function Facebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.3-1.6 1.7-1.6h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.9V22h3.3z" />
    </svg>
  );
}
