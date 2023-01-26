import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import City, { CityRedirect } from './pages/city';
import MapPage from './pages/city/MapPage';
import RoutePage, { loader as routeLoader } from './pages/city/RoutePage';
import RoutesPage from './pages/city/RoutesPage';
import InfoPage from './pages/info';
import LandingPage from './pages/LandingPage';
import MainPage, { loader as mainLoader } from './pages/MainPage';
import UserPage from './pages/user';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    loader: mainLoader,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/info',
        element: <InfoPage />,
      },
      {
        path: '/login',
        element: <UserPage />,
      },
      {
        path: '/user/:username',
        element: <UserPage />,
      },
      {
        path: '/:cityId',
        element: <City />,
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
            // loader: cityLoader,
          },
          {
            path: '/:cityId/route/:routeId',
            element: <RoutePage />,
            loader: routeLoader,
          },
        ],
      },
    ],
  },
]);

export default router;
