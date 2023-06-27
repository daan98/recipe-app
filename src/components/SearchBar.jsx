import React, { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ searchBtnClicked }) => {
    const [term, setTerm] = useState('');

    return(
        <div className="search-container">
            <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
            <button type="button" onClick={() => searchBtnClicked(term)}>Search</button>
        </div>
    );
};

export default SearchBar;