const express = require("express");
const cors = require("cors");

require('dotenv').config();
const pool = require("./db");
const app = express();

let PORT = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

// create a departments
app.post("/api/v1/departments", async (req, res) => {
    try {
        const { description } = (req.body);
        const newDepartment = await pool.query("INSERT INTO departments (description) VALUES($1) RETURNING *", [description]
        );

        res.json(newDepartment.rows[0]);
    } catch (err) {
        console.error(err.message);
    }

});

// welcome message
app.get("/api/v1", async (req, res) => {
    try {
        res.send("From API Server: Hello World")

    } catch (err) {
        console.error(err.message);
    }
})


// get all departments
app.get("/api/v1/departments", async (req, res) => {
    try {
        const allDepartments = await pool.query("SELECT * FROM departments");
        res.json(allDepartments.rows)

    } catch (err) {
        console.error(err.message);
    }
})

// get a departments by id
app.get("/api/v1/departments/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const departments = await pool.query("SELECT * FROM departments WHERE department_id = $1", [id]);

        res.json(departments.rows)
    } catch (err) {
        console.error(err.message);
    }
})

// update a departments
app.put("/api/v1/departments/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = (req.body);
    try {
        const updateDepartment = await pool.query("UPDATE departments SET description = $1 WHERE department_id = $2", [description, id]);

        res.json(`Department ${id} description was updated to ${description}!`)
    } catch (err) {
        console.error(err.message);
    }
});

// delete a departments
app.delete("/api/v1/departments/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteDepartment = await pool.query("DELETE FROM departments WHERE department_id = $1", [id]);

        res.json(`Department id: ${id} deleted!`)
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
