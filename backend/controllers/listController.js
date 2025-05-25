const asyncHandler = require('express-async-handler')

const List = require('../models/listModel')
const User = require('../models/userModel')

const getLists = asyncHandler(async (req, res) => {
    const lists = await List.find({user: req.user.id})
    res.status(200).json(lists)
})

const setList = asyncHandler(async (req, res) => {
   if (!req.body.text){
     res.status(400)
     throw new Error('please add a test field')
   }

   const lists = await List.create({
    text: req.body.text,
    user: req.user.id,
   })
    res.status(200).json(lists)
})

const updateList = asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id)

    if (!lists){
        res.status(400)
        throw new Error('List not found')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    if(lists.user.toString() !== req.user.id){
     res.status(401)
     throw new Error('User not authorized')   
    }

    const updatedList = await List.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
    })

     res.status(200).json(updatedList)
})

const deleteList = asyncHandler(async (req, res) => {
     const lists = await List.findById(req.params.id)

    if (!lists){
        res.status(400)
        throw new Error('List not found')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    if(lists.user.toString() !== req.user.id){
     res.status(401)
     throw new Error('User not authorized')   
    }
    await lists.deleteOne()

    res.status(200).json({ id : req.params.id})
})

module.exports = {
    getLists,
    setList,
    updateList,
    deleteList,
}
