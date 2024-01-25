export interface Breed {
  _id: string;
  name: string;
  class: string;
  code: string;
  img: string;
  createdAt: string;
  updatedAt: string;
}


export type Payment = {
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


export interface PaymentDetails {
  orderId : string 
  orderName : string
  customerName :  string 
  customerEmail : string 
  amount: number
}

export type RedirectDate = {
  orderId: string | null;
  amount: string | null;
  paymentKey: string | null;
}

export interface AlbumDetails {
  theme : {
    themeId: string;
    amount: number;
    name: string;
    price: string;
  }
  animalCode : string | undefined;
  inputFiles : string[] | null;
}

export type AlbumItem = {
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

export type Theme = {
  _id: string;
  name: string;
  desc: string;
  prompt: string[];
  background: string;
  tag: string;
  type: string;
  price: string;
  popular: number;
  amount: number;
  sample: string[];
  trial: string[];
  createdAt: string;
  updatedAt: string;
  category: string[];
}


//context
export type User = {
  id: string;
  email: string;
  name: string;
}

export type Token = {
  access: string | null;
  refresh: string | null;
}

//upload
export interface FileWithUrl {
  file: File,
  imgUrl: string,
  isValid?: boolean
}
