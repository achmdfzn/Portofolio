import Image from "next/image";

/**
 * Polaroid (DESIGN.md §2, §8).
 *
 *  - Bingkai foto bergaya polaroid dengan rough-border-soft.
 *  - Opsional rotasi miring untuk kesan "ditempel manual".
 *  - captionGap mengatur jarak antara gambar dan bingkai bawah:
 *    "sm" → pb-8, "md" → pb-10, "lg" → pb-14.
 *  - Digunakan di: projects/[slug]/page.tsx (screenshot).
 */

type CaptionGap = "sm" | "md" | "lg";

interface PolaroidProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Derajat rotasi, default 0 */
  rotate?: number;
  /** Jarak bawah polaroid, default "lg" */
  captionGap?: CaptionGap;
  /** Kelas tambahan untuk wrapper div */
  className?: string;
  /** next/image priority flag (untuk LCP) */
  priority?: boolean;
}

const CAPTION_GAP_CLASSES: Record<CaptionGap, string> = {
  sm: "pb-8",
  md: "pb-10",
  lg: "pb-14",
};

export function Polaroid({
  src,
  alt,
  width,
  height,
  rotate = 0,
  captionGap = "lg",
  className = "",
  priority = false,
}: PolaroidProps) {
  return (
    <div
      className={[
        "rough-border-soft border-2 border-ink bg-paper-soft p-3",
        CAPTION_GAP_CLASSES[captionGap],
        "shadow-[8px_8px_0_0_var(--color-ink)]",
        className,
      ].join(" ")}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="rough-border-soft h-auto w-full border border-ink/20 bg-paper-dark"
      />
    </div>
  );
}
