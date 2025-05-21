const asyncHandler = require('express-async-handler')

const List = require('../models/listmodel')

const getList = asyncHandler(async (req, res) => {
    const list = await List.find()
    res.status(200).json(list)
})

const setList = asyncHandler(async (req, res) => {
   if (!req.body.text){
     res.status(400)
     throw new Error('please add a test field')
   }

   const list = await List.create({
    text:req.body.text,
   })
    res.status(200).json(list)
})

const updateList = asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id)

    if (!list){
        res.status(400)
        throw new Error('List not found')
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

    await list.deleteOne()
   res.status(200).json({ id : req.params.id})
})

module.exports = {
    getList,
    setList,
    updateList,
    deleteList,
}