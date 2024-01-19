import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  ScrollArea,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { Prism } from '@mantine/prism';
import { IconEye } from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';
import type { Article, Page } from '../api/types';
import { setArticle } from '../store/app.slice';
import { useAppDispatch } from '../store/hooks';
import { StatusBadge } from './StatusBadge';

export const PageCard = ({ page }: { page: Page }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, articles, page_number, thumbnail_name } = page;

  const onArticleClick = (article: Article) => {
    dispatch(setArticle(article));
    navigate(`/articles/${article.id}`);
  };

  const onPageClick = () => {
    navigate(`/pages/${page.id}`);
  };


  const openJsonModal = (content: any, title: string) => {
    modals.open({
      title: `${title} - JSON`,
      size: 'xl',
      children: (
        <ScrollArea h={600}>
          <Prism language='json' withLineNumbers sx={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(content, null, 2)}
          </Prism>
        </ScrollArea>
      ),
    });
  };

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Card.Section>
        <UnstyledButton onClick={() => onPageClick()} w='100%'>
          <Image
            src={thumbnail_name}
            height={220}
            withPlaceholder
          />
        </UnstyledButton>
      </Card.Section>
      <Group position='apart' mt='md' mb='xs'>
        <Text weight={500}>Page Number {page_number}</Text>
        <Flex align='center' gap='xs'>
          <StatusBadge status={status} />
          <Tooltip label={`View/Copy Page ${page_number} JSON`} withArrow withinPortal position="right">
            <ActionIcon
              variant='light'
              color='blue'
              radius='xl'
              onClick={() => openJsonModal(page, `Page ${page_number}`)}
            >
              <IconEye size='1rem' />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Group>
      <Divider />
      <Box mt='sm' pb='sm' w='100%'>
        {articles.map((article, index) => (
          <div key={article.id}>
            <Flex key={article.id} align='center' justify='space-between'>
              <UnstyledButton onClick={() => onArticleClick(article)} sx={{ width: '200px' }}>
                <Tooltip withArrow withinPortal label={article.text_words?.title} position='left'>
                  <Text
                    sx={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {article.text_words?.title}
                  </Text>
                </Tooltip>
              </UnstyledButton>
              <Flex gap='xs' align='center'>
                <StatusBadge status={article.status} />

                <Tooltip
                  label={`View/Copy Article ${article.text_words.title} JSON`}
                  withArrow
                  withinPortal
                >
                  <ActionIcon
                    variant='light'
                    color='blue'
                    radius='xl'
                    onClick={() => openJsonModal(article, `Article ${article.text_words.title}`)}
                  >
                    <IconEye size='1rem' />
                  </ActionIcon>
                </Tooltip>
              </Flex>
            </Flex>
            <Divider />
          </div>
        ))}
      </Box>
    </Card>
  );
};
