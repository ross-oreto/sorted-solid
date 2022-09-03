import { Component, onMount } from 'solid-js';

import styles from './App.module.css';
import {
    HopeThemeConfig,
    HopeProvider,
    Heading,
    Center,
    Badge,
    Text,
    Anchor,
    SimpleGrid,
    Divider,
    VStack,
    Flex, Box, Spacer
} from '@hope-ui/solid'
import {DraftIcon, GlassesIcon} from './Icons';
import Login from "./user/Login";

const config: HopeThemeConfig = {
    initialColorMode: "system", // 2. Add your color mode
}

const routes = new Map<string, string>();

const App: Component = () => {
    onMount(() => {
        routes.set("", "");
    });
    
  return (
      <HopeProvider config={config}>
          <Flex p={"$2"}>
              <Box>
                  <Heading fontFamily={"cursive"} fontSize={"25px"} as={"i"}>
                      Sorted
                  </Heading>
              </Box>
              <Spacer/>
              <Box>
                  <Badge colorScheme="danger">dev</Badge>
              </Box>
              <Spacer/>
              <Login/>
          </Flex>
          <Divider/>
          <div class={styles.footer}>
              <Divider/>
              <SimpleGrid columns={2} p={"$3"}>
                  <Anchor>
                      <Center>
                          <VStack>
                              <GlassesIcon boxSize="$7" color={"$primary9"}/>
                              <Text size="xs" color={"$primary9"}>Reviews</Text>
                          </VStack>
                      </Center>
                  </Anchor>
                  <Anchor>
                      <Center>
                          <VStack>
                              <DraftIcon boxSize="$7"/>
                              <Text size="xs">Drafts</Text>
                          </VStack>
                      </Center>
                  </Anchor>
              </SimpleGrid>
          </div>
      </HopeProvider>
  );
};

export default App;
