const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://123:123@cluster0.yrkh1.mongodb.net/TNH_education_testNodejs?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('connect successfully!!');
    } catch (error) {
        console.log('connect fail!!');
        
    }
}

module.exports = { connect };
