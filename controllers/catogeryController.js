class categoryController {
    showCategory(req,res){
        res.json({ kq: "2"})
    }
    
    addCategory(req,res){
        res.json({kq: "add Category"})
    }
}

module.exports = new categoryController;