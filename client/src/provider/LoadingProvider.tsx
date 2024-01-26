import Backdrop from '@mui/material/Backdrop';
import Loading from '../components/Loading';
import { createContext, useState } from 'react';

export type LoadingContextType = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialContextState: LoadingContextType = {
  setIsLoading: () => {},
};

export const LoadingContext = createContext<LoadingContextType>(initialContextState);



export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      <Backdrop sx={{ zIndex: '1000' }} open={isLoading}>
        <Loading />
      </Backdrop>
      {children}
    </LoadingContext.Provider>
  )
}