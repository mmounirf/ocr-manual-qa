import { Select } from '@mantine/core';
import { ArticleStatus } from '../api/types';

export const StatusSelector = ({
  status,
  onChange,
}: {
  status?: ArticleStatus;
  onChange: (status: string) => void;
}) => {
  return (
    <Select
      value={status}
      label='Select status'
      placeholder='Select status'
      data={Object.values(ArticleStatus)}
      onChange={onChange}
    />
  );
};
