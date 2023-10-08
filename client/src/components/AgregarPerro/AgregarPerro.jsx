import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import "../DogDetail/DogDetail";
import "../AgregarPerro/AgregarPerro.css";
import axios from "axios";
//import * as actions from "../Redux/actions"

function AgregarPerro() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [perroNuevo, setPerroNuevo] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    temperaments: [],
    image: "",
  }); ///
  const [temperamentoUltimo, setTemperamentoUltimo] = useState({});
  const [creatingTemperament, setCreatingTemperament] = useState(false);
  const [temperamentonuevo, setTemperamentonuevo] = useState("");

  const history = useHistory();

  ////errores
  const [errors, setErrors] = useState({});
  const validator = (perroNuevo) => {
    //
    const errors = {};
    if (!perroNuevo.name) errors.name = "Complete el campo de nombres";
    if (!perroNuevo.image) errors.image = "Ingrese una url de imagen"; ///terminar de agregar errores en etiqueta span
    if (!perroNuevo.description) errors.description = "ingrese una descripcion";

    return errors;
  };
  const handleChange = (e) =>
    setPerroNuevo(
      {
        ...perroNuevo,
        [e.target.name]: e.target.value,
      },
      console.log(perroNuevo),
      setErrors(
        validator({
          ///
          ...perroNuevo,
          [e.target.name]: e.target.value,
        })
      )
    );
  //   const selectedChange = (e) => {
  //     const {name, value} = e.target;
  //     setPerroNuevo({...perroNuevo, [name]:value})
  //   }///reemplazada

  const selectedChangeTemperament = (e) =>
    setPerroNuevo({
      ...perroNuevo,
      temperaments: [...perroNuevo.temperaments, e.target.value], //
    });

  const AgregarNuevoPerro = () => {
    {
      /* hice cambios  */
    }
    let temperamentsId = Object.keys(temperamentoUltimo);
    axios
      .post(`http://localhost:3001/dog`, perroNuevo)
      .then((res) => {
        console.log(res);
        alert("Perro creado");
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo crear el perro");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!perroNuevo.name) {
      return alert("Revisa los campos obligatorios");
    }
    AgregarNuevoPerro();
    history.push("/buscar");
  };

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
  }, []);

  const crearTemperamento = () => {
    axios
      .post(`http://localhost:3001/createtemperament`, { temperamentonuevo })
      .then((res) => {
        alert("Temperamento creado");
        dispatch({
          type: "TEMPERAMENTOS",
          payload: [...temperaments, res.data],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="fondo-dog-detail">
      <NavLink to="/buscar">
        {" "}
        <button className="boton back"> Back</button>
      </NavLink>
      <div className="container-amarilloo">
        <div className="tabs"></div>
        {creatingTemperament ? (
          <div className="agregar-temperamento">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="agregarTemperament">
                  Nombre del temperamento nuevo
                </label>
                {errors.name && <span>{errors.name}</span>}
                <br></br>
                <input type="text" onChange={handleChange} />
              </div>
              <button className="boton-agregar" onClick={crearTemperamento}>
                Agregar
              </button>
            </form>
          </div>
        ) : (
          <form className="agregarPerro" onSubmit={handleSubmit}>
            <div className="container-desc-img">
              <div className="container-img">
                {/* <input className="img-subir" type="file" name="file"/> */}
              </div>
              <div className="descripcion-perro">
                <p>
                  {" "}
                  Nombre:
                  <input
                    name="name"
                    value={perroNuevo.name}
                    onChange={handleChange}
                    placeholder="nombre"
                  />
                </p>
                {errors.name && (
                  <span style={{ color: "red", background: "black" }}>
                    {errors.name}
                  </span>
                )}

                <div>
                  <p>Temperamentos:</p>
                  <div>
                    {" "}
                    <select onChange={selectedChangeTemperament}>
                      <option>Seleccionar</option>
                      {temperaments.map((t) => {
                        return <option name={t.name}>{t.name}</option>;
                      })}
                    </select>
                  </div>
                  <p>
                    Altura minima cm:
                    <input
                      name="height_min"
                      value={perroNuevo.height_min}
                      onChange={handleChange}
                      placeholder="Cm..."
                    />
                  </p>
                  <p>
                    Altura maxima cm:
                    <input
                      name="height_max"
                      value={perroNuevo.height_max}
                      onChange={handleChange}
                      placeholder="Cm..."
                    />
                  </p>

                  <p>
                    {" "}
                    Peso minimo kg:
                    <input
                      name="weight_min"
                      value={perroNuevo.weight_min}
                      onChange={handleChange}
                      placeholder="Kg..."
                    />
                  </p>
                  <p>
                    {" "}
                    Peso maximo kg:
                    <input
                      name="weight_max"
                      value={perroNuevo.weight_max}
                      onChange={handleChange}
                      placeholder="Kg..."
                    />
                  </p>

                  <p>
                    {" "}
                    Vida minima:
                    <input
                      name="life_span_min"
                      value={perroNuevo.life_span_min}
                      onChange={handleChange}
                      placeholder="Min..."
                    />
                  </p>
                  <p>
                    {" "}
                    Vida maxima:
                    <input
                      name="life_span_max"
                      value={perroNuevo.life_span_max}
                      onChange={handleChange}
                      placeholder="Max..."
                    />
                  </p>
                  <p>
                    <p>
                      image:
                      <input
                        name="image"
                        value={perroNuevo.image}
                        onChange={handleChange}
                        placeholder="url-image"
                      />
                    </p>
                    {errors.image && <p> Inserte una imagen</p>}
                  </p>
                  {perroNuevo.image && (
                    <img
                      src={perroNuevo.image}
                      alt=""
                      width="100"
                      height="100"
                    />
                  )}
                </div>
                <div>
                  <button className="boton-agregar-perroo">
                    Agregar perro
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AgregarPerro;
