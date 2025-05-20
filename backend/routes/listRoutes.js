const express= require('express')
const router = express.Router()
const {
    getList,
    setList, 
    updateList, 
     eleteList,
     deleteList
} = require('../controllers/listController')


router.route('/').get(getList).post(setList)
router.route('/:id').delete(deleteList).put(updateList)

module.exports=router