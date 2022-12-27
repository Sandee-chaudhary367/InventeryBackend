const mongoose=require("mongoose");

const articleSchema=new mongoose.Schema( {
    end_year: {
        type: String,
        required: true,
        trim: true
    },
    intensity: {
        type: Number,
        required: true,
        trim: true
    },
    sector: {
        type: String,
        required: true,
        trim: true
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    insight: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    region: {
        type: String,
        required: true,
        trim: true
    },
    start_year: {
        type: String,
        required: true,
        trim: true
    },
    impact: {
        type: Number,
        required: true,
        trim: true
    },
    added: {
        type: String,
        required: true,
        trim: true
    },
    published: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    relevance: {
        type: Number,
        required: true,
        trim: true
    },
    pestle: {
        type: String,
        required: true,
        trim: true
    },
    source: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    likelihood: {
        type: Number,
        required: true,
        trim: true
    }
    
});


const article = mongoose.model('articles',articleSchema);

module.exports = article
