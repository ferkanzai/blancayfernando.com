import Image from "next/image";

import { dynamicBlurDataUrl } from "@/app/lib/dynamicBlur";

export async function BlurredImage({ url }: { url: string }) {
  const blurredUrl = await dynamicBlurDataUrl(url);

  return (
    <Image
      src={url}
      width={300}
      height={300}
      alt="logo"
      className="rounded-xl object-contain grayscale filter transition-all duration-300 ease-in-out hover:scale-105 hover:grayscale-0"
      placeholder="blur"
      blurDataURL={blurredUrl}
    />
  );
}
