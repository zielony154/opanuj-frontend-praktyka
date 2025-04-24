import { useState } from 'react';
import { sum, subtract, multiply, divide } from './functions';
import type { Result } from './types';
import { NumberInput } from './components/NumberInput';
import { OperationButton } from './components/OperationButton';

const ResultDisplay = ({ result }: { result: Result }) => {
  return (
    <div>
      {result.type === 'success' ? `Result: ${result.value}` : result.message}
    </div>
  );
};

const App = () => {
  const [lhsOperand, setLhsOperand] = useState<number>(0);
  const [rhsOperand, setRhsOperand] = useState<number>(0);
  const [result, setResult] = useState<Result>({ type: 'success', value: 0 });

  const calculateResult = (func: (a: number, b: number) => Result) => {
    setResult(func(lhsOperand, rhsOperand));
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <NumberInput value={lhsOperand} onChange={setLhsOperand} />
        <NumberInput value={rhsOperand} onChange={setRhsOperand} />
      </div>
      <div className="grid grid-cols-4 gap-x-4 my-4">
        <OperationButton symbol="+" onClick={() => calculateResult(sum)} />
        <OperationButton symbol="-" onClick={() => calculateResult(subtract)} />
        <OperationButton symbol="*" onClick={() => calculateResult(multiply)} />
        <OperationButton symbol="/" onClick={() => calculateResult(divide)} />
      </div>
      <ResultDisplay result={result} />
    </div>
  );
};

export default App;
