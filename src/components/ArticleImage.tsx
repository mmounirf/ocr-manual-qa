import {
  ActionIcon,
  Badge,
  Flex,
  Image,
  LoadingOverlay,
  Stack,
  Title,
  Tooltip
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useAppSelector } from '../store/hooks';
import { selectArticle } from '../store/selectors';
import ImageControls from './ImageControls';

export const ArticleImage = () => {
  const clipboard = useClipboard({ timeout: 500 });
  const [imageLoading, setImageLoading] = useState(true);
  const article = useAppSelector(selectArticle);

  useEffect(() => {
    setImageLoading(true);
  }, [article]);

  if (!article) {
    return (
      <Stack sx={{ textAlign: 'center', position: 'relative' }} align='center'>
        <Flex align='center' direction='column' gap='md' sx={{ position: 'sticky', top: 0 }}>
          <Image
            radius='md'
            height={400}
            src={null}
            alt='With default placeholder'
            withPlaceholder
          />
          <Title order={2} color='dimmed' maw={500}>
            Please select article block from the list to display the attached image
          </Title>
        </Flex>
      </Stack>
    );
  }

  return (
    <Stack sx={{ textAlign: 'center', position: 'relative' }} align='center'>
      <TransformWrapper initialScale={1}>
        <Flex direction='column'>
          <Badge
            mb='md'
            size='xl'
            color={clipboard.copied ? 'teal' : 'blue'}
            rightSection={
              <Tooltip label={clipboard.copied ? 'Copied' : 'Copy article id'}>
                <ActionIcon
                  variant='light'
                  color={clipboard.copied ? 'teal' : 'blue'}
                  onClick={() => clipboard.copy(article.id)}
                >
                  {clipboard.copied ? <IconCheck /> : <IconCopy />}
                </ActionIcon>
              </Tooltip>
            }
          >
            {article.id}
          </Badge>
          <ImageControls />
        </Flex>
        <TransformComponent
          wrapperStyle={{
            position: 'sticky',
            top: 100,
            cursor: 'grab',
            border: '2px solid #d7d7d7',
            borderRadius: '0.25rem',
          }}
        >
          <div style={{ position: 'relative' }}>
            <LoadingOverlay visible={imageLoading} />
            <Image
              onLoad={() => setImageLoading(false)}
              src={article.image_url}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </Stack>
  );
};

export default ArticleImage;
