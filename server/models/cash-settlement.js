const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cashSettlementSchema = new Schema({
    storeName: String,
    cashAmount: Number
});

module.exports = mongoose.model('CashSettlement', cashSettlementSchema, 'account');
