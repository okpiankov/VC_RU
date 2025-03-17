import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.scss";
import { Search } from "lucide-react";

export const SearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchQuery) {
      return;
    }
    //Получаю фразу введенную пользователем из инпута,
    //формирую из нее url и перенаправляю пользователя на этот url
    const url = `/search?title=${searchQuery}`;
    setSearchQuery("");
    navigate(url);
  };

  return (
    <form className="form_search" onSubmit={handleSubmit}>
      <button className="button_search">
        <Search className="search" />
      </button>
      <input
        className="input_search"
        type="search"
        name="search"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Поиск..."
      ></input>
    </form>
  );
};
