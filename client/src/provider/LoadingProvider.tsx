import Backdrop from '@mui/material/Backdrop';
import Loading from '../components/Loading';
import { createContext, useState } from 'react';

type LoadingContextType = {
  setIsLoading: (isLoading: boolean) => void;
}

const initialContextState: LoadingContextType = {
  setIsLoading: () => { },
};

export const LoadingContext = createContext<LoadingContextType>(initialContextState);



export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {isLoading &&
        <Backdrop sx={{ zIndex: '1000' }} open={true}>
          <Loading />
        </Backdrop>
      }
      {children}
    </LoadingContext.Provider>
  )
}