import client from '@/api/client'

export const create = async (username: string, phoneNumber: string, password: string) => {
  const response = await client.post('/auth/users/', { username, phoneNumber, password })
  return response.data
}

export const get = async () => {
  const response = await client.get('/auth/users/me/')
  return response.data
}

export const getById = async (id: number) => {
  const response = await client.get(`/auth/users/${id}/`)
  return response.data
}
