import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Outlet, useLoaderData } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import TransBreadcrumbs from '../components/TransBreadcrumbs';
import { setCity } from '../reducers/breadcrumbsSlice';
import cityAPI from '../services/cityAPI/cityAPI';
import usersService from '../services/users';

export async function loader({ params }) {
  const {
    cityId,
  } = params;

  const cities = await cityAPI.load();
  const city = cityId ? await cityAPI.bySlug(cityId) : null;

  const users = await usersService.load();
  const user = null; // await usersService.bySlug('admin');

  return {
    city,
    cities,
    user,
    users,
  };
}

function MainPage() {
  const {
    cities,
    city,
    user,
  } = useLoaderData();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCity(city));
  }, []);

  return (
    <>
      <TopMenu
        cities={cities}
        city={city}
        user={user}
      />
      <Container>
        <TransBreadcrumbs />
        <Outlet />
      </Container>
    </>
  );
}

export default MainPage;
