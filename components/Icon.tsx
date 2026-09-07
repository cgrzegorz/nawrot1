type Name =
  | "crane"
  | "truck"
  | "excavator"
  | "compass"
  | "phone"
  | "mail"
  | "pin"
  | "doc"
  | "check"
  | "arrow"
  | "close"
  | "prev"
  | "next"
  | "menu";

const paths: Record<Name, React.ReactNode> = {
  crane: (
    <>
      <path d="M3 21h18" />
      <path d="M7 21V6" />
      <path d="M7 6 21 6" />
      <path d="M7 6 3 10" />
      <path d="M17 6v5" />
      <path d="M14.5 11h5l-1 4h-3z" />
      <path d="M7 6 12 2" />
    </>
  ),
  truck: (
    <>
      <path d="M2 8h11v9H2z" />
      <path d="M13 11h4l4 3v3h-8z" />
      <circle cx="7" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
    </>
  ),
  excavator: (
    <>
      <path d="M2 20h20" />
      <path d="M4 20v-4h9v4" />
      <path d="M9 16V9h4" />
      <path d="M13 9 19 4" />
      <path d="M19 4v7l-4 2" />
      <path d="M15 13h6v4h-6z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  phone: (
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  check: <path d="m4 12.5 5 5L20 6.5" />,
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  prev: <path d="m15 5-7 7 7 7" />,
  next: <path d="m9 5 7 7-7 7" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};

export default function Icon({
  name,
  size = 24,
  strokeWidth = 1.7,
  className,
}: {
  name: Name;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
