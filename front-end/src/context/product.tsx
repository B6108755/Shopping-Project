import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext<any>({});

const ProductProvider = ({ children }: { children: JSX.Element }) => {
  const [pro, setPro] = useState<any[]>([]);

  return (
    <ProductContext.Provider value={{ pro, setPro }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
export default ProductProvider;
