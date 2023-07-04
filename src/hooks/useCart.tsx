import { useContext } from 'react';
import { CartContextData } from '../types';
import { CartContext } from '../contexts/CartContext';

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
