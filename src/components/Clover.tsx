// Cỏ 4 lá tạo bởi 4 trái tim — biểu tượng thương hiệu, dùng làm hoạ tiết nền.
const HEART = "M12 21s-7.2-4.6-9.7-9.3A5.6 5.6 0 0 1 12 5.9a5.6 5.6 0 0 1 9.7 5.8C19.200 16.400 12 21 12 21z";

export default function Clover({
  className = "",
  stroke = false,
  strokeWidth = 1.2,
}: {
  className?: string;
  stroke?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden fill={stroke ? "none" : "currentColor"} stroke={stroke ? "currentColor" : "none"} strokeWidth={strokeWidth}>
      {[0, 90, 180, 270].map((r) => (
        <path key={r} d={HEART} transform={`translate(50 50) rotate(${r}) translate(0 -6) scale(1.45) translate(-12 -21)`} />
      ))}
    </svg>
  );
}
