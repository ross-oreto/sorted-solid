import type {Component, Setter } from 'solid-js';
import {
    Drawer
    , DrawerBody
    , DrawerCloseButton
    , DrawerContent
    , DrawerHeader
    , DrawerOverlay
    , Badge
    , Avatar
    , Box
    , Anchor
    , Text
    , VStack
    , createDisclosure
    , Button
    , HStack
    , Divider} from '@hope-ui/solid';
import {FacebookIcon, GoogleIcon, LoginIcon} from "./Icons";

import {createSignal} from "solid-js";


const Login: Component = () => {
    const [ isLoggedIn, setLogin] = createSignal(false);
    const { isOpen, onOpen, onClose } = createDisclosure();

    return (
        <Box h="100%" me={"10px"}>
            { isLoggedIn() ? (
                <UserDrawer login={setLogin} />
            ) : (
                <>
                <Anchor onClick={onOpen}>
                    <VStack>
                        <LoginIcon boxSize="$7"/>
                        <Text size="xs">Sign in</Text>
                    </VStack>
                </Anchor>
                <Drawer
                    opened={isOpen()}
                    placement="right"
                    onClose={onClose}>
                    <DrawerOverlay/>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Choose login provider</DrawerHeader>
                        <DrawerBody>
                            <VStack>
                                <HStack>
                                    <Button onClick={() => {
                                        onClose();
                                        setInterval(() => setLogin(true), 300);
                                    }}
                                            leftIcon={<FacebookIcon boxSize="$4"/>}
                                            colorScheme="info"
                                            width={"150px"} mb={"10px"}>
                                        facebook
                                    </Button>
                                </HStack>
                                <HStack>
                                    <Button onClick={() => setLogin(true)}
                                            leftIcon={<GoogleIcon boxSize="$4" />}
                                            colorScheme="info" width={"150px"}>
                                        google
                                    </Button>
                                </HStack>
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
                </>
            )}
        </Box>
    );
};

const UserDrawer: Component<{login: Setter<boolean>}> = (props) => {
    const { isOpen, onOpen, onClose } = createDisclosure();

    return (
        <>
            <Badge colorScheme="info">Ross Oreto</Badge>
            <Avatar name="Ross Oreto" src="https://bit.ly/37dJ0m7" onClick={onOpen} cursor="pointer"/>
            <Drawer
                opened={isOpen()}
                placement="right"
                onClose={onClose}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Avatar name="Ross Oreto" src="https://bit.ly/37dJ0m7"/>
                        <Badge colorScheme="info">Ross Oreto</Badge>
                    </DrawerHeader>
                    <Divider/>
                    <Box p={"10px"} cursor="pointer" onClick={() => {
                        onClose();
                        props.login(false);
                    }}>
                        <Text>Sign out</Text>
                    </Box>
                    <Divider/>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Login;
