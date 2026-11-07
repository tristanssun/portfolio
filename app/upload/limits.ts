// Vercel's free plan locks Blob storage for 30 days past 1 GB, so stop uploads short of that.
export const MAX_TOTAL_BYTES = 900 * 1024 * 1024;

export function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
