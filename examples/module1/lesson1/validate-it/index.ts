interface ValidationRule<T> {
  validate(value: T): boolean;
  errorMessage: string;
}

class Validator<T> {
  constructor(private rules: ValidationRule<T>[]) {}

  validate(value: T): { valid: boolean; error: string | null } {
    const failed = this.rules.find(rule => !rule.validate(value));
    return failed
      ? { valid: false, error: failed.errorMessage }
      : { valid: true,  error: null };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const input          = document.getElementById('input')           as HTMLInputElement;
  const validateButton = document.getElementById('validation-btn')  as HTMLButtonElement;
  const clearButton    = document.getElementById('cleanup-btn')     as HTMLButtonElement;
  const result         = document.getElementById('result')          as HTMLElement;

  const stringValidator = new Validator<string>([
    { validate: raw => raw.trim() !== '',    errorMessage: 'Invalid - empty or non integer' },
    { validate: raw => !isNaN(Number(raw)),  errorMessage: 'Invalid - empty or non integer' },
  ]);

  const numberValidator = new Validator<number>([
    { validate: Number.isInteger,            errorMessage: 'Invalid - empty or non integer' },
    { validate: v => v >= 0 && v <= 100,     errorMessage: 'Invalid number' },
    { validate: v => v % 2 === 0,            errorMessage: 'Invalid number' },
  ]);

  validateButton.addEventListener('click', () => {
    const rawValue = input.value;
    const { valid: isValidString, error: stringError } = stringValidator.validate(rawValue);
    if (!isValidString) {
      result.textContent = stringError;
      result.style.color = 'red';
      return;
    }

    const numberValue = Number(rawValue);
    const { valid: isValidNumber, error: numberError } = numberValidator.validate(numberValue);
    if (!isValidNumber) {
      result.textContent = numberError;
      result.style.color = 'red';
      return;
    }

    result.textContent = 'Valid';
    result.style.color = 'green';    
  });

  clearButton.addEventListener('click', () => {
    input.value   = '';
    result.textContent = '';
  });
});