import {
  Center,
  Container,
  Flex,
  LoadingOverlay,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useFilterArticlesMutation } from '../api/articles';
import { Article, ArticleStatus } from '../api/types';
import { FilteredArticlesList } from '../components';
import ArticleImage from '../components/ArticleImage';
import { useAppSelector } from '../store/hooks';
import { selectLoading } from '../store/selectors';

import articlesData from '../assets/articles.json';

export const ArticlesPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [statusFilter, setStatusFilter] = useState<undefined | string>();
  const [dateFilter, setDateFilter] = useState<undefined | string>();
  const loading = useAppSelector(selectLoading);
  const [search, { data, isLoading }] = useFilterArticlesMutation();

  useEffect(() => {
    if (statusFilter || dateFilter) {
      search({ filter: { status: statusFilter as ArticleStatus, date: dateFilter } });
    }
  }, [statusFilter, dateFilter]);

  useEffect(() => {
    if (selectedDate) {
      setDateFilter(dayjs(selectedDate).format('YYYY-MM-DD'));
    }
  }, [selectedDate]);

  return (
    <Container fluid sx={{ position: 'relative', height: '88%' }} p={0}>
      <LoadingOverlay visible={loading || isLoading} />
      <Paper
        w='100%'
        withBorder
        p='md'
        radius='md'
        shadow='sm'
        mb='md'
        component={Flex}
        align='center'
        justify='space-between'
        gap='md'
      >
        <Select
          w='50%'
          withinPortal
          label='Filter articles by status'
          placeholder='Select status'
          value={statusFilter}
          data={Object.values(ArticleStatus)}
          onChange={(value) => value && setStatusFilter(value)}
        />
        <DatePickerInput
          w='50%'
          icon={<IconCalendar size='1.1rem' stroke={1.5} />}
          label='Filter articles by Date'
          placeholder='Pick a date'
          monthLabelFormat='YYYY-MM-DD'
          yearLabelFormat='YYYY'
          valueFormat='YYYY-MM-DD'
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </Paper>
      {articlesData.length ? (
        <SimpleGrid cols={2} spacing='xl' sx={{ height: '100%' }}>
          <ArticleImage />
          {articlesData.length ? (
            <Stack spacing='md'>
              <FilteredArticlesList articlesResponse={articlesData as unknown as Article[]} />
            </Stack>
          ) : (
            <Center>
              <Title color='dimmed'>No articles found</Title>
            </Center>
          )}
        </SimpleGrid>
      ) : (
        <Center>
          <Title mt='lg' color='dimmed'>
            Please select filter values from above
          </Title>
        </Center>
      )}
    </Container>
  );
};
