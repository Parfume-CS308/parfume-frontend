export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  age: number
  gender: USER_GENDER
  role: USER_ROLE
}

export enum USER_GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum USER_ROLE {
  CUSTOMER = 'customer',
  SALES_MANAGER = 'sales-manager',
  PRODUCT_MANAGER = 'product-manager'
}
