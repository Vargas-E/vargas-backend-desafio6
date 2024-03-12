const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");

const { createHash } = require("../utils/hashbcryp.js");


//Post para generar un usuario y almacenarlo en MongoDB

// Register
router.post("/", async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;
  try {
    //Verificar si el correo ya esta registrado
    const existeUsuario = await UserModel.findOne({ email: email });
    if (existeUsuario) {
      return res.status(400).send({ error: "El email ya esta registrado" });
    }

    //Si no lo encuentra, creamos el nuevo usuario:
    const nuevoUsuario = await UserModel.create({
      first_name,
      last_name,
      email,
      password: createHash(password),
      age,
      rol: "user"
    });

    //Almacenamos la info del usuario en la session:
    req.session.login = true;
    req.session.user = { ...nuevoUsuario._doc };
    res.redirect("/api/products/view");
  } catch (error) {
    console.log("Error al crear el usuario:", error);
    res.status(500).send({ error: "Error al guardar el usuario nuevo" });
  }
});

module.exports = router;
