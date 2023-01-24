import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import citiesService from '../services/cities';
import usersService from '../services/users';

export async function loader() {
  const cities = await citiesService.load();
  const users = await usersService.load();

  const user = await usersService.bySlug('admin');

  return {
    cities,
    user,
    users,
  };
}

function MainPage() {
  return (
    <>
      <TopMenu />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default MainPage;
