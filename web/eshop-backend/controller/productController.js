const Product = require('../models/product');
const path = require('path');
const multer = require('multer');
const ObjectId = require('mongodb').ObjectID;



var storage = multer.diskStorage({
    destination: '../eshop-frontend/src/assets/uploads',
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})
const storage2 = multer.diskStorage({
    destination: 'public',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


var upload = multer({ storage: storage })
const upload2 = multer({ storage: storage2 });

const addProd = (req, res) => {

    Product.findOne({ name: req.body.name })
        .then((result) => {
            if (result == null) {
                let filename = req.body.product_img;

                let extension = path.extname(filename);
                let file = path.basename(filename, extension) + extension;
                let product = req.body;
                var fileName = file.replace(/^.*[\\\/]/, '');
                product.product_img = fileName;
                product.sales = 0;
                let prod = new Product(product)
                prod.save().then((result) => {
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

const getAllProd = (req, res) => {
    Product.aggregate([{
        $lookup: {
            from: 'categories',
            localField: "category",
            foreignField: '_id',
            as: "category"

        }
    }]).exec((err, result) => {
        if (!err) {
            res.send(result)
        }
    })
}



const getProductPagination = (req, res) => {
    let opt = JSON.parse(req.params.opt)
    console.log(opt)
    const sortBy = opt.sort;
    console.log(sortBy)
    const page = opt.page;
    const limit = opt.lim;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if (opt.min != null) {
        Product.aggregate([
            { $match: { $or: [{ price: { $gt: opt.min - 2, $lt: opt.max + 1 } }] } },
            {
                $lookup: {
                    from: 'categories',
                    localField: "category",
                    foreignField: '_id',
                    as: "category"

                }
            }]).sort(sortBy).exec((err, result) => {
                if (!err) {

                    res.json({ page: result.slice(startIndex, endIndex), len: Math.ceil((result.length) / limit) })
                }
                else{
                    res.json({msg:'Pas de produit '})
                }
            })
    }
    else {
        Product.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: "category",
                    foreignField: '_id',
                    as: "category"

                }
            }]).sort(sortBy).exec((err, result) => {
                if (!err) {

                    res.json({ page: result.slice(startIndex, endIndex), len: Math.ceil((result.length) / limit) })
                }
            })
    }

}

const deleteProd = (req, res) => {
    Product.remove({ _id: req.body.id })
        .then((result) => {
            res.json("Deleted")
        })
        .catch((err) => {
            console.log(err)
        })
}


const getProductByCategoryId = (req, res) => {
    let opt = JSON.parse(req.params.opt);
    console.log(opt)
    const sortBy = opt.sort;
    const page = opt.page;
    const limit = opt.lim;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    Product.find({
        price: {
            $gte: opt.min - 2,
            $lt: opt.max + 1
        }, category: ObjectId(opt.id)
    }).sort(sortBy)
        .then((result) => {
            console.log(result)
            res.json({ page: result.slice(startIndex, endIndex), len: Math.ceil((result.length) / limit) })
        })
        .catch((err) => {
            console.log(err);
        })
}

const getMinMaxPrice = (req, res) => {
    Product.find()
        .then((result) => {
            console.log(result)
            if(result.length>0)
            {
                 const max = result.reduce((prev, current) => (prev.price > current.price) ? prev : current)
                 const min = result.reduce((prev, current) => (prev.price < current.price) ? prev : current)
                 res.json({ price_interval: { min: min.price, max: max.price } })
            }
            else{
                res.json({"msg":"NOK"})
            }
         
           
        })
        .catch((err) => {
            console.log(err)
        })
}
const getProdById = (req, res) => {
    let id = req.params.id;
    console.log(id)
    Product.findOne({ _id: id })
        .then((result) => {
            console.log(result)
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })

}

const getProdByCategId = (req, res) => {
    let id = req.params.id;
    Product.find({ category: id })
        .then((result) => {
            console.log(result)
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
}

const searchProduct = (req, res) => {
    let opt = JSON.parse(req.params.opt);
    if (opt.category != '') {
        Product.find({ category: opt.category, name: { $regex: opt.word, $options: 'i' } })
            .then((result) => {
                if(result != null)
                {
                  res.send(result)  
                }
                res.json({msg:'Pas de produit '})
                
            })
            .catch((err) => {
                console.log(err)
            })
    }
    else {
        Product.find({ name: { $regex: opt.word, $options: 'i' } })
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                console.log(err)
            })
    }

}

const updateProdSales = (req, res) => {


    Product.findOneAndUpdate({ _id: req.body.id }, { $inc: { sales: req.body.qte } })
        .then((result) => {
            res.json({ 'msg': 'OK' })
        })
        .catch((err) => {
            console.log(err)
        })

}

const updateProdQte = (req , res)=>{
  
    Product.findOneAndUpdate({ _id: req.body.id }, { $set: { qte: req.body.qte} })
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        console.log(err)
    })

}

const getBestProd = (req , res)=>{
  Product.find().sort({sales:-1}).limit(3).exec((err,result)=>{
      if(!err)
      {
          res.send(result)
      }
      else{
          console.log(err)
      }
  })
}

const editProd = (req ,res)=>{
    console.log(req.body)
   
    Product.updateOne({_id:req.body.prod.id},{$set:{
        name : req.body.prod.name,
        category : ObjectId(req.body.prod.category),
        description : req.body.prod.description,
        price : req.body.prod.price,
        qte : req.body.prod.qte
    
    }})
    .then((result) => {
        res.send({ message: 'updated Succesflly' })
      })
      .catch((err) => {
        console.log(err)
      })
}

module.exports = {
    addProd,
    getAllProd,
    getProductPagination,
    searchProduct,
    getProdById,
    getBestProd,
    deleteProd,
    upload,
    upload2,
    getProductByCategoryId,
    getProdByCategId,
    getMinMaxPrice,
    updateProdSales,
    updateProdQte,
    editProd

}