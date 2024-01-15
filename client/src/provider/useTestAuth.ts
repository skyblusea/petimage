import { useContext } from "react";
import { TestContext } from "./testProvider";

export const useTestAuth = () => {
  return useContext(TestContext);
};



