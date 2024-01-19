import { ActionIcon, Flex, Kbd } from '@mantine/core';
import { spotlight, SpotlightProvider } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';

export const SearchSpotLight = () => {
  return (
    <SpotlightProvider
      highlightQuery
      actions={[
        {
          title: 'Search projects',
          description: 'Search in projects with project id or name',
          closeOnTrigger: false,
          onTrigger: (action) => {
            console.log(action);
            spotlight.registerActions([
              {
                id: 'secret-action-1',
                title: 'Secret action',
                description: 'It was registered with a button click',
                onTrigger: () => console.log('Secret'),
              },
            ]);
          },
        },
      ]}
      searchIcon={<IconSearch size='1.2rem' />}
      searchPlaceholder='Search...'
      shortcut={['/', 'mod + f']}
      nothingFoundMessage='Nothing found...'
    >
      <Flex align='center' gap='md'>
        <ActionIcon variant='light' color='blue' onClick={() => spotlight.open()}>
          <IconSearch size='1.125rem' />
        </ActionIcon>
        <Flex align='center'>
          <Kbd mr={5}>CTRL</Kbd>
          <span>+</span>
          <Kbd mr={5}>SHIFT</Kbd>
          <span>+</span>
          <Kbd ml={5}>F</Kbd>
        </Flex>
      </Flex>
    </SpotlightProvider>
  );
};

export default SearchSpotLight;
