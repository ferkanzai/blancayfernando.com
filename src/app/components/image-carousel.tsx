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
  return (
    <Carousel
      className="w-full md:max-w-[90%] lg:max-w-[80%]"
      plugins={[
        AutoScroll({
          playOnInit: true,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          speed: 0.5,
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
        {Array.from({ length: 16 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="grid basis-1/2 place-content-center md:basis-1/3 lg:basis-1/6"
          >
            <Image
              src={`/carousel/${index < 9 ? "0" : ""}${index + 1}.webp`}
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
