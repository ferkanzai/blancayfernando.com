"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { dynamicBlurDataUrl } from "@/app/lib/dynamicBlur";

export function BlurredImage({
  alt = "logo",
  className,
  height = 200,
  url,
  width = 200,
}: {
  alt?: string;
  className?: string;
  height?: number;
  url: string;
  width?: number;
}) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    void dynamicBlurDataUrl(url).then(setImage);
  }, [url]);

  return image ? (
    <Image
      alt={alt}
      blurDataURL={image}
      className={
        className ??
        "cursor-all-scroll rounded-xl object-contain grayscale filter transition-all duration-300 ease-in-out hover:scale-105 hover:grayscale-0"
      }
      height={height}
      placeholder="blur"
      src={url}
      width={width}
    />
  ) : null;
}
