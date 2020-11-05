class pageController {
    showPage(req,res){
        res.render('index',{
            title:'Home',
        })
    }
    test(req,res){
        res.send('Page test');
    }
}
module.exports = new pageController;