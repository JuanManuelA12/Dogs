/* eslint-disable no-unused-vars */

import { GET_ALL_DOGS, FILTER_CREATED } from "../actions/index";

const initialState = {
  dogs: [],
  temperaments: [],
  ochodogs: [],
  dogscopia: [],
  todos: [],
  dogsDB: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        dogscopia: action.payload,
        dogsDB: action.payload.slice(172),
      };

    case "TEMPERAMENTOS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_CREATED:
      const todos = state.dogs;
     // const filtradoApi  = action.payload === "api"? todos.filter((dog)=> dog.id <= 300) : todos.filter((dog)=> dog.id.length >= 4)
      const filterDogs =
        action.payload === "db" ? state.dogsDB : state.dogscopia.slice(0, 172); //despues de los 172 perros del array son de la api
      return {
        ...state,
        dogs: action.payload === "todos" ? state.dogscopia : filterDogs, //dogscopia el que manipulamos // lo creamos para que no se pise con los otros filtros
      };

    case "ordenar-liviano-pesado":
      return {
        ...state,
        dogs: state.dogs.sort(
          (a, b) => parseInt(a.weight) - parseInt(b.weight)
        ),
      };
    case "ordenar-pesado-liviano":
      return {
        ...state,
        dogs: state.dogs.sort(
          (a, b) => parseInt(b.weight) - parseInt(a.weight)
        ),
      };
    case "ordenar-asc-desc":
      return {
        ...state,
        dogs: state.dogs.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }),
      };

    case "ordenar-desc-asc":
      return {
        ...state,
        dogs: state.dogs.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        }),
      };
    case "GET_BREED":
      return {
        ...state,
        dogs: action.payload,
      };

    case "FILTER_DOGS":
      const alldogs = state.dogscopia;
      const filtered = alldogs.filter((i) =>
        i.temperament?.includes(action.payload)
      );

      return {
        ...state,
        dogs: filtered,
      };
    default:
      return state;
  }
}
export default rootReducer;
