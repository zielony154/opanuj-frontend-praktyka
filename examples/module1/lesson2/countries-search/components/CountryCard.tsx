// src/components/CountryCard.tsx
interface CountryCardProps {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

const CountryCard = ({ name, population, region, capital, flag }: CountryCardProps) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden
                   hover:shadow-lg transition-shadow duration-300">
      <img
        src={flag}
        alt={`${name} flag`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">{name}</h2>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Population:</span>{' '}
            {population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {region}
          </p>
          <p>
            <span className="font-semibold">Capital:</span> {capital}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;