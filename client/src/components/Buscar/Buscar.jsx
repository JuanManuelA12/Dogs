/* eslint-disable no-unused-vars */
import "../Buscar/Buscar.css";
import * as actions from "../../redux/actions/index.js";
import SearchBar from "../SearchBar/SearchBar";
import DogCard from "../DogCard/DogCard";
import Paginacion from "../Paginacion/Paginacion";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { filterCreated, filterdogs } from "../../redux/actions/index";
import image from "../../Image/Gray_circles_rotate.gif";

function Buscar() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const ochodogs = useSelector((state) => state.ochodogs);
  const [peso, setPeso] = useState("");
  const [orderAlfabet, setOrderAlfabet] = useState("");
  const [temperamentSelected, setTemperamentSelected] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPorPag, setItemsPorPag] = useState(8);

  function Dogui() {
    dispatch(actions.getAllDogs());
  }

  useEffect(() => {
    dispatch(actions.getAllDogs());

  }, [dispatch]); ///para que carguen los perros al iniciar el componente

  useEffect(() => {
    axios
      .get(`http://localhost:3001/temperament`)
      .then((res) => {
        dispatch({
          type: "TEMPERAMENTOS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/dogs`)
      .then((res) => {
        dispatch({
          type: "RAZAS_DOGS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const pesoSelectedChange = (e) => {
    if (e.target.value === "liviano-pesado") {
      dispatch({
        type: "ordenar-liviano-pesado",
      });
    } else if (e.target.value === "pesado-liviano") {
      dispatch({
        type: "ordenar-pesado-liviano",
      });
    }
    setPeso(e.target.value);
  };

  const alfabetSelectedChange = (e) => {
    if (e.target.value === "asc-desc") {
      dispatch({
        type: "ordenar-asc-desc",
      });
    } else if (e.target.value === "desc-asc") {
      dispatch({
        type: "ordenar-desc-asc",
      });
    }
    setOrderAlfabet(e.target.value);
  };

  // const temperamentChange = (e) => {
  //     e.preventDefault()

  //     setTemperamentSelected(e.target.value)
  // }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  const indexDelUltimoItem = currentPage * itemsPorPag; // 1 * 4
  const indexDelPrimerItem = indexDelUltimoItem - itemsPorPag;

  const handlefilteredtemperament = (e) => {
    dispatch(filterdogs(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="fondo-buscar">
      <div>
        <div>
          <SearchBar setpage={setCurrentPage} dogui={Dogui} />
          <div>
            <Link to="/agregarperro">
              <button className="boton-agregar-perro">Agregar perro</button>
            </Link>
          </div>
        </div>
        <div className="container-todos-select">
          <div className="select-container">
            <p className="p-select">Ordenar por peso</p>
            <select value={peso} onChange={pesoSelectedChange}>
              <option value="liviano-pesado">Más liviano a más pesado</option>
              <option value="pesado-liviano">Más pesado a más liviano</option>
            </select>
          </div>
          <button className="refresh" onClick={() => Dogui()}>
            INICIO🐶
          </button>
          <div className="select-container">
            <p className="p-select">Ordenar alfabeticamente</p>
            <select value={orderAlfabet} onChange={alfabetSelectedChange}>
              <option value="asc-desc">Ascendente a descendente</option>
              <option value="desc-asc">Descendente a ascendente</option>
            </select>
          </div>
          <div className="select-container">
            <p>Filtrar por temperamento</p>
            <select onChange={handlefilteredtemperament}>
              <option value={""}>Seleccionar filtro</option>
              {temperaments.map((el) => (
                <option value={el.name}>{el.name}</option>
              ))}
            </select>
          </div>
          <div className="select-container">
            <p>Filtrar por raza existente</p>
            <select
              onChange={(e) => {
                handleFilterCreated(e);
              }}
            >
              <option value="todos">Todos</option>
              <option value="api">DESDE API</option>
              <option value="db">DESDE DB</option>
            </select>
          </div>
        </div>
      </div>
      <div className="dogs-container">
        {/* {temperamentSelected &&
                    dogs
                    .filter((dog) => dog.temperament?.includes(temperamentSelected))
                    .slice(indexDelPrimerItem, indexDelUltimoItem)
                    .map((dog) => (
                        <DogCard 
                            img= {dog.image} 
                            name={dog.name} 
                            temperament={dog.temperament} 
                            id={dog.id}/>
                    ))}
                 */}
        {dogs.length ? (
          dogs.slice(indexDelPrimerItem, indexDelUltimoItem).map((dog) => (
            <DogCard
              img={dog.image}
              name={dog.name}
              temperament={
                dog.temperament ||
                (dog.temperaments &&
                  dog.temperaments.map((i) => i.name).join("  "))
              } ///hice cambios
              id={dog.id}
              weigth={dog.weight || dog.weight_min + "-" + dog.weight_max}
            />
          ))
        ) : (
          <div>
            {" "}
            <img className="loader" src={image} alt="" />
          </div>
        )}
      </div>
      <div>
        <Paginacion
          itemsPorPag={itemsPorPag}
          totalPosts={dogs.length}
          paginate={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Buscar;
