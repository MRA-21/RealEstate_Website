import {
  Sun,
  ChefHat,
  ShieldCheck,
  Wifi,
  Waves,
  MapPin,
  BedDouble,
  Bath,
  Users,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Sun,
  ChefHat,
  ShieldCheck,
  Wifi,
  Waves,
  MapPin,
  BedDouble,
  Bath,
  Users,
};

export function AmenityIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Sun;
  return <Icon className={className} />;
}
