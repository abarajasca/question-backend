import { Schema, model } from 'mongoose'

const TestSchema = Schema({
    llm: {
        type: String,
        require: true
    },
    topic:{
        type: String,
        require: true
    },
    questionNumber: {
        type: Number,
        require: true
    },
    level: {
        type: String,
        require: true
    },
    language: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    runningTime: {
        type: Number,
        require: true
    }
});

const Test = model('Test',TestSchema);

export default Test;