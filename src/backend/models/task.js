const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new Schema ({
    matkul: {
        type: String,
        required: true
    },
    jenis: {
        type: String,
        required: true
    },
    topik: {
        type: String,
        required: true
    }, 
    tanggal: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
