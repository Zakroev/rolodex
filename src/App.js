import React, { useState, useEffect } from "react";
import CardList from "./components/cards-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState(searchParams.get("q") || "");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("q", searchField);
    window.history.replaceState({}, "", `?${searchParams.toString()}`);
  }, [searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const filterMonsters = monsters.filter((monster) =>
    monster.name.toLowerCase().includes(searchField)
  );

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        searchField={searchField}
        onChangeHandler={onSearchChange}
        placeholder={"Искать монстра"}
        className="monsters-search-box"
      />
      <CardList monsters={filterMonsters} />
    </div>
  );
};

export default App;
