/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import "../DogCard/DogCard.css"

function DogCard({name, temperament, id, img, weigth}) {

  return (
    <Link to={`/dog-detail/${id}`}>
      <div className="card-container">
          <img className= "img-dog" src= {img}></img>
          <div className="titulo-dog-container">
            <p className="titulo-card">{name}</p>
            <br />
            <p className="temperamento-card">Temperamento: <br/> <p/> {temperament}</p>  
            <p>{weigth}</p>          
          </div>
      </div>
    </Link>    
  );
}

export default DogCard;

