import { useState, useEffect, useRef } from "react";
import "./AutoComplete.css"; // Assuming the styles are moved to a CSS file

interface TemplateProps {
  countries: string[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const AutoComplete: React.FC<TemplateProps> = ({
  countries,
  setInputValue,
  inputValue,
}) => {
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  const handleItemClick = (country: string) => {
    setInputValue(country);
    setFilteredCountries([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 40) {
      // Down arrow
      setActiveItem((prev) => Math.min(prev + 1, filteredCountries.length - 1));
    } else if (e.keyCode === 38) {
      // Up arrow
      setActiveItem((prev) => Math.max(prev - 1, 0));
    } else if (e.keyCode === 13) {
      // Enter key
      e.preventDefault();
      if (activeItem >= 0) {
        handleItemClick(filteredCountries[activeItem]);
      }
    }
  };

  useEffect(() => {
    const closeList = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setFilteredCountries([]);
      }
    };
    document.addEventListener("click", closeList);
    return () => document.removeEventListener("click", closeList);
  }, []);

  return (
    <div className="autocomplete">
      <form autoComplete="off">
        <div className="autocomplete-container" style={{ width: "300px" }}>
          <input
            ref={inputRef}
            type="text"
            name="myCountry"
            placeholder="search"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {filteredCountries.length > 0 && (
            <div className="autocomplete-items">
              {filteredCountries.map((country, index) => (
                <div
                  key={index}
                  className={`autocomplete-item ${
                    index === activeItem ? "autocomplete-active" : ""
                  }`}
                  onClick={() => handleItemClick(country)}
                >
                  <strong>{country.substr(0, inputValue.length)}</strong>
                  {country.substr(inputValue.length)}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AutoComplete;
