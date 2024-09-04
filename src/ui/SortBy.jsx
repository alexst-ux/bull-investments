import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { SORT_BY_URL } from "../services/constants";

/* eslint-disable react/prop-types */
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get(SORT_BY_URL) || "";

  function handleChange(e) {
    searchParams.set(SORT_BY_URL, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
