/**
 * ============================================================================
 * ⏱️ TIME UTILITY FUNCTIONS
 * ============================================================================
 */

/**
 * Format milliseconds to MM:SS format
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format milliseconds to HH:MM:SS format
 */
export function formatTimeWithHours(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Check if time is running out (less than 5 minutes)
 */
export function isTimeRunningOut(ms: number): boolean {
  return ms < 5 * 60 * 1000; // 5 minutes
}

/**
 * Check if time is critical (less than 1 minute)
 */
export function isTimeCritical(ms: number): boolean {
  return ms < 60 * 1000; // 1 minute
}
