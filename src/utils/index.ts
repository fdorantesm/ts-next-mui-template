export * from './array';
export * from './object';
export * from './date';
export * from './string';
export * from './highlight';
export * from './env';
export * from './flatten-array';

// Format number utilities
export function fData(inputValue: number | string): string {
  const number = typeof inputValue === 'string' ? parseFloat(inputValue) : inputValue;

  if (number === 0) return '0 Bytes';
  if (!number || isNaN(number)) return '--';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(number) / Math.log(k));

  return `${(number / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

export function formatCurrency(number: number): string {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return format.format(number);
}

export function formatPercentage(number: number): string {
  const format = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });

  return format.format(number / 100);
}

export function fShortenNumber(number: number): string {
  const format = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  });

  return format.format(number);
}

export function formatNumber(number: number): string {
  const format = new Intl.NumberFormat('en-US');
  return format.format(number);
}
