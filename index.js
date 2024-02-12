const express = require('express');
const app = express();

const port = 3080;

let alumnos = [
    {
        "id": 1,
        "nombre": "Guillermo",
        "username": "gguillermo"
    },
    {
        "id": 2,
        "nombre": "Galilea",
        "username": "ggalilea"
    },
    {
        "id": 3,
        "nombre": "Hector",
        "username": "hhector"
    }
];

app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});

app.get('/', (req, res) => {
    res.send("¿Funciona?");
});

app.get("/alumnos", (req, res) => {
    res.send(alumnos);
});

app.post("/alumnos", (req, res) => {
    const { body } = req;
    alumnos.push(body);
    res.send("Se ha agregado un alumno");
});

app.patch("/alumnos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    let alumno = alumnos.find(alumno => alumno.id == id);
    if (alumno) {
        alumno.nombre = nombre;
        res.send({ message: "Se actualizó el nombre del alumno" });
    } else {
        res.status(404).send({ message: "Alumno no encontrado" });
    }
});

app.delete("/alumnos/:id", (req, res) => {
    const { id } = req.params;
    alumnos = alumnos.filter(alumno => alumno.id != id);
    res.send({ message: "Alumno eliminado" });
});
