import client from '@/api/client'
import type { ToolListing } from '@/types/entities/toolListing'

export const list = async (): Promise<Array<ToolListing>> => {
  const response = await client.get('/api/tool-listings/')
  return response.data
}

export const get = async (id: number): Promise<ToolListing> => {
  const response = await client.get(`/api/tool-listings/${id}/`)
  return response.data
}

export const create = async (
  name: string,
  description: string,
  price: number,
  image: string,
): Promise<ToolListing> => {
  const response = await client.post('/api/tool-listings/', {
    name,
    description,
    price,
    image ,
  })
  return response.data
}
