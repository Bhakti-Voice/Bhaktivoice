import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function iconProps(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function PrayerHandsIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M10 21c-.7-2.4-1.4-6.2.2-9.3.9-1.7 1.8-2.7 1.8-2.7s.9 1 1.8 2.7c1.6 3.1.9 6.9.2 9.3" />
      <path d="M12 9.2V4.8" />
      <path d="M10.2 5.6 12 4.2l1.8 1.4" />
      <path d="M8.2 12.4c-1.9.5-3.3 2.2-3.5 4.3-.2 1.6.4 3.3 1.7 4.3" />
      <path d="M15.8 12.4c1.9.5 3.3 2.2 3.5 4.3.2 1.6-.4 3.3-1.7 4.3" />
    </svg>
  );
}

export function OpenBookIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 6.5c-2.2-1.6-5-2.2-8-1.6v12.2c3-.6 5.8 0 8 1.6 2.2-1.6 5-2.2 8-1.6V4.9c-3-.6-5.8 0-8 1.6Z" />
      <path d="M12 6.5v12.2" />
    </svg>
  );
}

export function TempleIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 3 20 11H4L12 3Z" />
      <path d="M12 2v2" />
      <path d="M7 11v9h10v-9" />
      <path d="M10 20v-5h4v5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function LotusIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 20c-1.8-3.2-6.2-4.4-8.5-4.6 1.4-2.6 4.6-4 6.4-4.4C9.2 8.6 10.4 5 12 3c1.6 2 2.8 5.6 2.1 8 1.8.4 5 1.8 6.4 4.4-2.3.2-6.7 1.4-8.5 4.6Z" />
      <path d="M12 20c.4-3.2 2.6-5.4 5.2-6.6" />
      <path d="M12 20c-.4-3.2-2.6-5.4-5.2-6.6" />
    </svg>
  );
}

export function CommunityIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="9" cy="8" r="2.4" />
      <circle cx="16" cy="9" r="2.1" />
      <path d="M4.5 19c.4-3 2.4-4.8 4.6-4.8S13.3 16 13.6 19" />
      <path d="M13.2 14.6c1.6-.7 3.4-.4 4.6 1.2.7 1 .9 2.1 1 3.2" />
    </svg>
  );
}

export function FestivalCalendarIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17" />
      <path d="M8 3.5v3" />
      <path d="M16 3.5v3" />
      <path d="M12 13.2c.7-.8 2.2-.6 2.4.5.2 1.2-1.2 2-2.4 3-1.2-1-2.6-1.8-2.4-3 .2-1.1 1.7-1.3 2.4-.5Z" />
    </svg>
  );
}
