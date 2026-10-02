// Logo đối tác có thể ở bất kỳ domain nào → dùng <img> thường thay vì next/image.
export default function PartnerLogo({ src, alt }: { src: string; alt: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="max-h-12 w-auto" loading="lazy" />;
}
