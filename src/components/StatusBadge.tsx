import { Badge } from '@mantine/core';
import { ArticleStatus } from '../api/types';

const getColor = (status: ArticleStatus) => {
  switch (status) {
    case ArticleStatus.Reviewed:
      return 'teal';
    case ArticleStatus.Generated:
      return 'blue';
    case ArticleStatus.Pending:
      return 'yellow';
    case ArticleStatus.Rework:
      return 'red';
    case ArticleStatus.Misclassified:
      return 'orange';

    default:
      return 'blue';
  }
};

export const StatusBadge = ({ status }: { status: ArticleStatus }) => {

  return (
    <Badge color={getColor(status)} variant='filled'>
      {status}
    </Badge>
  );
};
