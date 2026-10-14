import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editAbout.css";
import { useState } from "react";
import AutoComplete3 from "./AutoComplete3";
import LocationDisplayEdit from "./LocationDisplayEdit";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  value: string[];
  updateLocationData: (location: any, locationHierarchy: any) => void;
}

const EditCompanyLocation: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateLocationData,
}) => {

  const val = value || [];
  const [hierarchy, setHierarchy] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const save = () => {
    if (hierarchy === "") {
      setShow(true);
      return;
    }

    let obj: Record<string, string>;
    try {
      obj = JSON.parse(hierarchy! || `{"":""}`);
    } catch {
      obj = {};
    }

    const valuesArray: string[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        valuesArray.push(obj[key]);
      }
    }

    interface LocationAttribute {
      attribute: string;
      hierarchy_level: number;
      value: string;
    }

    // Define the type for the address object keys
    type AddressKeys =
      | "country"
      | "state"
      | "county"
      | "city"
      | "suburb"
      | "neighbourhood"
      | "quarter"
      | "city_district"
      | "road"
      | "residential"
      | "hamlet"
      | "village"
      | "municipality"
      | "house_number"
      | "city_block"
      | "amenity"
      | "tourism"
      | "postcode"
      | "ISO3166_2_lvl4"
      | "country_code";

    // Define the hierarchy map with AddressKeys to ensure key safety
    const hierarchyMap: Partial<Record<AddressKeys, number>> = {
      country: 1,
      state: 2,
      county: 3,
      city: 4,
      suburb: 5,
      neighbourhood: 6,
      quarter: 7,
      city_district: 8,
      road: 9,
      residential: 10,
      hamlet: 11,
      village: 12,
      municipality: 13,
      house_number: 14,
      city_block: 15,
      amenity: 16,
      tourism: 17,
      postcode: 18,
      ISO3166_2_lvl4: 19,
      country_code: 20,
    };

    // Parse obj and filter only valid AddressKeys
    const address: Partial<Record<AddressKeys, string>> = {};
    Object.keys(obj).forEach((key) => {
      if (hierarchyMap.hasOwnProperty(key as AddressKeys)) {
        address[key as AddressKeys] = obj[key];
      }
    });

    // Initialize an array to hold the location hierarchy objects
    const locationHierarchy: LocationAttribute[] = [];

    // Iterate over the address object entries and push to locationHierarchy if the key exists in the hierarchy map
    Object.entries(address).forEach(([key, value]) => {
      const typedKey = key as AddressKeys; // Assert the key type for safety
      if (value && hierarchyMap[typedKey] !== undefined) {
        locationHierarchy.push({
          attribute: typedKey,
          hierarchy_level: hierarchyMap[typedKey]!,
          value: value,
        });
      }
    });
    updateLocationData(valuesArray, locationHierarchy);
    onCancel();
  };

  // the hirechy show there must be json.pare then converted to that array

  return (
    <EditSection sectionName={"location"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        <LocationDisplayEdit hierarchy={hierarchy} val={val} />
        {show ? <span>this field is required</span> : null}
        <AutoComplete3 hierarchy={hierarchy} setHierarchy={setHierarchy} />
      </div>
    </EditSection>
  );
};

export default EditCompanyLocation;
