import { Accordion, Flex, Pagination } from '@mantine/core';
import { memo, useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { useGetArticlesQuery } from '../api/articles';
import { Article } from '../api/types';
import { setArticle, setLoading } from '../store/app.slice';
import { useAppDispatch } from '../store/hooks';
import { useAccordionStyles } from '../styles';
import ArticleBlock from './ArticleBlock';

import ArticlesData from '../assets/articles.json';

export const ArticlesList = memo(({ pageArticles }: { pageArticles?: Article[] }) => {
  const [selectedPage, setSelectedPage] = useState(1);

  const ref = useRef<VirtuosoHandle>(null);
  const { data, isFetching } = useGetArticlesQuery(
    { page: selectedPage, size: 20 },
    { skip: pageArticles !== undefined }
  );


  const [articles, setArticles] = useState<any>(ArticlesData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(isFetching));
  }, [isFetching]);

  useEffect(() => {
    if (data) {
      setArticles(data.data);
      ref.current?.scrollTo({ top: 0 });
    }
  }, [data]);

  const { classes } = useAccordionStyles();

  const onArticleChange = (article: string) => {
    if (article) {
      const { id, image_url } = JSON.parse(article) as { id: string; image_url: string };
      const index = data?.data.findIndex((article) => id === article.id);

      if (index) {
        ref.current?.scrollToIndex({ index, align: 'start' });
      }

      dispatch(setArticle(JSON.parse(article)));
    } else {
      dispatch(setArticle(null));
    }
  };

  return (
    <Accordion
      classNames={classes}
      className={classes.root}
      onChange={onArticleChange}
      h='100%'
      mb='xl'
    >
      <Virtuoso
        atBottomThreshold={1}
        ref={ref}
        data={articles}
        components={{
          Header: data
            ? () => (
              <Flex direction='column' align='center'>
                {data?.next_page && (
                  <Pagination
                    total={Number(data?.next_page) ?? 1}
                    defaultValue={selectedPage}
                    mb='md'
                    onChange={setSelectedPage}
                  />
                )}
              </Flex>
            )
            : undefined,
        }}
        itemContent={(index, article) => <ArticleBlock key={article.image_url} article={article} />}
      />
    </Accordion>
  );
});

export default ArticlesList;
