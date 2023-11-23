import "./App.css";
import { Component } from "react";
import CardList from "./components/cards-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    const searchParams = new URLSearchParams(window.location.search);
    const searchField = searchParams.get("q") || "";

    this.state = { monsters: [], searchField };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => this.setState(() => ({ monsters: users })));
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState(() => {
      const searchParams = new URLSearchParams();
      searchParams.set("q", searchField);
      window.history.replaceState({}, "", `?${searchParams.toString()}`);
      return { searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filterMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>

        <SearchBox
          searchField={searchField}
          onChangeHandler={this.onSearchChange}
          placeholder={"Искать монстра"}
          className="monsters-search-box"
        />
        <CardList monsters={filterMonsters} />
      </div>
    );
  }
}

export default App;
