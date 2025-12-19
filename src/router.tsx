import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Beds from '@/pages/Beds';
import Couches from '@/pages/Couches';
import Tables from '@/pages/Tables';
import Fabrics from '@/pages/Fabrics';
import ProductDetail from '@/pages/ProductDetail';
import Favorites from '@/pages/Favorites';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'beds',
        element: <Beds />,
      },
      {
        path: 'couches',
        element: <Couches />,
      },
      {
        path: 'tables',
        element: <Tables />,
      },
      {
        path: 'fabrics',
        element: <Fabrics />,
      },
      {
        path: ':category/product/:slug',
        element: <ProductDetail />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

