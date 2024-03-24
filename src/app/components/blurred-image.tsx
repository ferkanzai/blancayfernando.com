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
      className="rounded-xl object-contain"
      placeholder="blur"
      blurDataURL={blurredUrl}
    />
  );
}
