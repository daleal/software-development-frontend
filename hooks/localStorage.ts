import { useState } from 'react'
import { Nullable } from '@/types/common'

export const useLocalStorage = (key: string): [Nullable<string>, (value: Nullable<string>) => void] => {
  const initialValue = typeof window === 'undefined' ? null : localStorage.getItem(key)

  const [value, setValue] = useState<Nullable<string>>(initialValue)

  const setStoreValue = (value: Nullable<string>) => {
    if (value === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, value)
    }
    setValue(value)
  }

  return [value, setStoreValue]
}
