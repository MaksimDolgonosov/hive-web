type HiveMarkProps = {
  size?: number;
};

export function HiveMark({ size = 32 }: HiveMarkProps) {
  const radius = Math.round(size * 0.28);

  return (
    <span className="mark" style={{ width: size, height: size, borderRadius: radius }}>
      <svg className="mark-hex" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    </span>
  );
}
