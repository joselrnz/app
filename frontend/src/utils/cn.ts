import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 * 
 * @param inputs - Class values to merge
 * @returns Merged class string
 * 
 * @example
 * ```ts
 * cn('px-2 py-1', 'px-4') // Returns 'py-1 px-4'
 * cn('text-red-500', condition && 'text-blue-500') // Conditional classes
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Conditionally apply a class name
 * 
 * @param condition - Boolean condition
 * @param className - Class name to apply if condition is true
 * @param fallback - Optional fallback class name if condition is false
 * @returns Class name or empty string
 * 
 * @example
 * ```ts
 * conditionalClass(isActive, 'bg-blue-500', 'bg-gray-500')
 * ```
 */
export function conditionalClass(
  condition: boolean,
  className: string,
  fallback: string = ''
): string {
  return condition ? className : fallback
}

/**
 * Apply variant-based class names
 * 
 * @param variant - Current variant
 * @param variants - Map of variant names to class names
 * @param defaultVariant - Default variant to use if current variant not found
 * @returns Class name for the variant
 * 
 * @example
 * ```ts
 * variantClass('primary', {
 *   primary: 'bg-blue-500',
 *   secondary: 'bg-gray-500'
 * })
 * ```
 */
export function variantClass<T extends string>(
  variant: T,
  variants: Record<T, string>,
  defaultVariant?: T
): string {
  return variants[variant] || (defaultVariant ? variants[defaultVariant] : '')
}

