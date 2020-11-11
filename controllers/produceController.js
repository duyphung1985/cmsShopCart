
const Produce = require('../models/product');
const Category = require('../models/category');
const { validationResult } = require('express-validator');
const slug1 = require('slug');


class produceController {

    //Show Produce
    showProduce(req,res){
        var count = 0;
        
        Produce.count(function(err,c){
            count = c;
        })
        Produce.find(function(err,produce){
            res.render('admin/show_produces',{
                title: "Show Product",
                produce,
                count,
            })
        })
        
    }

    //Add Produce
    addProduce(req,res){

        let title = "";
        let price = "";
        let slug = "";
        let desc = "";
        
        Category.find(function(err,cat){
            res.render('admin/add_produce',{
                title: "Add new a Produce",
                price, slug, desc, cat
            })
        })
        
    }


    

    //Save Add Produce
    saveProduce(req,res){
        let errors = validationResult(req).array();
        let title = req.body.title;
        let price = req.body.price;
        let slug = req.body.slug == "" ? slug1(req.body.slug): req.body.slug;
        let desc = req.body.desc;
        let cat = req.body.cat;
        let img = req.body.img
        Category.find(function(err,cat){
            if(errors.length > 0 ){
                res.render('admin/add_produce',{
                    title, price, slug, desc, img, cat, errors
                })
            } else {
                Produce.find(function(err,produce){
                    if(produce.length > 0){
                        req.flash('warning','Produce Existing!!!');
                        res.render('admin/add_produce',{
                            title, price, slug, desc, img, cat
                        })
                    } else {
                        
                                res.json(req.files)
                       
                    }
                   
                })

            }
        })
       
    }
}

module.exports = new produceController;