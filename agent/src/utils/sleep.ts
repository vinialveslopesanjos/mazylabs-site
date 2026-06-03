export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function jitter(min: number, max: number) {
  if (max <= min) return min;
  return Math.floor(min + Math.random() * (max - min));
}
