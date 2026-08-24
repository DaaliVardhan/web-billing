export const fallbackToZero = (x?: number): number => {
  if (!x) return 0;
  return x;
};