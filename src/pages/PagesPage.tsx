import { Container, Pagination, SimpleGrid, Skeleton } from '@mantine/core';
import { useState } from 'react';
import { useGetPagesQuery } from '../api/pages';
import { PageCard } from '../components';

import { Page } from '../api/types';
import pagesData from '../assets/pages.json';

export const PagesPage = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const { data, isFetching } = useGetPagesQuery({ size: 20, page: selectedPage });
  const loadingSkeletons = Array.from(Array(8).keys());

  return (
    <Container fluid>
      <Pagination
        total={Number(data?.next_page) ?? 1}
        defaultValue={1}
        mb='md'
        onChange={setSelectedPage}
      />
      <SimpleGrid cols={4}>
        {isFetching &&
          loadingSkeletons.map((key) => (
            <Skeleton key={key} animate visible height={300} width='100%' />
          ))}
        {!isFetching && pagesData.map((page) => <PageCard page={page as Page} key={page.id} />)}
      </SimpleGrid>
    </Container>
  );
};
