import React, { useEffect, useState } from 'react'
import { getCategories } from '@/api/categories'
import { Category } from '@/types/entity/Category'
import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Dialog
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button' // Assuming you have a Button component
import { createCategoryRequest, deleteCategoryRequest } from '@/api'
import { AddCategoryDTO } from '@/types/dto/category/AddCategoryDTO'
import useToast from '@/hooks/contexts/useToast'

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', description: '' })
  const { addToast } = useToast()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const response = await getCategories()
    setCategories(response.data.items) // Adjust based on your response structure
  }
  const handleDelete = async (id: string) => {
    // Implement delete category logic here
    try {
      const response = await deleteCategoryRequest(id)
      const updatedCategories = categories.filter(category => category.id !== id)
      setCategories(updatedCategories)
    } catch (error) {
      addToast('destructive', 'Error deleting category')
    }
  }

  const handleAddCategory = async () => {
    try {
      const addCategoryDTO: AddCategoryDTO = {
        name: newCategory.name,
        description: newCategory.description,
        active: true
      }
      const response = await createCategoryRequest(addCategoryDTO)
      fetchCategories()
    } catch (error) {
      console.error('Error adding category', error)
    } finally {
      setIsDialogOpen(false)
      setNewCategory({ name: '', description: '' })
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='p-4 mt-8 max-w-[1440px] w-full'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold mb-4'>Categories</h1>
          <Button onClick={() => setIsDialogOpen(true)} className='mb-4'>
            Add Category
          </Button>
        </div>
        <ul className='space-y-4'>
          {categories.map(category => (
            <li
              key={category.id}
              className='bg-white border border-gray-300 rounded-lg shadow-md p-4 flex justify-between items-center'
            >
              <div>
                <h2 className='text-lg font-semibold'>{category.name}</h2>
                <p className='text-sm text-gray-600'>{category.description}</p>
              </div>
              <Button onClick={() => handleDelete(category.id)} className='ml-4'>
                Delete
              </Button>
            </li>
          ))}
        </ul>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Enter the details of the new category.</DialogDescription>
            </DialogHeader>
            <input
              type='text'
              placeholder='Category Name'
              value={newCategory.name}
              onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
              className='border border-gray-300 rounded-md p-2 mb-2 w-full'
            />
            <input
              type='text'
              placeholder='Description'
              value={newCategory.description}
              onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
              className='border border-gray-300 rounded-md p-2 mb-4 w-full'
            />
            <DialogFooter>
              <Button onClick={handleAddCategory}>Add</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default CategoriesPage
