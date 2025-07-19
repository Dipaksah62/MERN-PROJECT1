const {Schema, model} = require('mongoose')
const { modelConfig, relation, orderStatus } = require('../library/constants')

const Order = model('Order', new Schema({
    userId: {...relation, ref: 'User'},
    status: {type: String, enum: orderStatus, default: 'Processing'}
}, modelConfig))

module.exports = Order