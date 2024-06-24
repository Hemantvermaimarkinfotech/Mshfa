import "./index.scss";

import React, { useEffect, useState } from "react";
import { SearchOutlined, HighlightOffSharp } from "@material-ui/icons";

const SearchInput = ({ onChange, placeholder }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    onChange(text.replaceAll(" ", ""));
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className={"search-input"}>
      <SearchOutlined
        className={"search-input__icon search-input__icon--search"}
      />
      <input
        className={"search-input__input"}
        value={text}
        onChange={handleChange}
        type="text"
        placeholder={placeholder}
      />
      <HighlightOffSharp
        className={"search-input__icon search-input__icon--clear"}
        onClick={handleClear}
        style={{ visibility: text ? "visible" : "hidden" }}
      />
    </div>
  );
};

export default SearchInput;
