 
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { getFormattedPrice } from '../helpers/price';
import { useCart } from '../hooks/useCart';
import { PRODUCT } from '../types';

type ProductCardProps = {
  product: Partial<PRODUCT>;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addProduct, addButtonStatus } = useCart();

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        borderRadius: '8px',
        fontWeight: 'bold',
        border: 1,
        borderColor: 'lightgray'
      }}>
      <Box
        component='img'
        sx={{
          height: 233,
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        alt='The house from the offer.'
        src={product.image}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          m: 3,
          minWidth: { md: 350 }
        }}>
        <Box
          component={Link}
          to={`/products/${product.id}`}
          sx={{
            fontSize: 16,
            mt: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            textDecoration: 'none',
            color: 'inherit'
          }}>
          {product.title}
        </Box>
        <Box
          component='span'
          sx={{ color: 'primary.main', fontSize: 22 }}>
          {getFormattedPrice(product.price)}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            width: '100%',
            mt: 3
          }}>
          <Button
            // @ts-ignore
            disabled={addButtonStatus && addButtonStatus[product.id]}
            onClick={() => handleAddProduct(product.id!)}
            variant='text'>
            Adicionar ao carrinho
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
