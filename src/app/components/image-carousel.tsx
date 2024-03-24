"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { BlurredImage } from "@/app/components/blurred-image";
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
        dragFree: true,
        containScroll: "trimSnaps",
      }}
    >
      <CarouselContent className="min-h-[180px]">
        {images.map((imageIndex) => (
          <CarouselItem
            key={imageIndex}
            className="grid basis-1/2 place-content-center sm:basis-1/3 md:basis-1/4 lg:basis-[13%] xl:basis-[10%]"
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
