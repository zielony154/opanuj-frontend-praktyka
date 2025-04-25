interface SearchTitleProps {
  name?: string;
}

function SearchTitle({ name = 'Rick and Morty' }: SearchTitleProps) {
  return <h1 className="text-2xl">Wyszukiwarka postaci {name}</h1>;
}

export default SearchTitle;