//dependencies 
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

//creating PORT
const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", 
{ useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false
 });


//Routes
app.get("api/workouts", (req, res) => {
    db.Workout.find({})
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err))
});

app.put("/api/workouts/:id", (req, res) => {
    const id = req.params.id;
    const exercise = req.body;

    db.Workout.findByIdAndUpdate(id, {
        $push: { exercises: exercise }
    })
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err))

});

app.post("/api/workouts", (req, res) => {
    const workout = req.body;

    db.Workout.create(workout)
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err))
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({

    })
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err))
});

//calling PORT 
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

/*
app.get("/api/:page")
//decides what route/page to go to
req.params.page === "hero"
//not needed - nonencoded - extra 
req.query.alias === "Batman"
//encoded information 
req.body === { name: "Bruce Wayne"}

*/