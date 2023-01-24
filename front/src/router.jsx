import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './components/App';
import City, { CityRedirect, loader as cityLoader } from './pages/city';
import MapPage from './pages/city/MapPage';
import RoutesPage from './pages/city/RoutesPage';
import MainPage, { loader as mainLoader } from './pages/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    loader: mainLoader,
    children: [
      {
        path: '/info',
        element: <App />,
      },
      {
        path: '/user/:username',
        element: <App />,
      },
      {
        path: '/:cityId',
        element: <City />,
        loader: cityLoader,
        children: [
          {
            path: '/:cityId/',
            element: <CityRedirect />,
          },
          {
            path: '/:cityId/map',
            element: <MapPage />,
          },
          {
            path: '/:cityId/routes',
            element: <RoutesPage />,
            loader: cityLoader,
          },
          {
            path: '/:cityId/route/:routeId',
            element: <RoutesPage />,
            loader: cityLoader,
          },
        ],
      },
    ],
  },
]);

export default router;
