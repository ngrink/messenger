import {  intervalToDuration } from 'date-fns'

/**
 * Format seconds as human-readable text
 */
export const formatDuration = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000})
  const formatted = [
    duration.hours,
    duration.minutes || 0,
    duration.seconds || 0,
  ]
    .filter(x => x !== undefined)
    .map(x => String(x).padStart(2, "0"))
    .join(":")

  return formatted
}