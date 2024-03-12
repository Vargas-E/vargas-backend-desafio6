const express = require("express");
const router = express.Router();

router.use(express.static("./src/public"));


// Ruta para el formulario de login
router.get("/login", (req, res) => {
    if (req.session.login) {
        return res.redirect("/api/products/view");
    }
    res.render("login");
});

// Ruta para el formulario de registro
router.get("/register", (req, res) => {
    if (req.session.login) {
        return res.redirect("/api/products/view");
    }
    res.render("register");
});

module.exports = router;