/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { env } from "@/env";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const render = (status: Status) => {
  if (status === Status.LOADING) {
    return <h1>Loading...</h1>;
  }
  return <h1>{status}</h1>;
};

export function MapWrapper() {
  return (
    <div className="h-80 w-full sm:w-3/5">
      <Wrapper apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API} render={render}>
        <Map>
          <Marker
            position={{ lat: 40.40548, lng: -3.68363 }}
            title="Real Basílica Nuestra Señora de Atocha"
            label="1"
          />
          <Marker
            position={{ lat: 40.40535, lng: -3.6829 }}
            title="Fábrica de Tapices"
            label="2"
          />
        </Map>
      </Wrapper>
    </div>
  );
}

export function Map({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          zoom: 17,
          center: { lat: 40.4055, lng: -3.6835 },
          fullscreenControl: false,
          scaleControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          disableDefaultUI: true,
          zoomControl: false,
          disableDoubleClickZoom: true,
          draggable: false,
          clickableIcons: false,
        }),
      );
    }
  }, [ref, map]);

  return (
    <>
      <div ref={ref} id="map" className="flex h-full" />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // @ts-expect-error map prop is required
          return cloneElement(child, { map });
        }
      })}
    </>
  );
}

const Marker = (options: google.maps.MarkerOptions) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};
