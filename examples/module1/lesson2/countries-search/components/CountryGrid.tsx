import { useState, useEffect } from 'react';
import CountryCard from './CountryCard';

interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string[];
  flags: {
    png: string;
  };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  id?: string;
}

interface CountryGridProps {
  filterType?: 'name' | 'currency' | 'region';
  searchTerm?: string;
}

const ITEMS_PER_PAGE = 12;

const CountryGrid = ({ filterType = 'name', searchTerm = '' }: CountryGridProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        let url = 'https://restcountries.com/v3.1/all';
        
        if (filterType === 'name' && searchTerm) {
          url = `https://restcountries.com/v3.1/name/${searchTerm}`;
        } else if (filterType === 'currency' && searchTerm) {
          if (searchTerm.length < 3) {
            setCountries([]);
            setLoading(false);
            return;
          }
          url = `https://restcountries.com/v3.1/currency/${searchTerm}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('No countries found');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError('No countries found');
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [filterType, searchTerm]);

  const totalPages = Math.ceil(countries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCountries = countries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-neutral-600 dark:text-neutral-400">
          {filterType === 'currency' && searchTerm.length < 3
            ? 'Please enter at least 3 characters for currency code'
            : 'No countries found'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedCountries.map((country) => (
          <CountryCard
            key={country.id || country.name.common}
            name={country.name.common}
            population={country.population}
            region={country.region}
            capital={country.capital?.[0] || 'N/A'}
            flag={country.flags.png}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-neutral-600 dark:text-neutral-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CountryGrid;
