
export const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

export interface Size {
    size: string;
    price: string;
}

export const targetMargin = 0.80;

export const markupValues = {
  "075CanvasMarkup": 15,
  "125CanvasMarkup": 25,
  "150CanvasMarkup": 35,
  "framedPrintMarkup": 25,
};


export const sizes: Size[] = [
    { size: '8x10', price: '$8.99' },
    { size: '8x12', price: '$13.99' },
    { size: '10x20', price: '$20.66' },
    { size: '10x30', price: '$24.00' },
    { size: '11x14', price: '$10.99' },
    { size: '12x12', price: '$16.64' },
    { size: '12x16', price: '$18.58' },
    { size: '12x18', price: '$19.25' },
    { size: '16x20', price: '$22.14' },
    { size: '16x24', price: '$24.82' },
    { size: '18x24', price: '$25.69' },
    { size: '20x20', price: '$24.96' },
    { size: '20x40', price: '$35.42' },
    { size: '24x30', price: '$33.34' },
    { size: '24x32', price: '$34.21' },
    { size: '24x36', price: '$35.96' },
    { size: '30x30', price: '$38.67' },
];
