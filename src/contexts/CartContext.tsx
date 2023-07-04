import { createContext, ReactNode, useState } from 'react';
import { productStock } from '../services/stock';
import { CartContextData, PRODUCT, UpdateProductAmount } from '../types';
import { products } from '../services/data';
import { toast } from 'react-toastify';

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextData>(
  {} as CartContextData
);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<PRODUCT[]>(() => {
    const storagedCart = localStorage.getItem('@niteki:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });
  const [addButtonStatus, setAddButtonStatus] = useState({});

  const setAddButtonDisabled = (productId: number, isDisabled: boolean) => {
    setAddButtonStatus(prevStatus => ({
      ...prevStatus,
      [productId]: isDisabled
    }));
  };

  const addProduct = async (productId: number) => {
    try {
      const actualProduct = cart.find(product => product.id === productId);

      if (!actualProduct) {
        const product = products.find(product => product.id === productId);

        setCart([
          ...cart,
          {
            ...product!,
            amount: 1
          }
        ]);
        localStorage.setItem(
          '@niteki:cart',
          JSON.stringify([
            ...cart,
            {
              ...product,
              amount: 1
            }
          ])
        );
      } else {
        updateProductAmount({
          productId,
          amount: actualProduct.amount + 1
        });
      }
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const actualProduct = cart.find(product => product.id === productId);
      const newCart = cart.filter(product => product.id !== actualProduct?.id);

      setCart([...newCart]);
      localStorage.setItem('@niteki:cart', JSON.stringify([...newCart]));
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount
  }: UpdateProductAmount) => {
    try {
      const actualCart = cart;
      const actualProductIndex = actualCart.findIndex(
        product => product.id === productId
      );
      const actualProduct = actualCart[actualProductIndex];

      if (actualProductIndex === -1) {
        throw new Error();
      }

      if (amount > actualProduct.amount) {
        const stock = productStock.find(stock => stock.id === productId);

        if (actualProduct.amount + 1 <= stock?.amount!) {
          actualProduct.amount += 1;
          setCart([...actualCart]);
          localStorage.setItem('@niteki:cart', JSON.stringify([...actualCart]));
        } else {
          toast.error('Quantidade solicitada fora de estoque');

          setAddButtonDisabled(productId, true);
        }
      } else {
        setAddButtonDisabled(productId, false);

        if (actualProduct?.amount! - 1 === 0) {
          throw new Error();
        } else {
          actualProduct.amount -= 1;
          setCart([...actualCart]);
          localStorage.setItem('@niteki:cart', JSON.stringify([...actualCart]));
        }
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updateProductAmount,
        addButtonStatus
      }}>
      {children}
    </CartContext.Provider>
  );
}
