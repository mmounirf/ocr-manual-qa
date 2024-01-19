import { Container, Pagination, SimpleGrid, Skeleton } from '@mantine/core';
import { useState } from 'react';
import { useGetDocumentsQuery } from '../api/documents';
import type { Document } from '../api/types';
import { DocumentCard } from '../components';

import DocumentsData from '../assets/documents.json';

export const DocumentsPage = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const { data, isFetching } = useGetDocumentsQuery({ size: 20, page: selectedPage });
  const loadingSkeletons = Array.from(Array(8).keys());

  return (
    <Container fluid>
      <Pagination
        total={Number(data?.next_page) ?? 1}
        defaultValue={selectedPage}
        mb='md'
        onChange={setSelectedPage}
      />
      <SimpleGrid cols={4}>
        {isFetching &&
          loadingSkeletons.map((key) => (
            <Skeleton key={key} animate visible height={300} width='100%' />
          ))}
        {!isFetching &&
          DocumentsData.map((document) => <DocumentCard document={document as unknown as Document} key={document.id} />)}
      </SimpleGrid>
    </Container>
  );
};
