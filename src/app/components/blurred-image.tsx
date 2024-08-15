"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { dynamicBlurDataUrl } from "@/app/lib/dynamicBlur";

export function BlurredImage({
  url,
  alt = "logo",
  className,
  height = 200,
  width = 200,
}: {
  url: string;
  alt?: string;
  className?: string;
  height?: number;
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
