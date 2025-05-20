const asyncHandler = require('express-async-handler')

const getList = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get list'})
})

const setList = asyncHandler(async (req, res) => {
   if (!req.body.text){
     res.status(400)
     throw new Error('please add a test field')
   }

    res.status(200).json({ message: 'Set list'})
})

const updateList = asyncHandler(async (req, res) => {
     res.status(200).json({ message: `update list ${req.params.id}`})
})

const deleteList = asyncHandler(async (req, res) => {
   res.status(200).json({ message: `Delete list ${req.params.id}`})
})

module.exports = {
    getList,
    setList,
    updateList,
    deleteList,
}