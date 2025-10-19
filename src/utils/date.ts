const DEFAULT_LOCALE = 'en-US';

/**
 * Formats a date using Intl.DateTimeFormat with project-friendly defaults.
 */
export function formatDate(
  value: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
  locale: string = DEFAULT_LOCALE
): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Produces a human readable relative time string (e.g. "3 minutes ago").
 */
export function timeAgo(value: Date | string | number, locale: string = DEFAULT_LOCALE): string {
  const date = value instanceof Date ? value : new Date(value);
  const diffInMs = date.getTime() - Date.now();

  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const divisions: [Intl.RelativeTimeFormatUnit, number][] = [
    ['years', 1000 * 60 * 60 * 24 * 365],
    ['months', 1000 * 60 * 60 * 24 * 30],
    ['weeks', 1000 * 60 * 60 * 24 * 7],
    ['days', 1000 * 60 * 60 * 24],
    ['hours', 1000 * 60 * 60],
    ['minutes', 1000 * 60],
    ['seconds', 1000],
  ];

  for (const [unit, milliseconds] of divisions) {
    if (Math.abs(diffInMs) >= milliseconds || unit === 'seconds') {
      const valueRounded = Math.round(diffInMs / milliseconds);
      return formatter.format(valueRounded, unit);
    }
  }

  return formatter.format(0, 'seconds');
}

/**
 * Simple date formatting function compatible with date-fns format patterns.
 */
export function fDate(date: Date | string | number | null, pattern?: string): string {
  if (!date) return '';

  const dateObj = date instanceof Date ? date : new Date(date);

  if (!pattern) {
    return dateObj.toLocaleDateString();
  }

  // Simple pattern mapping for common date-fns patterns
  const formatMap: Record<string, Intl.DateTimeFormatOptions> = {
    dd: { day: '2-digit' },
    'dd MMM': { day: '2-digit', month: 'short' },
    'dd MMM yy': { day: '2-digit', month: 'short', year: '2-digit' },
    'dd MMM yyyy': { day: '2-digit', month: 'short', year: 'numeric' },
    'MMM dd, yyyy': { month: 'short', day: '2-digit', year: 'numeric' },
    'yyyy-MM-dd': { year: 'numeric', month: '2-digit', day: '2-digit' },
  };

  const options = formatMap[pattern];
  if (options) {
    return dateObj.toLocaleDateString('en-US', options);
  }

  // Fallback to default format
  return dateObj.toLocaleDateString();
}

/**
 * Format date and time.
 */
export function fDateTime(date: Date | string | number | null, pattern?: string): string {
  if (!date) return '';

  const dateObj = date instanceof Date ? date : new Date(date);

  if (!pattern) {
    return dateObj.toLocaleString();
  }

  // For datetime patterns, use both date and time
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
