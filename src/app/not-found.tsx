import Link from "next/link";
import Clover from "@/components/Clover";
import { btn, cx } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grain relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-forest-deep px-5 text-center text-white">
      <Clover className="absolute size-[70vw] max-w-[700px] animate-spin-slow text-white/[0.06]" />
      <div className="relative">
        <p className="text-[clamp(6rem,22vw,14rem)] font-black leading-none text-gradient">404</p>
        <p className="mt-2 text-xl font-bold">Chiếc lá này đã lạc đường rồi.</p>
        <Link href="/" className={cx(btn.base, btn.sun, "mt-8")}>Về trang chủ</Link>
      </div>
    </section>
  );
}
