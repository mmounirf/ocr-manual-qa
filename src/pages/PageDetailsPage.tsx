import { Container, LoadingOverlay, SimpleGrid, Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useGetPageQuery } from '../api/pages.ts';
import { ArticleImage, ArticlesList } from '../components';

export const PageDetailsPage = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetPageQuery({ page_id: id ?? '' }, { skip: !id });

  const articles = data?.articles.map((article) => ({ ...article, page__details: data }));

  return (
    <Container fluid sx={{ position: 'relative', height: '100%' }} p={0}>
      {isFetching ? (
        <LoadingOverlay visible={isFetching} />
      ) : (
        <SimpleGrid cols={2} spacing='xl' sx={{ height: '100%' }}>
          <ArticleImage />
          <Stack spacing='md'>
            <ArticlesList pageArticles={articles} />
          </Stack>
        </SimpleGrid>
      )}
    </Container>
  );
};
