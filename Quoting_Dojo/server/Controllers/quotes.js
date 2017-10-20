var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');
module.exports = {
    show: function(req, res){
        Quote.find({}, function(err,quotes) {
            res.render('main', {quotes: quotes});
        })
    },
    create: function(req,res) {
        var quote = new Quote({name: req.body.name, quote: re.body.quote});
        quote.save(function(err) {
            if(err){
                console.log("something went wrong at create route");
            } else {
                res.redirect('/main');
            }
        })
    }
}