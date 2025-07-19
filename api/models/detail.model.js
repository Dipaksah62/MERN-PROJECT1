const {Schema, model} = require('mongoose')
const { modelConfig, relation, numberRequired } = require('../library/constants')

const Detail = model('Detail', new Schema({
    productId: {...relation, ref: 'Product'},
    orderId: {...relation, ref: 'Order'},
    qty: numberRequired,
    price: numberRequired,
    total: numberRequired,
}, modelConfig))

module.exports = Detail