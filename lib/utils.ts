export function cn(...classes: unknown[]) {
  return classes.filter((className) => typeof className === "string").join(" ");
}
