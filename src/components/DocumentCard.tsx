import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  Badge,
  Box,
  Card,
  createStyles,
  Divider,
  Flex,
  Group,
  Image,
  rem,
  ScrollArea,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { Prism } from '@mantine/prism';

import { IconArrowBadgeRight, IconArrowBadgeRightFilled, IconEye } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Document } from '../api/types';
import { StatusBadge } from './StatusBadge';

const useStyles = createStyles((theme) => ({
  carouselIndicator: {
    width: rem(4),
    height: rem(4),
    transition: 'width 250ms ease',
    background: theme.colors.blue,

    '&[data-active]': {
      width: rem(16),
    },
  },
}));

export const DocumentCard = ({ document }: { document: Document }) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [selectedPage, setSelectedPage] = useState(0);
  const { date, id, source, status, pages } = document;

  const onPageClick = (pageId: string) => {
    navigate(`/pages/${pageId}`);
  };

  const openJsonModal = (content: any, title: string) => {
    modals.open({
      title: `${title} - JSON`,
      size: 'xl',
      children: (
        <ScrollArea h={600}>
          <Prism language='json' withLineNumbers>
            {JSON.stringify(content, null, 2)}
          </Prism>
        </ScrollArea>
      ),
    });
  };

  const slides = pages.map((page) => (
    <Carousel.Slide key={page.id}>
      <Image
        src={page.thumbnail_name}
        height={220}
        withPlaceholder
      />
    </Carousel.Slide>
  ));

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Card.Section>
        <Carousel
          onSlideChange={setSelectedPage}
          withControls
          withIndicators
          loop
          classNames={{
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>
      <Group position='apart' mt='md' mb='xs'>
        <Text weight={500}>{source}</Text>
        <Flex align='center' gap='xs'>
          <Badge color='pink' variant='light'>
            {date}
          </Badge>
          <StatusBadge status={status} />
          <Tooltip label={`View/Copy Document ${document.source} JSON`} withArrow withinPortal>
            <ActionIcon
              variant='light'
              color='blue'
              radius='xl'
              onClick={() => openJsonModal(document, `Document ${document.source}`)}
            >
              <IconEye size='1rem' />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Group>
      <Divider />
      <ScrollArea h={100} type='always'>
        <Box mt='sm' pb='sm'>
          {pages.map((page, index) => (
            <Flex align='center' justify='space-between' key={page.id}>
              <UnstyledButton key={page.id} w='100%' onClick={() => onPageClick(page.id)}>
                <Flex align='center'>
                  {index === selectedPage ? <IconArrowBadgeRightFilled /> : <IconArrowBadgeRight />}
                  <Text w='100%' color={index === selectedPage ? 'blue' : 'dark'}>
                    Page {page.page_number}
                  </Text>
                </Flex>
              </UnstyledButton>
              <Flex align='center' gap='xs'>
                <Badge miw={60}>{page.status}</Badge>
                <Tooltip label={`View/Copy Page ${page.page_number} JSON`} withArrow withinPortal>
                  <ActionIcon
                    variant='light'
                    color='blue'
                    radius='xl'
                    mr='sm'
                    onClick={() => openJsonModal(page, `Page ${page.page_number}`)}
                  >
                    <IconEye size='1rem' />
                  </ActionIcon>
                </Tooltip>
              </Flex>
            </Flex>
          ))}
        </Box>
      </ScrollArea>
    </Card>
  );
};
