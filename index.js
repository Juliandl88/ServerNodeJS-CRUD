const express = require("express");

const Service = require("./src/service");

const app = express();

const PORT = 3000;

app.use(express.json()); // Permite recibir datos Json

app.get("/", (req, res) => {
    res.json({
        message: "Lista de usuarios",
        body: Service.getUsers()
    });
});

app.get("/:id", (req, res) => { // Obtenemos el ID por parametro
    let id = req.params.id;
    let user = Service.getUser(id);
    res.json({
        message: `Usuario ${id}`,
        body: user
    });
});

app.post("/", (req, res) => {
    let newUser = req.body;
    Service.createUser(newUser);
    res.status(201).json({
        message: "Usuario creado",
        body: newUser
    })
})

app.put("/:id", (req, res) => {
    const user = Service.getUser(req.params.id);
    let {params: { id }} = req;
    let { body: newUpdater } = req;
    if (user.length == 0) {
      res.status(404).send(`Usuario con id ${req.params.id} no existe`);
    } else {
      const result = Service.validatos(req.body);
      if (result.error) {
        res.status(400).send(result.error.details[0].message);
      } else {
        res.send(Service.updateUser(id, newUpdater));
      }
    }
  });

app.delete("/:id", (req, res) => {
    let id = req.params.id;
    Service.deleteUser(id);
    res.json({
        message: `Usuario ${id} eliminado`,
        body: {}
    });           
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});