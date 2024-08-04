const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include:[{model:Product}]
    })
    res.status(200).json(categoryData)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = await Category.findByPk(req.params.id,{
      include:[{model:Product}]
    })
    if (!categoryId) {
      return res.status(404).json({message:"couldn't find what you were looking got"})
    }
    res.status(200).json(categoryId)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body)
    res.status(200).json(createCategory)  
  } catch (error) {
    res.status(500).json(error)
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
   const categoryId = await Category.update(req.body,{
    where:{
      id:req.params.id
    }
   }) 
   res.status(200).json(categoryId)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where:{
        id:req.params.id
      }
    })
    res.status(200).json({message:`${deleteCategory} category deleted`})
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
