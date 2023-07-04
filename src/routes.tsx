import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import Cart from './pages/CartPage';
import ProductsPage from './pages/ProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='/'
        element={<ProductsPage />}
      />
      <Route
        path='products/:id'
        element={<ProductDetailsPage />}
      />
      <Route
        path='cart'
        element={<Cart />}
      />
    </>
  )
);
