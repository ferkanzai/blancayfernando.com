"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import { BlurredImage } from "./blurred-image";

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
            <BlurredImage
              url={`/carousel/${imageIndex < 10 ? "0" : ""}${imageIndex}.webp`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
