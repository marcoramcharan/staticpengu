import { IoFilter } from "react-icons/io5";
import useGetSuggestions from "../hooks/useGetSuggestions";
import "../styles/components/search.css";
import AutoComplete from "./AutoComplete";
import AutoComplete2 from "./AutoComplete2";
import { useState } from "react";
import Sidebar from "./Sidebar";

interface TemplateProps {
  location: string;
  search: string;
  count: number;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  refetchData: () => void;
  setPref: (type: string, id: string) => void;
  setShowSaved: React.Dispatch<React.SetStateAction<boolean>>; // New prop to control saved jobs visibility
}

const Search: React.FC<TemplateProps> = ({
  refetchData,
  search,
  setSearch,
  location,
  setLocation,
  setPref,
  setShowSaved,
  count,
}) => {
  const { data } = useGetSuggestions();
  const [show, setShow] = useState(false);

  return (
    <div className="page-top">
      {show ? (
        <Sidebar
          setPref={setPref}
          setShowSaved={setShowSaved}
          onCancel={() => setShow(false)}
        />
      ) : null}
      <div className="search-input-container">
        <AutoComplete
          inputValue={search}
          setInputValue={setSearch}
          countries={data || []}
        />
        <AutoComplete2 hierarchy={location} setHierarchy={setLocation} />
        <div className="d-flex-row">
          <button className="page-top-button" onClick={refetchData}>search</button>
          <IoFilter
            className="cursor-hover-black filter-icon"
            onClick={() => setShow(true)}
          />
        </div>
      </div>
      {/*       <div className="search-input-container">
        <button onClick={() => setShowSaved(true)}>saved</button>
        <button onClick={() => setShowSaved(false)}>all</button>
        <button onClick={() => setPref("RESET", "")}>reset pref</button>
      </div> */}
      <p>{count} jobs available</p>
    </div>
  );
};

export default Search;
