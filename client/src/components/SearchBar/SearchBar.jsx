/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import "../SearchBar/SearchBar.css";
import { getBreed } from "../../redux/actions/index";

function SearchBar({ setpage, dogui }) {
  const dispatch = useDispatch();
  const [buscar, setBuscar] = useState("");
  const dogs = useSelector((state) => state.dogs);
  
  function handleChange(e) {
    setBuscar(e.target.value);
    e.target.value.length === 1 ? dogui() : setBuscar(e.target.value); //para que al borrar el input muestre todo
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getBreed(buscar));
    setpage(1); ///para evitar un bug
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="searchbar"
          placeholder="BUSCAR PERROS"
          value={buscar}
          onChange={handleChange} //a medida que cambia
        ></input>
        <button className="button-buscar" type="submit">
          <h4>BUSCAR PERROS</h4>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
