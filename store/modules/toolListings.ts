import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "@/api";
import type { ToolListing } from "@/types/entities/toolListing";

export interface ToolListingsState {
  loading: boolean;
  listings: Array<ToolListing>;
}

const initialState: ToolListingsState = {
  loading: false,
  listings: [],
};

export const loadMyToolListings = createAsyncThunk(
  "toolListings/loadMine",
  async () => {
    const toolListings = await api.toolListings.listMine();
    return toolListings;
  }
);

export const loadToolListings = createAsyncThunk(
  "toolListings/load",
  async () => {
    const toolListings = await api.toolListings.list();
    return toolListings;
  }
);

export const loadToolListing = createAsyncThunk(
  "toolListings/loadById",
  async (id: number) => {
    const toolListing = await api.toolListings.get(id);
    return toolListing;
  }
);

export const createToolListing = createAsyncThunk(
  "toolListings/create",
  async (config: {
    name: string;
    description: string;
    price: number;
    image: string;
  }) => {
    const toolListing = await api.toolListings.create(
      config.name,
      config.description,
      config.price,
      config.image
    );
    return toolListing;
  }
);

export const removeToolListing = createAsyncThunk(
  "toolListings/remove",
  async (id: number) => {
    const toolListing = await api.toolListings.remove(id);
    return toolListing;
  }
);

export const rentToolListing = createAsyncThunk(
  "toolListings/rent",
  async (id: number) => {
    const toolListing = await api.toolListings.rent(id);
    return toolListing;
  }
);

export const unrentToolListing = createAsyncThunk(
  "toolListings/unrent",
  async (id: number) => {
    const toolListing = await api.toolListings.unrent(id);
    return toolListing;
  }
);

// Tools I've rented
export const loadMyRentals = createAsyncThunk(
  "toolListings/loadMyRentals",
  async () => {
    const pastToolListings = await api.toolListings.listMyRentals()
    return pastToolListings
  }
);

// Tools I've listed and been rented
export const loadMyRentedTools = createAsyncThunk(
  "toolListings/loadMyRentedTools",
  async () => {
    const pastToolListings = await api.toolListings.listMyRentedTools()
    return pastToolListings
  }
);

export const toolListingsSlice = createSlice({
  name: "toolListings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // list
    builder.addCase(loadToolListings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadToolListings.fulfilled, (state, action) => {
      state.loading = false;
      state.listings = [...action.payload];
    });
    // get
    builder.addCase(loadToolListing.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadToolListing.fulfilled, (state) => {
      state.loading = false;
    });
    // create
    builder.addCase(createToolListing.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createToolListing.fulfilled, (state) => {
      state.loading = false;
    });
    // delete
    builder.addCase(removeToolListing.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeToolListing.fulfilled, (state) => {
      state.loading = false;
    });
    // rent
    builder.addCase(rentToolListing.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(rentToolListing.fulfilled, (state) => {
      state.loading = false;
    });
    // unrent
    builder.addCase(unrentToolListing.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(unrentToolListing.fulfilled, (state) => {
      state.loading = false;
    });
    // my tools
    builder.addCase(loadMyToolListings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadMyToolListings.fulfilled, (state) => {
      state.loading = false;
    });
    // my rentals
    builder.addCase(loadMyRentals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadMyRentals.fulfilled, (state) => {
      state.loading = false;
    });
    // my rented tools
    builder.addCase(loadMyRentedTools.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadMyRentedTools.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const toolListingsReducer = toolListingsSlice.reducer;
