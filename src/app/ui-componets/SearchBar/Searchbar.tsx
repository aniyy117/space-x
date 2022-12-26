// react
import React from "react";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
  fill?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery, fill }) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e: any) => {
        setSearchQuery(e.target.value);
      }}
      label="Search for a payload"
      variant="standard"
      placeholder="Search..."
      size="small"
      color="secondary"
      sx={{
        input: { color: "white", borderColor: "white", width: "20rem" },
      }}
    />
  </form>
);

export default SearchBar;
