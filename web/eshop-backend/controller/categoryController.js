const Category = require('../models/category');

const addCateg = (req, res) => {

    Category.findOne({ name: req.body.name })
        .then((result) => {
            if (result == null) {
                let categ = new Category(
                    {
                        name: req.body.name
                    })
                categ.save().then((result) => {
                    res.json({ registred: true });
                })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                res.json({ registred: false })
            }
        })



}

const getAllCateg = (req, res) => {
    Category.find()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
}

const getCategById = (req ,res)=>{
    Category.findOne({_id:req.params.id})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
    })
}
const deleteCateg = (req , res)=>{
    Category.deleteOne({_id:req.body.id})
    .then((result)=>{
        res.json("Deleted")
    })
    .catch((err)=>{
        console.log(err)
    })
}

const editCateg = (req ,res)=>{
    console.log(req.body)
   
    Category.updateOne({_id:req.body.categ.id},{$set:{
        name : req.body.categ.name,
    }})
    .then((result) => {
        res.send({ message: 'updated Succesflly' })
      })
      .catch((err) => {
        console.log(err)
      })
}


module.exports = {
    addCateg,
    getAllCateg,
    deleteCateg,
    getCategById,
    editCateg
}