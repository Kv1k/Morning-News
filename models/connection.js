var mongoose = require('mongoose');
require('dotenv').config()

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect(`mongodb+srv://dbKv1k:${process.env.dbKey}@cluster0.ovbmt.mongodb.net/morningnews?retryWrites=true&w=majority`,
    options,         
    function(error){
    if (error) {
        console.log(error);
    } else {
        console.log("connection okk");
    }
    }
)

module.exports = mongoose