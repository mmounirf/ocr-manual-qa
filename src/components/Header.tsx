import { Anchor, Container, createStyles, Group, Header, rem, Title } from '@mantine/core';
import { Link, matchPath, useLocation } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  links: {
    width: rem(500),

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

export const AppHeader = () => {
  const { classes, cx } = useStyles();
  const { pathname } = useLocation();

  const isPathMatched = (link: string) => matchPath(link, pathname) !== null;

  return (
    <Header height={52} p='xs'>
      <Container
        fluid
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Anchor href='/'>
          <Title order={3}>OCR QA</Title>
        </Anchor>
        <Group className={classes.links} spacing={5}>
          <Link
            className={cx(classes.link, {
              [classes.linkActive]: isPathMatched('/documents/*'),
            })}
            to='/documents'
          >
            Documents
          </Link>
          <Link
            className={cx(classes.link, {
              [classes.linkActive]: isPathMatched('/pages/*'),
            })}
            to='/pages'
          >
            Pages
          </Link>

          <Link
            className={cx(classes.link, {
              [classes.linkActive]: isPathMatched('/articles/*'),
            })}
            to='/articles'
          >
            Articles
          </Link>
          <Link
            className={cx(classes.link, {
              [classes.linkActive]: isPathMatched('/report/*'),
            })}
            to='/report'
          >
            Report
          </Link>
        </Group>
        {/* <SearchSpotLight /> */}
      </Container>
    </Header>
  );
};

export default AppHeader;
