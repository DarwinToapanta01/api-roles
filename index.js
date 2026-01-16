const express = require("express");
require("dotenv").config();

const sequelize = require("./config/db");
require("./models/User"); // Registrar modelo

const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);

app.get("/", (req, res) => {
    res.send("API Roles OK");
});

async function start() {
    try {
        await sequelize.authenticate();
        console.log("Conectado a la base de datos");

        await sequelize.sync({ alter: true });
        console.log("Modelos sincronizados");

        app.listen(process.env.PORT, () => {
            console.log(`Servidor en http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
    }
}

start();
