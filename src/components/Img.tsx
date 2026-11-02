"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

const CLOUDINARY = /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//;

/** Cloudinary resizes and compresses its own images (free plan): insert a transformation after "/upload/". */
function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  return src.replace("/upload/", `/upload/f_auto,q_${quality ?? "auto"},c_limit,w_${width}/`);
}

/**
 * Drop-in replacement for next/image.
 * Cloudinary URLs are resized by Cloudinary; everything else uses Next's built-in optimizer.
 */
export default function Img(props: ImageProps) {
  const cld = typeof props.src === "string" && CLOUDINARY.test(props.src);
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through in props
  return <Image {...props} loader={cld ? cloudinaryLoader : undefined} />;
}
