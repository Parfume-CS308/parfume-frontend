import React, { useState } from 'react'
import { GetPerfumeDetailDTO } from '@/types/dto/perfumes/GetPerfumeDetailDTO'
import { getPerfumeRequest } from '@/api'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './ProductPage.module.css'
import { Button } from '@/components/ui/button'

const ProductPage = () => {
  const [perfume, setPerfume] = useState<GetPerfumeDetailDTO | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  React.useEffect(() => {
    fetchPerfume()
  }, [])

  const fetchPerfume = async () => {
    try {
      const id = location.pathname.split('/').pop() ?? ''
      const response = await getPerfumeRequest(id)
      setPerfume(response.data.item)
    } catch (error) {
      console.error('Error fetching perfume:', error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className='flex items-center justify-between'>
          <h1 className={styles.title}>{perfume?.name}</h1>
          <Button className={styles.editButton} onClick={() => navigate(`/add-product/${perfume?.id}`)}>
            Edit
          </Button>
        </div>
        <div className='flex items-center justify-center'>
          <img src={perfume?.assetUrl} alt={perfume?.name} className={styles.perfumeImage} />
        </div>
        <p className={styles.brand}>Brand: {perfume?.brand}</p>
        <p className={styles.description}>Description: {perfume?.description}</p>
        <p className={styles.rating}>Average Rating: {perfume?.averageRating}</p>
        <p className={styles.reviewCount}>Review Count: {perfume?.reviewCount}</p>
        {perfume?.activeDiscount && <p className={styles.discount}>Active Discount: {perfume?.activeDiscount.rate}%</p>}
        <p className={styles.notes}>Fragrance Notes: {perfume?.notes.join(', ')}</p>
        <p className={styles.type}>Type: {perfume?.type}</p>
        <p className={styles.season}>Season: {perfume?.season}</p>
        <p className={styles.sillage}>Sillage: {perfume?.sillage}</p>
        <p className={styles.longevity}>Longevity: {perfume?.longevity}</p>
        <p className={styles.gender}>Gender: {perfume?.gender}</p>
        <p className={styles.serialNumber}>Serial Number: {perfume?.serialNumber}</p>
        <p className={styles.warrantyStatus}>Warranty Status: {perfume?.warrantyStatus}</p>
        <h3 className={styles.distributorTitle}>Distributor Information</h3>
        <p>Name: {perfume?.distributor.name}</p>
        <p>Contact Person: {perfume?.distributor.contactPerson}</p>
        <p>Email: {perfume?.distributor.email}</p>
        <p>Phone: {perfume?.distributor.phone}</p>
        <p>Address: {perfume?.distributor.address}</p>
        <h3 className={styles.categoriesTitle}>Categories</h3>
        <ul className={styles.categoriesList}>
          {perfume?.categories.map(category => (
            <li key={category.id} className={styles.categoryItem}>
              {category.name}: {category.description}
            </li>
          ))}
        </ul>
        <h3 className={styles.variantsTitle}>Variants</h3>
        <table className={styles.variantsTable}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Volume (ml)</th>
              <th>Price ($)</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {perfume?.variants.map(variant => (
              <tr key={variant.volume}>
                <td>{variant.active ? 'Active' : 'Inactive'}</td>
                <td>{variant.volume}</td>
                <td>{variant.price}</td>
                <td>{variant.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductPage
