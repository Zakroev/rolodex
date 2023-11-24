import "./search-box.styles.css";

const SearchBox = ({
  className,
  placeholder,
  onChangeHandler,
  searchField,
}) => (
  <input
    className={`search-box ${className}`}
    type="search"
    placeholder={placeholder}
    onChange={onChangeHandler}
    value={searchField}
  />
);

export default SearchBox;
