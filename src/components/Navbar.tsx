import { ShoppingBag } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export function Navbar() {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <>
      <AppBar
        position='static'
        elevation={1}>
        <Container maxWidth='xl'>
          <Toolbar
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            disableGutters>
            <Box sx={{ display: 'flex' }}>
              <ShoppingBag
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
              />
              <Typography
                variant='h6'
                noWrap
                component={Link}
                to='/'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none'
                }}>
                LOJA
              </Typography>
            </Box>

            <ShoppingBag sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}>
              LOJA
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Box
                component={Link}
                to='/cart'
                sx={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontSize: '18px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold'
                }}>
                Meu Carrinho
                {cartSize > 0 && (
                  <Badge
                    badgeContent={cartSize}
                    sx={{ pl: 2 }}
                    color='error'>
                    <ShoppingCartIcon />
                  </Badge>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
