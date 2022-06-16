import client from "@/api/client";
import type { ToolListing } from "@/types/entities/toolListing";
import type { PastToolListing } from "@/types/entities/pastToolListing";


export const listMine = async (): Promise<Array<ToolListing>> => {
  const response = await client.get("/api/tool-listings/mine");
  return response.data;
};

export const list = async (): Promise<Array<ToolListing>> => {
  const response = await client.get("/api/tool-listings/");
  return response.data;
};

export const get = async (id: number): Promise<ToolListing> => {
  const response = await client.get(`/api/tool-listings/${id}/`);
  return response.data;
};

export const create = async (
  name: string,
  description: string,
  price: number,
  image: string
): Promise<ToolListing> => {
  const response = await client.post("/api/tool-listings/", {
    name,
    description,
    price,
    image: { created: null, file: image },
  });
  return response.data;
};

export const rent = async (id: number): Promise<ToolListing> => {
  const response = await client.patch(`/api/tool-listings/${id}/rent/`);
  return response.data;
};

export const unrent = async (id: number): Promise<ToolListing> => {
  const response = await client.patch(`/api/tool-listings/${id}/unrent/`);
  return response.data;
};

export const remove = async (id: number): Promise<ToolListing> => {
  const response = await client.delete(`/api/tool-listings/${id}`);
  return response.data;
};

export const listMyRentals = async (): Promise<PastToolListing> => {
  const response = await client.get(`/api/tool-listings/my-rentals`);
  return response.data;
};

export const listMyRentedTools = async (): Promise<PastToolListing> => {
  const response = await client.get(`/api/tool-listings/rented-tools`);
  return response.data;
};
