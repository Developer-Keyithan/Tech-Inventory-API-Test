const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    device_name: {type: String, required: true},
    device_type: {type: String, required: true},
    brand: {type: String, required: true},
    model: {type: String, required: true},
    price: {type: Number, required: true},
    color: {type: String, required: true},
    storage: {type: String, required: true},
    battery: {type: String, required: true},
    screen_size: {type: String, required: true},
    camera: {type: String, required: true},
    processor: {type: String, required: true},
    release_date: {type: String, required: true}
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;