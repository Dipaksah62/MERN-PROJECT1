const {Schema, model} = require('mongoose')
const { stringRequired, modelConfig, relation, numberRequired } = require('../library/constants')

const Review = model('Review', new Schema({
    productId: {...relation, ref: 'Product'},
    userId: {...relation, ref: 'User'},
    comment: stringRequired,
    rating: numberRequired,
}, modelConfig))

module.exports = Review