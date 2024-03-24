"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";

export function ImageCarousel() {
  const images = Array.from({ length: 19 }, (_, i) => i + 1).sort(
    () => Math.random() - 0.5,
  );

  return (
    <Carousel
      className="w-full"
      plugins={[
        AutoScroll({
          playOnInit: true,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          speed: 1,
        }),
        WheelGesturesPlugin({
          forceWheelAxis: "x",
        }),
      ]}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((imageIndex) => (
          <CarouselItem
            key={imageIndex}
            className="grid basis-1/2 place-content-center md:basis-1/3 lg:basis-1/5"
          >
            <Image
              src={`/carousel/${imageIndex < 10 ? "0" : ""}${imageIndex}.webp`}
              width={800}
              height={800}
              alt="logo"
              className="rounded-xl object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
