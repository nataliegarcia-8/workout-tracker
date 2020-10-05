const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                enum: ['resistance', 'cardio'],
                required: true
            },
            name: {
                type: String,
                required: true
            },
            duration: {
                type: String,
                required: true
            },
            weight: {
                type: Number,
                required: function () {
                    return this.type === "resistance"
                }
            },
            reps: {
                type: Number,
                required: function () {
                    return this.type === "resistance"
                }
            },
            sets: {
                type: Number,
                required: function () {
                    return this.type === "resistance"
                }
            },
            distance: {
                type: Number,
                required: function () {
                    return this.type === "cardio"
                }
            }
        }

    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
