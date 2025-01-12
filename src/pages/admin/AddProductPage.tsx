import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PerfumeTypes } from '@/types/enums'
import {
  addNewPerfumeRequest,
  getPerfumeRequest,
  getProductImageRequest,
  updatePerfumeRequest,
  uploadProductImageRequest
} from '@/api'
import { getCategories } from '@/api/categories'
import { Category } from '@/types/entity/Category'
import useAuth from '@/hooks/contexts/useAuth'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { GetPerfumeDetailDTO } from '@/types/dto/perfumes/GetPerfumeDetailDTO'

const perfumeSchema = z.object({
  name: z.string().nonempty('Name is required'),
  brand: z.string().nonempty('Brand is required'),
  assetId: z.string().optional(),
  notes: z.string().nonempty('Notes is required'),
  type: z.string().nonempty('Type is required'),
  season: z.string().nonempty('Season is required'),
  sillage: z.string().nonempty('Sillage is required'),
  longevity: z.string().nonempty('Longevity is required'),
  gender: z.string().nonempty('Gender is required'),
  description: z.string().nonempty('Description is required'),
  serialNumber: z.number(),
  warrantyStatus: z.number(),
  distributorName: z.string().nonempty('Distributor name is required'),
  distributorContactPerson: z.string().nonempty('Distributor contact person is required'),
  distributorEmail: z.string().nonempty('Distributor email is required'),
  distributorPhone: z.string().nonempty('Distributor phone is required'),
  distributorAddress: z.string().nonempty('Distributor address is required'),
  categories: z.array(z.string()).nonempty('Categories is required'),
  variants: z.array(
    z.object({
      volume: z.number(),
      stock: z.number().nullable().optional().default(0),
      basePrice: z.number().nullable().optional().default(0),
      price: z.number().nullable().optional().default(0)
    })
  )
})

