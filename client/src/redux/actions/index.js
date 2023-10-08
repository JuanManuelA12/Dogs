import axios from "axios";
const urlMyApi = "http://localhost:3001";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_FILTER_TEMPERAMENTS = "GET_FILTER_TEMPERAMENTS";
export const GET_BREED = "GET_BREED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const SHOW_DOG_DETAILS = "SHOW_DOG_DETAILS";
export const FILTER_CREATED = "FILTER_CREATED";

export function getAllDogs() {
  return async function (dispatch) {
    var json = await axios.get(`${urlMyApi}/dogs`, {
      //axios.get(`${urlMyApi}/dogs`
    });
    return dispatch({
      //necesario para despachar la accion
      type: GET_ALL_DOGS,
      payload: json.data,
    });
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get(`${urlMyApi}/temperament`); //axios.get(`${urlMyApi}/temperament`)
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: json.data,
    });
  };
}

export function FilterByTemperament(payload) {
  return {
    type: GET_FILTER_TEMPERAMENTS,
    payload,
  };
}

export function getBreed(payload) {
  //dogs by name
  return async function (dispatch) {
    //Dispatch que podemos usar gracias a la asincronia provista por el middleware thunk
    try {
      var json = await axios.get(`${urlMyApi}/dogs?name=${payload}`); //axios.get(`${urlMyApi}/dogs?name=${payload}`)
      return dispatch({
        type: GET_BREED,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      alert("server say:not dogs found");
    }
  };
}

export function OrderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function OrderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}

export function showDogDetails(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/dogs/" + id, {
        //axios.get("http://localhost:3001/dogs/"+id
      });
      return dispatch({
        type: SHOW_DOG_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postDog(payload) {
  console.log("dog");
  console.log(payload);
  return async function () {
    const data = await axios.post("http://localhost:3001/dog", payload); //axios.post("http://localhost:3001/dog"
    return data;
  };
}
export const filterdogs = (value) => {
  return {
    type: "FILTER_DOGS",
    payload: value,
  };
};
