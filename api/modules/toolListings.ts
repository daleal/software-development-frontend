import client from '@/api/client'
import type { ToolListing } from '@/types/entities/toolListing'
import type { PastToolListing } from '@/types/entities/pastToolListing'
import type { Review } from '@/types/entities/review'

export const listMine = async (): Promise<Array<ToolListing>> => {
  const response = await client.get('/api/tool-listings/mine')
  return response.data
}

export const list = async (): Promise<Array<ToolListing>> => {
  const response = await client.get("/api/tool-listings/")
  return response.data
}

export const get = async (id: number): Promise<ToolListing> => {
  const response = await client.get(`/api/tool-listings/${id}/`)
  return response.data
}

export const create = async (
  name: string,
  description: string,
  image: string,
  price?: number,
): Promise<ToolListing> => {
  const response = await client.post('/api/tool-listings/', {
    name,
    description,
    image,
    price,
  })
  return response.data
}

export const rent = async (id: number): Promise<ToolListing> => {
  const response = await client.patch(`/api/tool-listings/${id}/rent/`)
  return response.data
}

export const unrent = async (id: number): Promise<ToolListing> => {
  const response = await client.patch(`/api/tool-listings/${id}/unrent/`)
  return response.data
}

export const remove = async (id: number): Promise<ToolListing> => {
  const response = await client.delete(`/api/tool-listings/${id}`)
  return response.data
}

// Tools I've rented
export const listMyRentals = async (): Promise<Array<PastToolListing>> => {
  const response = await client.get(`/api/tool-listings/my-rentals`)
  return response.data
}

// Tools I've listed and been rented
export const listMyRentedTools = async (): Promise<Array<PastToolListing>> => {
  const response = await client.get(`/api/tool-listings/my-rented-tools`)
  return response.data
}

export const listReviews = async (): Promise<Array<Review>> => {
  const response = await client.get(`/api/reviews`)
  return response.data
}

export const createReview = async (
  listing: number,
  score: number,
  description: string,
): Promise<Review> => {
  const response = await client.post('/api/reviews/', {
    listing,
    score,
    description,
  })
  return response.data
}
