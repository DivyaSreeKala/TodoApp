
const express = require("express");

const router = new express.Router();

const todoModel = require('../models/todoData');

//post
router.post('/add',async(req,res) => {
    try{
        const requestData = req.body;
        const data = new todoModel(requestData);
        const savedData = await data.save();
        res.status(200).send("post successfull");
    }catch(err){
        res.status(404).send(err)
    }
})

//get all
router.get('/all',async(req,res) => {
    try{
        const data = await todoModel.find();
        res.status(200).send(data);
    }catch(err) {
        res.status(404).send(err);
    }
})

//update
router.put('/edit/:id',async(req,res) => {
    try{
        const id = req.params.id;
        const requestData = req.body;
        const data = await todoModel.findByIdAndUpdate(id, req.body);
        res.status(200).send("Updated Successfully");
    }catch(err) {
        console.log(err)
        res.status(404).send(err);
    }
})

// delete one
router.delete('/delete/:id',async(req,res) => {
    try{
        const id = req.params.id;
        console.log(id)
        const data = await todoModel.deleteOne({_id:id});
        console.log(data)
        res.status(200).send("deleted successfully");
    }catch(err){
        console.log(err)
        res.status(404).send(err)
    }
})


module.exports = router;