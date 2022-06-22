import client from '@/api/client'
import type { ToolListing } from '@/types/entities/toolListing'

export const listMine = async (): Promise<Array<ToolListing>> => {
  const response = await client.get('/api/tool-listings/mine');
  return response.data;
}

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

export const remove = async (
  id: number,
): Promise<ToolListing> => {
  const response = await client.delete(`/api/tool-listings/${id}`)
  return response.data
}
