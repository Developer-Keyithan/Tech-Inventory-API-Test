const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
    price_per_unit: { type: Number, required: false },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: false }
});

orderSchema.pre('save', async function (next) {
    try {
        const Device = mongoose.model('Device');
        const device = await Device.findById(this.device);
        if (!device) {
            throw new Error('Device not found');
        }

        this.price_per_unit = device.price;

        this.total_price = this.price_per_unit * this.quantity;

        next();
    } catch (err) {
        next(err);
    }
});

orderSchema.virtual('userDetails', {
    ref: 'User',
    localField: 'user',
    foreignField: '_id',
    justOne: true,
    options: { select: 'user_name' }
});

orderSchema.virtual('deviceDetails', {
    ref: 'Device',
    localField: 'device',
    foreignField: '_id',
    justOne: true,
    options: { select: 'device_name' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
