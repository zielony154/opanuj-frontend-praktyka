export type Result = 
  | { type: 'success'; value: number }
  | { type: 'error'; message: string }; 