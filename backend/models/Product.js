const mongoose = require('mongoose')
const { Schema } = mongoose;

const areaDoConhecimentoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    professores: {
        type: [{
            nome: {
                type: String,
                required: true
            },
        }],
        required: true,
        default: []
    }
}, { timestamps: true })

const AreaDoConhecimento = mongoose.model("AreaDoConhecimento", areaDoConhecimentoSchema)

module.exports = AreaDoConhecimento