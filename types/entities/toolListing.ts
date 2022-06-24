import { Status } from '../api/status'

export interface ToolListing {
  id: number;
  name: string;
  publisher: number;
  image: string;
  price: number;
  status: Status;
  phoneNumber: string;
  description: string;
}
