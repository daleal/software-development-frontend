import client from '@/api/client'

export const create = async (username: string, password: string) => {
  const response = await client.post('/auth/users/', { username, password })
  return response.data
}

export const get = async () => {
  const response = await client.get('/auth/users/me/')
  return response.data
}
