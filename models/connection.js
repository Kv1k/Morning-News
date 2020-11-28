var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://dbKv1k:g2XYti7Qm8PzsWP3@cluster0.ovbmt.mongodb.net/morningnews?retryWrites=true&w=majority',
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