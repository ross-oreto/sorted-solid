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
import { LoginProvider } from './user/LoginContext';
import Login from "./user/Login";
import { useI18n, useInfo } from './info/InfoContext';

const config: HopeThemeConfig = {
    initialColorMode: "system", // 2. Add your color mode
}

const App: Component = (props) => {
    onMount(() => {});
    const i18n = useI18n();
    const info = useInfo();
    
    return (
    <LoginProvider>
      <HopeProvider config={config}>
          <Flex p={"$2"}>
              <Box>
                  <Heading fontFamily={"cursive"} fontSize={"25px"} as={"i"}>
                    {i18n.t("app.title")}
                  </Heading>
              </Box>
              <Spacer/>
              <Box>
                  <Badge colorScheme="danger">{info.mode}</Badge>
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
                              <Text size="xs" color={"$primary9"}>{i18n.t("reviews")}</Text>
                          </VStack>
                      </Center>
                  </Anchor>
                  <Anchor>
                      <Center>
                          <VStack>
                              <DraftIcon boxSize="$7"/>
                              <Text size="xs">{i18n.t("drafts")}</Text>
                          </VStack>
                      </Center>
                  </Anchor>
              </SimpleGrid>
          </div>
      </HopeProvider>
    </LoginProvider>
    );
};

export default App;