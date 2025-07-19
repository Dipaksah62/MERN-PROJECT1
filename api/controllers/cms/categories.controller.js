const { errorMessage, notFoundError } = require("@/library/functions")
const { Category } = require("@/models")

class CategoriesController {
    index = async (req, res, next) => {
        try {
            const categories = await Category.find()

            res.send(categories)
        } catch(error) {
            errorMessage(next, error)
        }
    }
    
    create = async (req, res, next) => {
        try {
            const { name, status } = req.body

            await Category.create({ name, status })

            res.status(201).send({
                message: 'Category added.'
            })
        } catch (error) {
            errorMessage(next, error)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const {id} = req.params

            const category = await Category.findById(id)

            if(category) {
                res.send(category)
            } else {
                notFoundError(next, 'Category')
            }
        } catch(error) {
            errorMessage(next, error)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { id } = req.params

            const category = await Category.findById(id)

            if (category) {
                const { name, status } = req.body

                await Category.findByIdAndUpdate(id, { name, status }, { runValidators: true })

                res.send({
                    message: 'Category updated.'
                })
            } else {
                notFoundError(next, 'Category')
            }
        } catch (error) {
            errorMessage(next, error)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            const category = await Category.findById(id)

            if (category) {
                await Category.findByIdAndDelete(id)

                res.send({
                    message: 'Category deleted.'
                })
            } else {
                notFoundError(next, 'Category')
            }
        } catch (error) {
            errorMessage(next, error)
        }
    }
}

module.exports = new CategoriesController