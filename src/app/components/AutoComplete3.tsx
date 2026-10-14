import { useState, useEffect, useRef } from "react";
import "./AutoComplete.css"; // Assuming the styles are moved to a CSS file

interface TemplateProps {
  hierarchy?: string;
  setHierarchy: React.Dispatch<React.SetStateAction<string>>;
}

const AutoComplete3: React.FC<TemplateProps> = ({ setHierarchy }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [activeItem, setActiveItem] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle input changes and fetch data from API
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Fetch location suggestions from OpenStreetMap
    if (value.length >= 3) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
        );
        const data = await response.json();
        setLocationSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setLocationSuggestions([]);
    }
  };

  // Handle suggestion click and fetch hierarchy
  const handleLocationClick = async (place: any) => {
    setInputValue(place.display_name);
    setLocationSuggestions([]);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${place.lat}&lon=${place.lon}`
      );
      const data = await response.json();
      setHierarchy(JSON.stringify(data.address, null, 2));
    } catch (error) {
      console.error("Error fetching hierarchy:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 40) {
      // Down arrow
      setActiveItem((prev) =>
        Math.min(prev + 1, locationSuggestions.length - 1)
      );
    } else if (e.keyCode === 38) {
      // Up arrow
      setActiveItem((prev) => Math.max(prev - 1, 0));
    } else if (e.keyCode === 13) {
      // Enter key
      e.preventDefault();
      if (activeItem >= 0) {
        handleLocationClick(locationSuggestions[activeItem]);
      }
    }
  };

  useEffect(() => {
    const closeList = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setLocationSuggestions([]);
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
            name="location"
            placeholder="Search location..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {locationSuggestions.length > 0 && (
            <div className="autocomplete-items">
              {locationSuggestions.map((place, index) => (
                <div
                  key={index}
                  className={`autocomplete-item ${
                    index === activeItem ? "autocomplete-active" : ""
                  }`}
                  onClick={() => handleLocationClick(place)}
                >
                  {place.display_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
      {/*       {hierarchy && <pre>{hierarchy}</pre>}
       */}{" "}
    </div>
  );
};

export default AutoComplete3;
