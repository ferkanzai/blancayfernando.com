"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { dynamicBlurDataUrl } from "@/app/lib/dynamicBlur";

export function BlurredImage({ url }: { url: string }) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    void dynamicBlurDataUrl(url).then(setImage);
  }, [url]);

  return image ? (
    <Image
      src={url}
      width={200}
      height={200}
      alt="logo"
      className="cursor-all-scroll rounded-xl object-contain grayscale filter transition-all duration-300 ease-in-out hover:scale-105 hover:grayscale-0"
      placeholder="blur"
      blurDataURL={image}
    />
  ) : null;
}
