export const trim = (value?: string | null): string =>
  (value ?? '').trim();
export const upperTrim = (v: string) =>
  (typeof v === 'string' ? v.trim().toUpperCase() : v);