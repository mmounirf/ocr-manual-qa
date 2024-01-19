import { Accordion, Badge, Button, Flex, Stack, Text, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { memo, useEffect, useState } from 'react';
import { useUpdateArticleMutation } from '../api/articles';
import { Article, ArticleStatus } from '../api/types';
import { db } from '../firebase';
import { StatusBadge } from './StatusBadge';
import { StatusSelector } from './StatusSelector';

type ArticleBlockProps = {
  article: Article;
};

export const ArticleBlock = memo(({ article }: ArticleBlockProps) => {
  const [loading, setLoading] = useState(false);

  const [updateArticle, { isLoading }] = useUpdateArticleMutation();
  const { id, text_words, post_text, image_url, page, status, date } = article;

  const form = useForm({
    initialValues: {
      title: article.text_words && article.text_words.title ? article.text_words.title : '',
      post_text: article.post_text ?? '',
      authors: article.authors ? article.authors.join('\r\n') : '',
      status,
    },
  });

  const addNewDoc = async () => {
    setLoading(true);
    const docSnap = await getDoc(doc(db, 'articles', id));
    const isExists = docSnap.exists();
    if (!isExists) {
      const newArticle: Partial<Article> = { ...article };
      delete newArticle.file_info;
      delete newArticle.entities;
      delete newArticle.page__details;
      await setDoc(doc(db, 'articles', id), {
        ...newArticle,
        asr_ocr_text: article.file_info.asr_ocr_text,
        entities: article.entities.entities,
        modified_by_qa_content: form.values.post_text,
        modified_by_qa_title: form.values.title,
        modified_by_qa_authors: form.values.authors,
        modified_by_qa_status: form.values.status,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    addNewDoc();
  }, []);

  const isFormChanged =
    form.isDirty('post_text') ||
    form.isDirty('title') ||
    form.isDirty('authors') ||
    form.isDirty('status');

  const onSaveChanges = async () => {
    setLoading(true);

    await updateDoc(doc(db, 'articles', id), {
      modified_by_qa_content: form.values.post_text,
      modified_by_qa_title: form.values.title,
      modified_by_qa_authors: form.values.authors ? form.values.authors.split(/\r?\n/) : [],
      modified_by_qa_status: form.values.status,
    });

    const response = await updateArticle({
      id,
      post_text: form.values.post_text,
      text_words: { title: form.values.title },
      authors: form.values.authors ? form.values.authors.split(/\r?\n/) : [],
      status: form.values.status,
      date,
      page,
    });

    if (!('error' in response)) {
      showNotification({
        message: 'Article updated successfully',
        color: 'green',
      });
    }
    setLoading(false);
  };

  return (
    <Accordion.Item value={JSON.stringify(article)}>
      <Accordion.Control>
        <Flex justify='space-between' align='center'>
          <Stack align='flex-start' spacing={0} maw='85%'>
            <Badge>Page {article.page__details.page_number}</Badge>
            <Text>{text_words?.title}</Text>
          </Stack>
          <StatusBadge status={status} />
        </Flex>
      </Accordion.Control>
      <Accordion.Panel>
        <Textarea
          {...form.getInputProps('title')}
          label='Title'
          variant='filled'
          minRows={3}
        />
        <Textarea
          {...form.getInputProps('post_text')}
          label='Content'
          variant='filled'
          minRows={5}
          mb='md'
        />
        <Textarea
          {...form.getInputProps('authors')}
          label='Authors'
          variant='filled'
          minRows={3}
          mb='md'
        />
        <StatusSelector
          status={form.values.status}
          onChange={(value) => form.setFieldValue('status', value as ArticleStatus)}
        />
        <Button
          mt='md'
          fullWidth
          disabled={!isFormChanged}
          loading={isLoading || loading}
          onClick={() => onSaveChanges()}
        >
          Save changes
        </Button>
      </Accordion.Panel>
    </Accordion.Item>
  );
});

export default ArticleBlock;
