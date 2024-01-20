import {
  ActionIcon,
  Badge,
  Card,
  Container,
  Divider,
  Flex,
  LoadingOverlay,
  ScrollArea,
  Title,
  Tooltip,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { completeNavigationProgress, startNavigationProgress } from '@mantine/nprogress';
import { Prism } from '@mantine/prism';
import { IconCheck, IconCopy, IconEye } from '@tabler/icons-react';
import { CollectionReference, collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import { Virtuoso } from 'react-virtuoso';
import { FirebaseArticle } from '../api/types';
import { db } from '../firebase';

export const ReportPage = () => {
  const clipboard = useClipboard({ timeout: 500 });
  const [articles, setArticles] = useState<FirebaseArticle[]>([]);
  const getAllArticles = async () => {
    const articlesRef = collection(db, 'articles') as CollectionReference<FirebaseArticle>;

    const q = query(articlesRef);
    const querySnapshot = await getDocs(q);
    const allArticles = querySnapshot.docs.map((doc) => doc.data());
    setArticles(allArticles);
    completeNavigationProgress();
  };

  useEffect(() => {
    startNavigationProgress();

    getAllArticles();
  }, []);

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

  const fixedAuthors = articles.map((article) => ({
    ...article,
    modified_by_qa_authors: Array.isArray(article.modified_by_qa_authors)
      ? article.modified_by_qa_authors
      : [],
  }));

  return (
    <Container fluid sx={{ position: 'relative', height: '96%' }} p={0}>
      <LoadingOverlay visible={articles.length === 0} />
      <Virtuoso
        data={fixedAuthors}
        itemContent={(index, article) => (
          <Card
            key={article.id}
            withBorder
            shadow='lg'
            p='md'
            radius='md'
            mb='md'
          >
            <Card.Section p='md'>
              <Flex align='center' gap='xs'>
                <Tooltip label={`View/Copy Article  JSON`} withArrow withinPortal>
                  <ActionIcon
                    variant='light'
                    color='blue'
                    radius='xl'
                    onClick={() => openJsonModal(article, `Article ${article.text_words.title}`)}
                  >
                    <IconEye size='1rem' />
                  </ActionIcon>
                </Tooltip>
                <Flex align='center' gap='sm'>
                  <Badge
                    color={clipboard.copied ? 'teal' : 'blue'}
                    rightSection={
                      <Tooltip label={clipboard.copied ? 'Copied' : 'Copy article id'}>
                        <ActionIcon
                          variant='light'
                          color={clipboard.copied ? 'teal' : 'blue'}
                          onClick={() => clipboard.copy(article.id)}
                        >
                          {clipboard.copied ? <IconCheck size='1rem' /> : <IconCopy size='1rem' />}
                        </ActionIcon>
                      </Tooltip>
                    }
                  >
                    {article.id}
                  </Badge>
                </Flex>
              </Flex>
            </Card.Section>
            <Card.Section p='md'>
              <Title order={4}>Title</Title>

              <ReactDiffViewer
                showDiffOnly={false}
                oldValue={article.text_words.title}
                newValue={article.modified_by_qa_title}
                splitView={true}
              />
            </Card.Section>
            <Divider />
            <Card.Section p='md'>
              <Title order={4}>Content</Title>
              <ReactDiffViewer
                showDiffOnly={false}
                oldValue={article.post_text}
                newValue={article.modified_by_qa_content}
                splitView={true}
              />
            </Card.Section>
            <Divider />
            <Card.Section p='md'>
              <Title order={4}>Authors</Title>
              <ReactDiffViewer
                showDiffOnly={false}
                oldValue={(article.authors ?? []).join('\r\n')}
                newValue={(article.modified_by_qa_authors ?? []).join('\r\n')}
                splitView={true}
              />
            </Card.Section>
          </Card>
        )}
      />
    </Container>
  );
};
