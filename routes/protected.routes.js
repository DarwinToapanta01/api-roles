const express = require("express");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/role");

const router = express.Router();

// Ruta para cualquier usuario autenticado
router.get("/perfil", auth, (req, res) => {
    res.json({
        message: "Acceso permitido",
        user: req.user,
    });
});

// Ruta solo para admin
router.get("/admin", auth, allowRoles("admin"), (req, res) => {
    res.json({ message: "Panel admin: OK" });
});

// Ruta para admin y docente
router.get("/docente", auth, allowRoles("admin", "docente"), (req, res) => {
    res.json({ message: "Área docente: OK" });
});

module.exports = router;
