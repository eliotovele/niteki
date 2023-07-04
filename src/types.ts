export type PRODUCT = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  amount: number;
};

export type STOCK = {
  id: number;
  amount: number;
};

export type CartContextData = {
  cart: PRODUCT[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
  addButtonStatus: object;
};

export interface UpdateProductAmount {
  productId: number;
  amount: number;
}
