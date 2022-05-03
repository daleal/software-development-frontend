import client from '@/api/client'
import { APITokenCreation, APITokenRefresh } from '@/types/entities/tokens'

export const create = async (username: string, password: string): Promise<APITokenCreation> => {
  const response = await client.post('/auth/jwt/create/', { username, password })
  return response.data
}

export const refresh = async (refresh: string): Promise<APITokenRefresh> => {
  const response = await client.post('/auth/jwt/refresh/', { refresh })
  return response.data
}

export const verify = async (token: string): Promise<void> => {
  await client.post('/auth/jwt/verify/', { token })
}
