const { render } = require('ejs');
const pageRouter = require('./pages');
const adminRouter =require('./adminPage');

module.exports = function(app){

    app.use('/',pageRouter);
    app.use('/admin/pages',adminRouter);
    

}