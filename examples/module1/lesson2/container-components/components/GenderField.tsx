type GenderFieldProps = {
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
};

function GenderField({ gender, setGender }: GenderFieldProps) {
  return (
    <label className="flex flex-col">
      Gender
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="border h-7 mt-1"
      >
        <option value="">Any Gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
    </label>
  );
}

export default GenderField; 