import { Component } from 'solid-js';

import {
    HopeThemeConfig,
    HopeProvider,
    Center,
    VStack,
    Box,
} from '@hope-ui/solid'
import { WrenchIcon } from './Icons';

const config: HopeThemeConfig = {
    initialColorMode: "system", 
}

const routes = new Map<string, string>();

const Down: Component<{message: string}> = (props) => {
  return (
      <HopeProvider config={config}>
        <VStack>
            <Box pb="25%"></Box>
            <WrenchIcon boxSize="$20" pb="20px"/>
            <Center h="100%" color="white">
                {props.message}
            </Center>
        </VStack>
      </HopeProvider>
  );
};

export default Down;
