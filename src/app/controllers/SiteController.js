const Course = require('../models/Course')
const { multipleMongooseToObjetc } = require('../../util/mongoose')
class SiteController {
    // [GET] /news
    index(req, res) {

        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: multipleMongooseToObjetc(courses)
                });      
            })
            .catch (err => next(err));
    }

    // GET /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
