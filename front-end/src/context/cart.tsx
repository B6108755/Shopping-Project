import { createContext, useContext, useEffect, useState } from "react";
import { baseURL } from "../api/api";

const CartContext = createContext<any>({});

interface IproductCart {
  productname: string;
  price: number;
  quantily: number;
}

const CartProvider = ({ children }: { children: JSX.Element }) => {
  let productProvider: any = [];
  const [quantilyCart, setQuantityCart] = useState<any>(0);
  const [numberTotal, setNumberTotal] = useState<number>(0);
  const [zero, setZero] = useState<boolean>(false);
  
  useEffect(() => {
    console.log("log::", productProvider);
  }, [productProvider]);

  const clear = async () => {
    await productProvider.map((item: any, index: any) => {
      delete productProvider[index];
    });
    setZero(!zero);
  };

  return (
    <CartContext.Provider
      value={{
        productProvider,
        quantilyCart,
        setQuantityCart,
        numberTotal,
        setNumberTotal,
        clear,
        zero,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;
