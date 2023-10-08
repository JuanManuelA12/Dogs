const axios = require("axios");
const { Dog, Temperaments } = require("../db");
const { Router } = require("express");
const express = require("express");
const { Await } = require("react-router-dom");

const router = Router();

const getApiDogs = async () => {
  const URL = await axios.get("http://api.thedogapi.com/v1/breeds");
  const UrlResponse = await URL.data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      weight: dog.weight.metric,
      height: dog.height.metric,
      life_span: dog.life_span,
      temperament: dog.temperament,
      image: dog.image.url,
    };
  });
  return UrlResponse;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperaments,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  const API = await getApiDogs();
  const DB = await getDbInfo();
  const InfoTotal = API.concat(DB);
  return InfoTotal;
};

router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  const nameDog = await getAllDogs();
  try {
    if (name) {
      let dogByName = await nameDog.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      //console.log(dogByName)
      dogByName.length
        ? res.send(dogByName)
        : res.status(404).send("Error, El perro no existe");
    } else {
      //let dogsTotal = await getAllDogs()
      res.status(200).send(nameDog);
    }
  } catch (error) {
    res.status(404).send({ msg: error.mesagge });
  }
});

router.get("/dog-detail/:idRaza", async (req, res) => {
  //traer la info de un perro por su id, del modelo raza
  const { idRaza } = req.params;
  const allDogs = await getAllDogs();
  const dog = allDogs.filter((el) => el.id == idRaza);
  if (dog.length) {
    res.status(200).json(dog);
  } else {
    res.status(404).send("Perro no encontrado en los datos");
  }
});

router.get("/temperament", async (req, res) => {
  const temperamentsApi = await axios.get(
    "https://api.thedogapi.com/v1/breeds"
  );
  const temperaments = temperamentsApi.data.map((t) => t.temperament);
  const temps = temperaments.toString().split(",");
  temps.forEach((el) => {
    let i = el.trim();
    Temperaments.findOrCreate({
      where: { name: i },
    });
  });

  const allTemp = await Temperaments.findAll();
  res.send(allTemp);
});

router.post("/dog", async (req, res) => {
  try {
    let {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span_min,
      life_span_max,
      temperaments,
      image,
    } = req.body;

    //si ya esta creado el perro
    let Newdog = await Dog.create(
      {
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        image,
        life_span_min,
        life_span_max,
        temperaments,
      },
      { include: { model: Temperaments } }
    );
    let temperamentObj = [];
    for (let i = 0; i < temperaments.length; i++) {
      let temp = await Temperaments.findOne({
        where: { name: temperaments[i] },
      }); //where (donde) findOne = sequalize busca y registra propiedad de la tabla a donde queremos acceder
      temperamentObj.push(temp);
    }
    await Newdog.addTemperaments(temperamentObj);
    Newdog = await Dog.findOne({ where: { name }, include: Temperaments });
    res.status(200).json(Newdog);
    
  } catch (error) {
    res.json({ error: error.mesagge });
  }
});

module.exports = router;
