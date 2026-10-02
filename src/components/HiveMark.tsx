type HiveMarkProps = {
  size?: number;
};

export function HiveMark({ size = 32 }: HiveMarkProps) {
  const radius = Math.round(size * 0.223);

  return (
    <span className="mark" style={{ width: size, height: size, borderRadius: radius }}>
      <svg className="mark-light" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#FFFFFF" d="M12 2.2 20.2 7v10L12 21.8 3.8 17V7L12 2.2Z" />
      </svg>
      <img className="mark-dark" src="/icon.png" alt="" width={size} height={size} />
    </span>
  );
}
