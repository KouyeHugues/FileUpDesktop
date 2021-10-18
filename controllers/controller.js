

module.exports.home = (req, res, next) =>{
    res.render('index');
}
module.exports.receive = (req, res, next) =>{
    res.render('receiver');
}