import { useState, useEffect } from 'react';

interface SearchBarProps {
  className?: string;
  filterType?: 'name' | 'currency' | 'region';
  onSearch?: (value: string) => void;
}

const SearchBar = ({ className = '', filterType = 'name', onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (filterType === 'currency' && debouncedValue.length < 3) {
      return;
    }
    onSearch?.(debouncedValue);
  }, [debouncedValue, filterType, onSearch]);

  const getPlaceholder = () => {
    switch (filterType) {
      case 'currency':
        return "Search by country's currency...";
      case 'region':
        return "Search by country's region...";
      default:
        return "Search by country's name...";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={getPlaceholder()}
        value={searchTerm}
        onChange={handleChange}
        className="w-full px-4 py-3 pl-12 rounded-md shadow-sm
                   bg-white dark:bg-neutral-800
                   border border-neutral-200 dark:border-neutral-700
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   text-neutral-900 dark:text-neutral-100"
      />
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
