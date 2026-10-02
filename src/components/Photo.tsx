import Image, { type ImageProps } from "next/image";

// next/image dùng chung: tự tắt tối ưu cho SVG (ảnh tạm) để không cần dangerouslyAllowSVG.
export default function Photo({ src, alt, className = "", ...rest }: Omit<ImageProps, "src"> & { src: string }) {
  return <Image src={src} alt={alt} unoptimized={src.endsWith(".svg")} className={`object-cover ${className}`} {...rest} />;
}
