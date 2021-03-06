const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new Schema ({
    matkul: {
        type: String,
        required: false
    },
    jenis: {
        type: String,
        required: false
    },
    topik: {
        type: String,
        required: false
    }, 
    tanggal: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
