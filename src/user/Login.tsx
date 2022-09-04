import {Component, onMount, Setter, createSignal, createContext, useContext, Context, Accessor, Signal } from 'solid-js';
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
import {FacebookIcon, GoogleIcon, LoginIcon} from "../Icons";
import User, { Profile } from './User';
import { useLogin } from './LoginContext';
import { useI18n } from '../info/InfoContext';

const testUser: User = new User("ross.oreto", "ross.oreto@gmail.com", new Profile("Ross", "Oreto"));

const Login: Component = () => {
    const i18n = useI18n();
    const [getUser, setUser] = useLogin();
    const { isOpen, onOpen, onClose } = createDisclosure();

    onMount(() => {
        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                setUser(testUser);
            } else {
                setUser(null);
            }
        });
    });

    return (
        <Box h="100%" me={"10px"}>
            { getUser() ? (
                <UserDrawer/>
            ) : (
                <>
                <Anchor onClick={onOpen}>
                    <VStack>
                        <LoginIcon boxSize="$7"/>
                        <Text size="xs">{i18n.t('login')}</Text>
                    </VStack>
                </Anchor>
                <Drawer
                    opened={isOpen()}
                    placement="right"
                    onClose={onClose}>
                    <DrawerOverlay/>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>{i18n.t('login.provider')}</DrawerHeader>
                        <DrawerBody>
                            <VStack>
                                <HStack>
                                    <Button onClick={() => {
                                        onClose();
                                        setTimeout(() => setUser(testUser), 300);
                                    }}
                                            leftIcon={<FacebookIcon boxSize="$4"/>}
                                            colorScheme="info"
                                            width={"150px"} mb={"10px"}>
                                        {i18n.t('facebook')}
                                    </Button>
                                </HStack>
                                <HStack>
                                    <Button onClick={() => {
                                        onClose();
                                        setTimeout(() => setUser(testUser), 300);
                                    }}
                                            leftIcon={<GoogleIcon boxSize="$4"/>}
                                            colorScheme="info"
                                            width={"150px"} mb={"10px"}>
                                        {i18n.t('google')}
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

const UserDrawer: Component = (props) => {
    const { isOpen, onOpen, onClose } = createDisclosure();
    const [ getUser, setUser ] = useLogin(); 

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
                        <Badge colorScheme="info">{getUser?.name}</Badge>
                    </DrawerHeader>
                    <Divider/>
                    <Box p={"10px"} cursor="pointer" onClick={() => {
                        onClose();
                        setUser(null);
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
