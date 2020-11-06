const pageRouter = require('./pages');
const adminRouter =require('./adminPage');
const categoryRouter = require('./adminCategory');

module.exports = function(app){

    app.use('/',pageRouter);
    app.use('/admin/pages',adminRouter);
    app.use('/admin/category',categoryRouter)

}