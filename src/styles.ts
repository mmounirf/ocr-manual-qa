import { createStyles, rem } from '@mantine/core';

export const useAccordionStyles = createStyles((theme) => ({
  root: {
    borderRadius: theme.radius.md,
  },

  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    border: `${rem(1)} solid transparent`,
    position: 'relative',
    zIndex: 0,
    transition: 'transform 150ms ease',
    borderRadius: theme.radius.md,
    marginTop: 0,
    margin: theme.spacing.xl,

    '&[data-active]': {
      transform: 'scale(1.03)',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
      zIndex: 1,
    },
  },

  control: {
    borderRadius: theme.radius.md,
  },

  chevron: {
    '&[data-rotate]': {
      transform: 'rotate(90deg)',
    },
  },
}));
