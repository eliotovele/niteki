import { Box, Button, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { products } from '../services/data';
import { MainLayout } from '../layouts/MainLayout';
import { getFormattedPrice } from '../helpers/price';
import { useCart } from '../hooks/useCart';
import { ArrowBack } from '@mui/icons-material';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addProduct, addButtonStatus } = useCart();

  const product = products.find(product => product.id === Number(id));

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <MainLayout>
      <Link to='/'>
        <Button>
          <ArrowBack /> Voltar
        </Button>
      </Link>

      <Box
        columnGap={4}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          mt: 5
        }}>
        <Box
          component='img'
          sx={{
            flex: 1,
            height: 600,
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          alt='The house from the offer.'
          src={product?.image}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '40%'
          }}>
          <Typography
            variant='h4'
            component='h4'>
            {product?.title}
          </Typography>
          <Box
            component='span'
            sx={{ color: 'primary.main', fontSize: 38, fontWeight: 'bold' }}>
            {getFormattedPrice(product?.price)}
          </Box>
          <Typography component='p'>{product?.description}</Typography>
          <Button
            // @ts-ignore
            disabled={addButtonStatus[product?.id]}
            variant='outlined'
            onClick={() => handleAddProduct(product?.id!)}>
            Adicionar Carrinho
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
}
