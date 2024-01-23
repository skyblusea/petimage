import { createContext, useState } from "react"
import { PaymentDetails, AlbumDetails } from "../types"



interface OrderContextType  {
  albumDetails : AlbumDetails | null,
  setAlbumDetails : (albumDetails : AlbumDetails) => void
}

const initialContextState : OrderContextType = {
  albumDetails : null,
  setAlbumDetails : () => {}
}


export const PaymentContext = createContext<OrderContextType>(initialContextState)

export default function PaymentProvider({children} : {children : React.ReactNode}) {
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails | null>(null)
  const context = {
    albumDetails,
    setAlbumDetails
  }  

  return (
    <PaymentContext.Provider value={context}>
      {children}
    </PaymentContext.Provider>
  )
}