export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  age: number
  gender: USER_GENDER
  role: string
}

export enum USER_GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}
