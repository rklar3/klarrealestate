"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGES = [
  { src: "/images/hero-images/hero-1.webp", alt: "Modern home exterior at dusk" },
  { src: "/images/hero-images/hero-2.webp", alt: "Contemporary home with pool at dusk" },
  { src: "/images/hero-images/hero-3.webp", alt: "Modern home terrace at dusk" },
];

const INTERVAL_MS = 6500;

export function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % IMAGES.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      {IMAGES.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={index === activeIndex ? image.alt : ""}
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover opacity-70 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === activeIndex ? 0.7 : 0 }}
        />
      ))}
    </>
  );
}