const AddProductPage = () => {
  const [asset, setAsset] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const { user } = useAuth()

  const { id } = useParams()
  const isEditMode = !!id

  const navigate = useNavigate()

  const perfumeForm = useForm<z.infer<typeof perfumeSchema>>({
    resolver: zodResolver(perfumeSchema),
    defaultValues: {
      name: '',
      brand: '',
      assetId: '',
      notes: '',
      type: '',
      season: '',
      sillage: '',
      longevity: '',
      gender: '',
      description: '',
      serialNumber: undefined,
      warrantyStatus: 1,
      distributorName: '',
      distributorContactPerson: '',
      distributorEmail: '',
      distributorPhone: '',
      distributorAddress: '',
      categories: [],
      variants: [
        {
          volume: 0,
          stock: 0,
          basePrice: 0,
          price: 0
        }
      ]
    }
  })

  const fetchPerfume = async () => {
    try {
      const response = await getPerfumeRequest(id ?? '')
      if (response.data.item) {
        const perfumeObj = {
          ...response.data.item,
          distributorName: response.data.item.distributor.name,
          distributorContactPerson: response.data.item.distributor.contactPerson,
          distributorEmail: response.data.item.distributor.email,
          distributorPhone: response.data.item.distributor.phone,
          distributorAddress: response.data.item.distributor.address,
          categories: response.data.item.categories.map((category: any) => category.id),
          notes: response.data.item.notes.join(',')
        }

        perfumeForm.reset(perfumeObj)
        setAsset(response.data.item.assetUrl)
      }
    } catch (error) {
      console.error('Error fetching perfume:', error)
    }
  }

  const fetchCategories = async () => {
    const response = await getCategories()
    setCategories(response.data.items) // Adjust based on your response structure
  }

  React.useEffect(() => {
    fetchCategories()
    fetchPerfume()
  }, [])

  const handleFormSubmit: SubmitHandler<z.infer<typeof perfumeSchema>> = async data => {
    const body = {
      ...data,
      distributor: {
        name: data.distributorName,
        contactPerson: data.distributorContactPerson,
        email: data.distributorEmail,
        phone: data.distributorPhone,
        address: data.distributorAddress
      },
      notes: data.notes.split(',').map(note => note.trim()),
      categories: data.categories.map(categoryId => ({ id: categoryId })),
      variants: data.variants.map(variant => ({
        volume: variant.volume,
        stock: variant?.stock ?? 0,
        basePrice: variant?.basePrice ?? 0,
        price: variant?.price ?? 0
      }))
    }

    if (isEditMode) {
      const response = await updatePerfumeRequest(id, body)
      navigate('/perfume/' + id)
    } else {
      const response = await addNewPerfumeRequest(body)
      navigate('/perfume/' + response.data.item.id)
    }
    try {
    } catch (error: any) {}
  }

  const handleUploadAssetId = async (file: File) => {
    try {
      const response = await uploadProductImageRequest(file)
      const assetId = response.data.fileId
      perfumeForm.setValue('assetId', assetId)

      const asset = await getProductImageRequest(assetId)
      setAsset(`${import.meta.env.VITE_API_URL}/productImage/${assetId}`)
    } catch (error: any) {}
  }

  return (
    <div className='mx-auto my-8 max-w-[1440px] bg-white rounded-lg border-2 p-4'>
      <h1 className='text-xl text-gray-900 font-semibold text-center my-4'>Add Product</h1>

      <Form {...perfumeForm} key={'perfumeForm'}>
        <form onSubmit={perfumeForm.handleSubmit(handleFormSubmit)}>
          <div className='grid grid-cols-1 gap-4 mb-4'>
            <FormField
              control={perfumeForm.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Name' {...field} type='text' disabled={user?.role !== 'product-manager'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='brand'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder='Brand' {...field} type='text' disabled={user?.role !== 'product-manager'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='assetId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Upload Asset ID'
                      type='file'
                      accept='.png, .jpg'
                      disabled={user?.role !== 'product-manager'}
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleUploadAssetId(file)
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {asset && (
              <div className='mt-4'>
                <h2 className='text-lg font-semibold'>Uploaded Asset:</h2>
                <img src={asset} alt='Uploaded Asset' className=' rounded-lg mt-2' />
              </div>
            )}
            <FormField
              control={perfumeForm.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Rose,Aud,Vanilla'
                      {...field}
                      type='text'
                      disabled={user?.role !== 'product-manager'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className=' block border rounded p-2'
                      disabled={user?.role !== 'product-manager'}
                    >
                      <option value=''>Select Type</option>
                      <option value={PerfumeTypes.EDP}>Eau de Parfum</option>
                      <option value={PerfumeTypes.EDT}>Eau de Toilette</option>
                      <option value={PerfumeTypes.PARFUM}>Perfume</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='season'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Season</FormLabel>
                  <FormControl>
                    <Input placeholder='Season' {...field} type='text' disabled={user?.role !== 'product-manager'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='sillage'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sillage</FormLabel>
                  <FormControl>
                    <Input placeholder='Sillage' {...field} type='text' disabled={user?.role !== 'product-manager'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='longevity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longevity</FormLabel>
                  <FormControl>
                    <Input placeholder='Longevity' {...field} type='text' disabled={user?.role !== 'product-manager'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input placeholder='Gender' {...field} type='text' disabled={user?.role !== 'product-manager'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Description'
                      {...field}
                      type='text'
                      disabled={user?.role !== 'product-manager'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='serialNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serial Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Serial Number'
                      {...field}
                      type='number'
                      onChange={e => {
                        const number = Number(e.target.value)
                        field.onChange({ target: { value: number } })
                      }}
                      disabled={user?.role !== 'product-manager'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='warrantyStatus'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty Status</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Warranty Status'
                      {...field}
                      type='number'
                      onChange={e => {
                        const number = Number(e.target.value)
                        field.onChange({ target: { value: number } })
                      }}
                      disabled={user?.role !== 'product-manager'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='distributorName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distributor Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Distributor Name'
                      {...field}
                      type='text'
                      disabled={user?.role !== 'product-manager'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='distributorContactPerson'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distributor Contact Person</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Distributor Contact Person'
                      {...field}
                      type='text'
                      disabled={user?.role !== 'product-manager'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='distributorEmail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distributor Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Distributor Email'
                      {...field}
                      type='email'
                      disabled={user?.role !== 'product-manager'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='distributorPhone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distributor Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Distributor Phone'
                      {...field}
                      type='text'
                      disabled={user?.role !== 'product-manager'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='distributorAddress'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distributor Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Distributor Address'
                      {...field}
                      type='text'
                      disabled={user?.role !== 'product-manager'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='categories'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <div className='flex flex-wrap'>
                      {categories.map(category => (
                        <div
                          key={category.id}
                          className={`border rounded p-2 m-1 cursor-pointer ${
                            field.value.includes(category.id) ? 'bg-blue-500 text-white' : 'bg-gray-200'
                          }`}
                          onClick={() => {
                            if (user?.role === 'product-manager') {
                              const newCategories = field.value.includes(category.id)
                                ? field.value.filter(id => id !== category.id)
                                : [...field.value, category.id]
                              field.onChange(newCategories)
                            }
                          }}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={perfumeForm.control}
              name='variants'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variants</FormLabel>
                  <div className='flex items-center'>
                    <p className='w-full'>Volume</p>
                    <p className='w-full'>Stock</p>
                    <p className='w-full'>Base Price</p>
                    <p className='w-full'>Price</p>
                    <Button type='button' className='bg-red-500 text-white opacity-0 cursor-default'>
                      Remove
                    </Button>
                  </div>
                  <FormControl>
                    <div className='flex flex-col'>
                      {field.value.map((variant, index) => (
                        <div key={index} className='flex items-center mb-2'>
                          <Input
                            placeholder='Volume'
                            type='number'
                            value={variant.volume || ''} // Assuming each variant has a volume property
                            onChange={e => {
                              const newVariants = [...field.value]
                              newVariants[index] = { ...newVariants[index], volume: Number.parseInt(e.target.value) }
                              field.onChange(newVariants)
                            }}
                            disabled={user?.role !== 'product-manager'}
                            className='mr-2'
                          />
                          <Input
                            placeholder='Stock'
                            type='number'
                            value={variant.stock || ''} // New stock field
                            onChange={e => {
                              const newVariants = [...field.value]
                              newVariants[index] = { ...newVariants[index], stock: Number(e.target.value) }
                              field.onChange(newVariants)
                            }}
                            className='mr-2'
                            disabled={user?.role !== 'product-manager'}
                          />
                          <Input
                            placeholder='Base Price'
                            type='number'
                            value={variant.basePrice || ''} // New base price field
                            onChange={e => {
                              const newVariants = [...field.value]
                              newVariants[index] = { ...newVariants[index], basePrice: Number(e.target.value) }
                              field.onChange(newVariants)
                            }}
                            className='mr-2'
                            disabled={user?.role !== 'sales-manager'}
                          />
                          <Input
                            placeholder='Price'
                            type='number'
                            value={variant.price || ''} // New price field
                            onChange={e => {
                              const newVariants = [...field.value]
                              newVariants[index] = { ...newVariants[index], price: Number(e.target.value) }
                              field.onChange(newVariants)
                            }}
                            className='mr-2'
                            disabled={user?.role !== 'sales-manager'}
                          />
                          <Button
                            type='button'
                            onClick={() => {
                              const newVariants = [...field.value]
                              newVariants.splice(index, 1) // Remove the variant
                              field.onChange(newVariants)
                            }}
                            className='bg-red-500 text-white'
                            disabled={user?.role !== 'product-manager'}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type='button'
                        onClick={() => {
                          const newVariants = [...field.value, { volume: 0, stock: 0, basePrice: 0, price: 0 }] // Add a new variant with empty fields
                          field.onChange(newVariants)
                        }}
                        disabled={user?.role !== 'product-manager'}
                        className='bg-green-500 text-white'
                      >
                        Add Variant
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-full'>
            Save
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AddProductPage
