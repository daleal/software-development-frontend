import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/api'
import type { ToolListing } from '@/types/entities/toolListing'

export interface ToolListingsState {
  loading: boolean
  listings: Array<ToolListing>
}

const initialState: ToolListingsState = {
  loading: false,
  listings: [],
}

export const loadToolListings = createAsyncThunk('toolListings/load', async () => {
  const toolListings = await api.toolListings.list()
  return toolListings
})

export const loadToolListing = createAsyncThunk('toolListings/loadById', async (id: number) => {
  const toolListing = await api.toolListings.get(id)
  return toolListing
})

export const toolListingsSlice = createSlice({
  name: 'toolListings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // list
    builder.addCase(loadToolListings.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loadToolListings.fulfilled, (state, action) => {
      state.loading = false
      state.listings = [...action.payload]
    })
    // get
    builder.addCase(loadToolListing.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loadToolListing.fulfilled, (state, action) => {
      state.loading = false
    })
  }
})

export const toolListingsReducer = toolListingsSlice.reducer