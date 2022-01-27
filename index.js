const express = require("express");

const data = require("./MOCK_DATA.json")

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Lista de usuarios",
        body: data
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});