import { Container, LoadingOverlay, SimpleGrid, Stack } from '@mantine/core';
import ArticleImage from '../components/ArticleImage';
import ArticlesList from '../components/ArticlesList';
import { useAppSelector } from '../store/hooks';
import { selectLoading } from '../store/selectors';

export const HomePage = () => {
  const loading = useAppSelector(selectLoading);

  return (
    <Container fluid sx={{ position: 'relative', height: '100%' }} p={0}>
      <LoadingOverlay visible={loading} />
      <SimpleGrid cols={2} spacing='xl' sx={{ height: '100%' }}>
        <ArticleImage />
        <Stack spacing='md'>
          <ArticlesList />
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;
