const Contact = require('../models/contact');


const addContact = (req ,res )=>{
    let contact = new Contact(req.body);
    contact.save()
    .then((result)=>{
        res.send('OK')
    })
    .catch((err)=>{
        console.log(err);
    })

} 

const deleteContact = (req ,res)=>{
    Contact.findByIdAndDelete(req.body.id)
    .then((result)=>{
        res.json('Deleted Sucessfully');
    })
    .catch((err)=>{
        console.log(err);
    })
}

const getAllContact = (req ,res)=>{
    Contact.find()
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
    })
}
const getContact = (req ,res)=>{
    Contact.find({_id:req.params.id})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = {
    addContact,
    deleteContact,
    getAllContact,
    getContact

}