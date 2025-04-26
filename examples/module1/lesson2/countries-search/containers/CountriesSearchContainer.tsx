import { useState } from 'react';
import CountryGrid from "../components/CountryGrid";
import RegionSelect from "../components/Filters/RegionSelect";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const CountriesSearchContainer = () => {
  const [selectedFilter, setSelectedFilter] = useState<'name' | 'currency' | 'region'>('name');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-[1440px]">
        {/* Pasek wyszukiwania + filtr regionu */}
        <section className="flex flex-col gap-4 md:flex-row md:items-center">
          <SearchBar 
            className="flex-1" 
            filterType={selectedFilter} 
            onSearch={handleSearch}
          />
          <RegionSelect className="w-full md:w-56" />
        </section>

        {/* Filtry i sortowanie */}
        <div className="mt-4 flex gap-4">
          <div>
            <label htmlFor="filter">Filter By:</label>
            <select 
              id="filter" 
              className="ml-2 p-2 rounded"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as 'name' | 'currency' | 'region')}
            >
              <option value="name">Name</option>
              <option value="region">Region</option>
              <option value="currency">Currency</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort">Sort By:</label>
            <select id="sort" className="ml-2 p-2 rounded">
              <option value="alphabetical">Alphabetical</option>
              <option value="population">Population</option>
            </select>
          </div>
        </div>

        {/* Grid z kartami państw */}
        <div className="mt-8">
          <CountryGrid 
            filterType={selectedFilter}
            searchTerm={searchTerm}
          />
        </div>
      </main>
    </div>
  );
};

export default CountriesSearchContainer;
