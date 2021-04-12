export function truncate(
  string: String = '',
  start: number = 6,
  end: number = 4
) {
  if (start < 1 || end < 1) {
    return string;
  }

  if (string.length <= start + end) {
    return string;
  }

  return string.slice(0, start) + '...' + string.slice(-end);
}
