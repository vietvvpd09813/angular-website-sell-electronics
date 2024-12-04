const { where } = require("sequelize");
const { Category } = require("../models")

const getAllCategories = async () => {
    try {
        const categories = await Category.findAll()        
        return categories;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
}

const getCategory = async (id) => {
    try {
        const category = await Category.findOne({where: {id}});
        return category;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

const createCategory = async ({name,image}) => {
    try {
        const result = await Category.create({name,image})
        
        
        return result;
    } catch (error) {
        console.error("Error create categories", error)
        throw error;
    }
}

const updateCategory = async (data, id) => {
    try {
        const result = await Category.update(data, {where: {id}})
        console.log('oahfdojasdnfojsdanfoads',result);
        
        return result
    } catch (error) {
        console.error("Error update categories", error)
        throw error;
    }
}

const deleteCategory = async (id) => {
    try {
        await Category.destroy({where: {id}})
    } catch (error) {
        console.error("Error update categories", error)
        throw error;
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
}