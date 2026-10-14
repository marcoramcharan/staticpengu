import React from "react";

// Define the LocationAttribute interface
interface LocationAttribute {
  attribute: string;
  hierarchy_level: number;
  value: string;
}

// Define the props for the LocationDisplay component
interface LocationDisplayProps {
  locationHierarchy: LocationAttribute[];
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({
  locationHierarchy,
}) => {
  // Sort by hierarchy level (lowest to highest)
  const sortedHierarchy = locationHierarchy.sort(
    (a, b) => a.hierarchy_level - b.hierarchy_level
  );

  // Get the first 5 values
  const topFive = sortedHierarchy.slice(0, 5);

  // Format the values into a string
  const formattedValues = topFive.map((item) => item.value).join(" | ");

  return (
    <div>
      <p>{formattedValues}</p>
    </div>
  );
};

export default LocationDisplay;
