import { AddCircle, Delete, RemoveCircle } from '@mui/icons-material';
import {
  Box,
  IconButton,
  TableCell,
  TextField,
  Typography
} from '@mui/material';
import { useCart } from '../hooks/useCart';
import { PRODUCT } from '../types';

type CartProductCardItemProps = {
  product: PRODUCT & {
    priceFormatted: string | undefined;
    subTotal: string | undefined;
  };
};

export function CartProductCardItem({ product }: CartProductCardItemProps) {
  const { removeProduct, updateProductAmount, addButtonStatus } = useCart();

  function handleProductIncrement(product: PRODUCT) {
    updateProductAmount({
      productId: product.id,
      amount: product.amount + 1
    });
  }

  function handleProductDecrement(product: PRODUCT) {
    updateProductAmount({
      productId: product.id,
      amount: product.amount - 1
    });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }


  return (
    <tr
      key={product.id}
      data-testid='product'>
      <TableCell sx={{ padding: '12px', borderBottom: '1px solid #eee' }}>
        <Box
          component='img'
          sx={{ height: '100px', width: '100px' }}
          src={product.image}
          alt={product.title}
        />
      </TableCell>

      <TableCell sx={{ padding: '12px', borderBottom: '1px solid #eee' }}>
        <Typography
          component='strong'
          display='block'
          fontWeight='bold'
          color='#333'>
          {product.title}
        </Typography>
        <Typography
          fontWeight='bold'
          fontSize={18}
          display='block'>
          {product.priceFormatted}
        </Typography>
      </TableCell>
      <TableCell sx={{ padding: '12px', borderBottom: '1px solid #eee' }}>
        <div>
          <IconButton
            type='button'
            data-testid='decrement-product'
            disabled={product.amount <= 1}
            onClick={() => handleProductDecrement(product)}>
            <RemoveCircle width={20} />
          </IconButton>

          <TextField
            sx={{ width: '50px', height: '50px' }}
            type='text'
            data-testid='product-amount'
            value={product.amount}
          />

          <IconButton
            // @ts-ignore
            disabled={addButtonStatus && addButtonStatus[product.id]}
            type='button'
            data-testid='increment-product'
            onClick={() => handleProductIncrement(product)}>
            <AddCircle width={20} />
          </IconButton>
        </div>
      </TableCell>
      <td>
        <strong>{product.subTotal}</strong>
      </td>
      <td>
        <IconButton
          type='button'
          data-testid='remove-product'
          onClick={() => handleRemoveProduct(product.id)}>
          <Delete width={20} />
        </IconButton>
      </td>
    </tr>
  );
}
