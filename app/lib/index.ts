// lib/index.ts

import { calculateStretchedCanvasPrice, calculateFramedCanvasPrice, calculateFramedPrintPrice } from './config/calculatePrice';

const calculatePrice = (
  product: string,
  subProduct: string,
  width: number,
  height: number
): number => {
  const area = width * height;

  switch (product) {
    case "Canvas":
      return calculateStretchedCanvasPrice(subProduct, area);
    case "Framed canvas":
      return calculateFramedCanvasPrice(subProduct, area);
    case "Framed print":
      return calculateFramedPrintPrice(subProduct, area);
    default:
      throw new Error(`Unknown product type: ${product}`);
  }
};

export default calculatePrice;
