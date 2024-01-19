import { Container } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App = () => {
  return (
    <Container fluid sx={{ position: 'relative' }}>
      <NavigationProgress />
      <Notifications />
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
