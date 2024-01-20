import { Accordion, Container, LoadingOverlay, Paper, SimpleGrid } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useGetArticleQuery } from '../api/articles';
import { ArticleBlock } from '../components';
import ArticleImage from '../components/ArticleImage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectArticle } from '../store/selectors';

import { useEffect } from 'react';
import { Article } from '../api/types';
import articlesData from '../assets/articles.json';
import { setArticle } from '../store/app.slice';

export const ArticleDetailsPage = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetArticleQuery({ article_id: id ?? '' }, { skip: !id });
  const article = useAppSelector(selectArticle);
  const dispatch = useAppDispatch();


  const routeArticleData = articlesData[0] as unknown as Article;

  useEffect(() => {
    if (!article) {
      dispatch(setArticle(routeArticleData));
    }
  }, [article])

  return (
    <Container fluid sx={{ position: 'relative', height: '88%' }} p={0}>
      {article ? (
        <Accordion defaultValue={JSON.stringify(article)} defaultChecked>
          <SimpleGrid cols={2}>
            <ArticleImage />
            <Paper withBorder shadow='md'>
              <ArticleBlock article={article} />
            </Paper>
          </SimpleGrid>
        </Accordion>
      ) : (
        <LoadingOverlay visible />
      )}
    </Container>
  );
};
