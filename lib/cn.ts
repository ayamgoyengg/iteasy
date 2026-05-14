import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines classnames with tailwind merge for proper class resolution
 * @param inputs - Class values to combine
 * @returns Combined and merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
