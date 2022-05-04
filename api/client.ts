import axios, { AxiosRequestTransformer, AxiosResponseTransformer } from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { BASE_API_HOST } from '@/constants/api'

const client = axios.create({
  baseURL: BASE_API_HOST,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
    (data) => camelizeKeys(data),
  ],
  transformRequest: [
    (data) => decamelizeKeys(data),
    ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
  ],
})

client.interceptors.request.use((config) => {
  const { params, ...noParamsConfig } = config
  return { ...noParamsConfig, params: decamelizeKeys(params) }
})

export default client
