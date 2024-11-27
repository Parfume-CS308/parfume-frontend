import { SortOptions } from '@/types/enums'

const getSortOptionName = (sortType: SortOptions): string => {
  switch (sortType) {
    case SortOptions.BEST_SELLER:
      return 'Best Seller'
    case SortOptions.PRICE_ASC:
      return 'Price: Low to High'
    case SortOptions.PRICE_DESC:
      return 'Price: High to Low'
    case SortOptions.RATING:
      return 'Rating'
    case SortOptions.NAME_ASC:
      return 'Name: A to Z'
    case SortOptions.NAME_DESC:
      return 'Name: Z to A'
    case SortOptions.NEWEST:
      return 'Newest'
    case SortOptions.OLDEST:
      return 'Oldest'
    default:
      return ''
  }
}

export { getSortOptionName }
