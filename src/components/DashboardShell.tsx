import { AppShell, Breadcrumbs, Container, Text, ThemeIcon } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AppHeader from './Header';

export const DashboardShell = () => {
  const location = useLocation();

  const paths = location.pathname.split('/');
  const pages = paths.filter((path) => path !== '');

  return (
    <AppShell
      header={<AppHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Container fluid>
        <Breadcrumbs separator='→' mt='xs' mb='md'>
          <Link to="/">
            <ThemeIcon color='gray' variant='light' size='sm'>
              <IconHome />
            </ThemeIcon>
          </Link>
          {pages.map((page, index) =>
            index === pages.length - 1 ? (
              <Text tt='capitalize' color='dimmed' key={page}>
                {page}
              </Text>
            ) : (
              <Link to={page} key={page}>
                <Text tt='capitalize' color='blue'>
                  {page}
                </Text>
              </Link>
            )
          )}
        </Breadcrumbs>
      </Container>
      <Outlet />
    </AppShell>
  );
};

export default DashboardShell;
