export type Review = {
  id: string
  comment: string
  isApproved: boolean
  user: string
  createdAt: string
  approvedAt: string
}

export interface ReviewExtended extends Review {
  perfumeName: string
}
