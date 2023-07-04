import {
  Box,
  Button,
  Table,
  TableBody,
  TableHead,
  Typography
} from '@mui/material';
import { CartFooter } from '../components/CartFooter';
import { CartProductCardItem } from '../components/CartProductItem';
import { getFormattedPrice } from '../helpers/price';
import { useCart } from '../hooks/useCart';
import { MainLayout } from '../layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

export default function CartPage() {
  const { cart } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: getFormattedPrice(product.price),
    subTotal: getFormattedPrice(product.price * product.amount)
  }));

  const total = getFormattedPrice(
    cart.reduce((sumTotal, product) => {
      return sumTotal + product.amount * product.price;
    }, 0)
  );

  return (
    <MainLayout>
      {cartFormatted.length ? (
        <>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <tr>
                <th aria-label='product image' />
                <th>PRODUTO</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
                <th aria-label='delete icon' />
              </tr>
            </TableHead>
            <TableBody sx={{ padding: '12px', borderBottom: '1px solid #eee' }}>
              {cartFormatted.map(product => (
                <CartProductCardItem product={product} />
              ))}
            </TableBody>
          </Table>
          <CartFooter total={total!} />
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            textAlign: 'center',
            padding: '12px'
          }}>
          <Typography
            fontWeight='bold'
            fontSize='38px'
            variant='h4'
            component='h1'>
            Carrinho vazio
          </Typography>
          <Link to='/'>
            <Button
              startIcon={<Home />}
              variant='contained'>
              Ir para Loja
            </Button>
          </Link>
        </Box>
      )}
    </MainLayout>
  );
}
