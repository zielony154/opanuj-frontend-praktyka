type OperationButtonProps = {
  symbol: string;
  onClick: () => void;
};

export const OperationButton = ({ symbol, onClick }: OperationButtonProps) => (
  <button
    className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
    onClick={onClick}
  >
    {symbol}
  </button>
); 