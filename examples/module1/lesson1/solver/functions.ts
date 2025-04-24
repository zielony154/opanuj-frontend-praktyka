import type { Result } from './types';

export function sum(a: number, b: number): Result {
  return { type: 'success', value: a + b };
}

export function subtract(a: number, b: number): Result {
  return { type: 'success', value: a - b };
}

export function multiply(a: number, b: number): Result {
  return { type: 'success', value: a * b };
}

export function divide(a: number, b: number): Result {
  if (b === 0) {
    return { type: 'error', message: 'Cannot divide by zero' };
  }
  return { type: 'success', value: a / b };
}
