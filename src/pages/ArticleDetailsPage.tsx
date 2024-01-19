import { Accordion, Container, LoadingOverlay, Paper, SimpleGrid } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useGetArticleQuery } from '../api/articles';
import { ArticleBlock } from '../components';
import ArticleImage from '../components/ArticleImage';

export const ArticleDetailsPage = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetArticleQuery({ article_id: id ?? '' }, { skip: !id });

  return (
    <Container fluid sx={{ position: 'relative', height: '88%' }} p={0}>
      {data ? (
        <Accordion defaultValue={JSON.stringify(data)} defaultChecked>
          <SimpleGrid cols={2}>
            <ArticleImage />
            <Paper withBorder shadow='md'>
              <ArticleBlock article={data} />
            </Paper>
          </SimpleGrid>
        </Accordion>
      ) : (
        <LoadingOverlay visible />
      )}
    </Container>
  );
};
