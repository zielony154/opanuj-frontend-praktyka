type NameFieldProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

function NameField({ name, setName }: NameFieldProps) {
  return (
    <label className="flex flex-col">
      Name
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border h-7 mt-1"
      />
    </label>
  );
}

export default NameField; 