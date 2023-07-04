export function getFormattedPrice(price?: number) {
  return price?.toLocaleString('pt-MZ', {
    style: 'currency',
    currency: 'MZN',
  });
}
