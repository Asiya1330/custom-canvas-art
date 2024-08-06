
export const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

export interface Size {
    size: string;
    // price: string;
}

export const targetMargin = 0.80; //80%

export const markupValues = { //in $
  "075CanvasMarkup": 15,
  "125CanvasMarkup": 25,
  "150CanvasMarkup": 35,
  "framedPrintMarkup": 25,
};


export const sizes: Size[] = [
    { size: '8x10' },
    { size: '8x12' },
    { size: '10x20' },
    { size: '10x30' },
    { size: '11x14' },
    { size: '12x12' },
    { size: '12x16' },
    { size: '12x18' },
    { size: '16x20' },
    { size: '16x24' },
    { size: '18x24' },
    { size: '20x20' },
    { size: '20x40' },
    { size: '24x30' },
    { size: '24x32' },
    { size: '24x36' },
    { size: '30x30' },
];
