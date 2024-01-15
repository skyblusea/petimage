import { AlbumItem } from "./page/create/[animal]/upload/page";

export interface Breed {
  _id: string;
  name: string;
  class: string;
  code: string;
  img: string;
  createdAt: string;
  updatedAt: string;
}


export interface Payment {
  _id: string;
  totalAmount: number;
  method: string;
  orderId: string;
  orderName: string;
  country: string;
  receipt: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface AlbumItem {
  _id: string;
  themeName: string;
  inputFiles: string[];
  outputFiles: string[];
  userId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}