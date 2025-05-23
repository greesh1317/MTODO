const asyncHandler = require('express-async-handler')

const List = require('../models/listModel')
const User = require('../models/userModel')

const getList = asyncHandler(async (req, res) => {
    const list = await List.find({user: req.user.id})
    res.status(200).json(list)
})

const setList = asyncHandler(async (req, res) => {
   if (!req.body.text){
     res.status(400)
     throw new Error('please add a test field')
   }

   const list = await List.create({
    text: req.body.text,
    user: req.user.id,
   })
    res.status(200).json(list)
})

const updateList = asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id)

    if (!list){
        res.status(400)
        throw new Error('List not found')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if(global.user.toString() !== user.id){
     res.status(401)
     throw new Error('User not authorized')   
    }

    const updatedList = await List.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
    })

     res.status(200).json(updatedList)
})

const deleteList = asyncHandler(async (req, res) => {
     const list = await List.findById(req.params.id)

    if (!list){
        res.status(400)
        throw new Error('List not found')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if(global.user.toString() !== user.id){
     res.status(401)
     throw new Error('User not authorized')   
    }
    await list.deleteOne()

    res.status(200).json({ id : req.params.id})
})

module.exports = {
    getList,
    setList,
    updateList,
    deleteList,
}
