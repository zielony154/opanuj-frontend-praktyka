import { useState } from 'react';

interface RegionSelectProps {
  className?: string;
}

const RegionSelect = ({ className = '' }: RegionSelectProps) => {
  const [selectedRegion, setSelectedRegion] = useState('');

  const regions = [
    { value: '', label: 'All Regions' },
    { value: 'africa', label: 'Africa' },
    { value: 'americas', label: 'Americas' },
    { value: 'asia', label: 'Asia' },
    { value: 'europe', label: 'Europe' },
    { value: 'oceania', label: 'Oceania' },
  ];

  return (
    <select
      value={selectedRegion}
      onChange={(e) => setSelectedRegion(e.target.value)}
      className={`w-full px-4 py-3 rounded-md shadow-sm
                 bg-white dark:bg-neutral-800
                 border border-neutral-200 dark:border-neutral-700
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 text-neutral-900 dark:text-neutral-100
                 ${className}`}
    >
      {regions.map((region) => (
        <option key={region.value} value={region.value}>
          {region.label}
        </option>
      ))}
    </select>
  );
};

export default RegionSelect;
