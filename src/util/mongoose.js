module.exports = {
    multipleMongooseToObjetc: function(mongooseArrays) {
        return mongooseArrays.map(mongooseArray => mongooseArray.toObject())
    },
    mongooseToObjetc: function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};

