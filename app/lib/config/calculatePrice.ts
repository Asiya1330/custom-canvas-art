// lib/calculatePrice.ts

import { markupValues, targetMargin } from "@/app/utils/constants";


const calculateStretchedCanvasPrice = (subProduct: string, area: number): number => {
  switch (subProduct) {
    case "0.75in Stretched Canvas":
      return (0.0351 * area + 10.2) * (1 + targetMargin) + markupValues["075CanvasMarkup"];
    case "1.25in Stretched Canvas":
      return (0.0365 * area + 10.8) * (1 + targetMargin) + markupValues["125CanvasMarkup"];
    case "1.50in Stretched Canvas":
      return (0.0428 * area + 12.7) * (1 + targetMargin) + markupValues["150CanvasMarkup"];
    default:
      throw new Error(`Unknown subProduct: ${subProduct}`);
  }
};

const calculateFramedCanvasPrice = (subProduct: string, area: number): number => {
  switch (subProduct) {
    case "0.75in framed canvas":
      return (4.54 * Math.pow(area, 0.423)) * (1 + targetMargin) + markupValues["075CanvasMarkup"];
    case "1.25in framed canvas":
      return (0.0628 * area + 26) * (1 + targetMargin) + markupValues["125CanvasMarkup"];
    case "1.50in framed canvas":
      return (0.0815 * area + 32.8) * (1 + targetMargin) + markupValues["150CanvasMarkup"];
    default:
      throw new Error(`Unknown subProduct: ${subProduct}`);
  }
};

const calculateFramedPrintPrice = (subProduct: string, area: number): number => {
  switch (subProduct) {
    case "No mat":
      return (0.0518 * area + 16.4) * (1 + targetMargin) + markupValues["framedPrintMarkup"];
    case "1\" mat":
      return (0.0629 * area + 21) * (1 + targetMargin) + markupValues["framedPrintMarkup"];
    case "1.5\" mat":
      return (0.0649 * area + 22.6) * (1 + targetMargin) + markupValues["framedPrintMarkup"];
    case "2\" mat":
      return (0.067 * area + 24.4) * (1 + targetMargin) + markupValues["framedPrintMarkup"];
    case "2.5\" mat":
      return (0.069 * area + 26.3) * (1 + targetMargin) + markupValues["framedPrintMarkup"];
    case "3\" mat":
      return (0.071 * area + 28.3) * (1 + targetMargin) + markupValues["framedPrintMarkup"];
    case "3.5\" mat":
      return (0.0727 * area + 30.5) * (1 + targetMargin) + markupValues["framedPrintMarkup"];
    case "4\" mat":
      return (0.0768 * area + 31.9) * (1 + targetMargin) + markupValues["framedPrintMarkup"];
    case "4.5\" mat":
      return (0.0788 * area + 34.2) * (1 + targetMargin) + markupValues["framedPrintMarkup"];
    case "5\" mat":
      return (0.0828 * area + 35.9) * (1 + targetMargin) + markupValues["framedPrintMarkup"];
    default:
      throw new Error(`Unknown subProduct: ${subProduct}`);
  }
};

export { calculateStretchedCanvasPrice, calculateFramedCanvasPrice, calculateFramedPrintPrice };
