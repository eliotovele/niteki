import { Box, Grid } from '@mui/material';
import { ProductCard } from '../components/ProductCard';
import { MainLayout } from '../layouts/MainLayout';
import { products } from '../services/data';

function ProductsPage() {
  return (
    <MainLayout>
      <Box
        sx={{
          display: 'grid',
          gap: 4,
          gridTemplateColumns: 'repeat(3, 1fr)'
        }}>
        {products.map(product => (
          <Grid key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Box>
    </MainLayout>
  );
}

export default ProductsPage;
