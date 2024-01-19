import { Accordion } from '@mantine/core';
import { memo, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { Article } from '../api/types';
import { setArticle } from '../store/app.slice';
import { useAppDispatch } from '../store/hooks';
import { useAccordionStyles } from '../styles';
import FilteredArticleBlock from './FilteredArticleBlock';

export const FilteredArticlesList = memo(
  ({ articlesResponse }: { articlesResponse: Article[] }) => {
    const ref = useRef<VirtuosoHandle>(null);

    const dispatch = useAppDispatch();

    const { classes } = useAccordionStyles();

    const onArticleChange = (article: string) => {
      if (article) {
        const { id, image_url } = JSON.parse(article) as { id: string; image_url: string };
        const index = articlesResponse.findIndex((article) => id === article.id);

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
          data={articlesResponse}
          itemContent={(index, article) => (
            <FilteredArticleBlock key={article.image_url} article={article} />
          )}
        />
      </Accordion>
    );
  }
);

export default FilteredArticlesList;
