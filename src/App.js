import "./App.css";
import { Component } from "react";

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
        <input
          className="search-box"
          type="search"
          placeholder="Искать монстра"
          value={searchField}
          onChange={(e) => this.onSearchChange(e)}
        />
        {filterMonsters.map((monster) => (
          <div key={monster.id}>
            <h1>{monster.name}</h1>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
