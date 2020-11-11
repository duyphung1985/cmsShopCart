const pageRouter = require('./pages');
const adminRouter =require('./adminPage');
const categoryRouter = require('./adminCategory');
const produceRouter = require('./produceRouter');

module.exports = function(app){

    app.use('/',pageRouter);
    app.use('/admin/pages',adminRouter);
    app.use('/admin/category',categoryRouter)
    app.use('/admin/produce',produceRouter);
}