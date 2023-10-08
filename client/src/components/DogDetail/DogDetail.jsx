/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"
import "./DogDetail.css"
import { useSelector } from "react-redux";
import image from '../../Image/Gray_circles_rotate.gif' 


function DogDetail() {
    const temperaments = useSelector((state) => state.temperaments);
    const [DogDetail, setDogDetail] = useState({name: "", temperament: "",  weight_min: "", life_span_min: "" ,  height_min: "", height_max : "",weight_max: "",life_span_max: "",   fotoid: ""})
    let {id} = useParams()

    useEffect(() => {
        traerDetalles()
    }, [])
    const [alreadyload,setAlreadyload]=useState(false)
    const traerDetalles = () => {
        axios.get(`http://localhost:3001/dog-detail/${id}`) 
            .then((res) => {
                console.log(res.data)
                setAlreadyload(true);
                setDogDetail({
                    name: res.data[0].name,
                    temperament: res.data[0].temperament || res.data[0].temperaments?.map(i =>i.name).join(" ") ,
                    altura: res.data[0].height||res.data[0].height_min+'-'+res.data[0].height_max,  
                    peso: res.data[0].weight ||res.data[0].weight_min+'-'+ res.data[0].weight_max, 
                    años: res.data[0].life_span ||res.data[0].life_span_min + '-' +res.data[0].life_span_max,   
                    fotoid: res.data[0].image
                })
            })
            .catch((error) => {
                console.log(error);
            }); 
    } 

    return (
        <div className= "fondo-dog-detail">
            <Link to='/buscar'><button className="back">Back</button></Link>{ /*hice cambios*/}
            {alreadyload?<div className= "container-amarillo">
                <div className= "container-img">
                    <img className= "img-perro" src= {DogDetail.fotoid}></img>
                </div>
                <div className="descripcion-perro">
                    <p>{DogDetail.name}</p>
                    <div>
                        {console.log(DogDetail)}
                        <p>Temperamento: {DogDetail.temperament}</p>
                        <p>Altura:{DogDetail.altura}</p>
                        <p>Peso: {DogDetail.peso}</p>
                        <p>Años de vida: {DogDetail.años}</p> 
                    </div>
                </div>
            </div>: <div className="loaders"><img className= "container-img" src={image} alt="" /></div>} 
        </div>
    )
}

export default DogDetail;