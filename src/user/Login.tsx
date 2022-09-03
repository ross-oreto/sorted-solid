import {Component, onMount, Setter, createSignal, createContext, useContext, Context, Accessor } from 'solid-js';
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

const testUser: User = new User("ross.oreto", "ross.oreto@gmail.com", new Profile("Ross", "Oreto"));
const LoginContext: Context<User> = createContext<User>(testUser);
export function LoginProvider(props: any) {
    return (
        <LoginContext.Provider value={createSignal<User>(testUser)}>
            {props.children}
        </LoginContext.Provider>
    );
}

function useLogin() {
    const ctx = useContext(LoginContext);
    if (ctx) {
      return ctx;
    }
    throw new Error('Missing Login');
  }
// export const useLogin  = () => useContext(LoginContext)!;


const Login: Component = () => {
    // const [getUser, setUser] = createSignal<User>();
    const [getUser, setUser] = useLogin();
    const { isOpen, onOpen, onClose } = createDisclosure();

    // onMount(() => {
    //     console.info("mounting");
    //     FB.getLoginStatus(function(response) {
    //         if (response.status == 'connected') {
    //             setUser(testUser);
    //         } else {
    //             setUser();
    //         }
    //         console.info(response);
    //     });
    // });

    return (
        <Box h="100%" me={"10px"}>
            { getUser() ? (
                // <UserDrawer login={setUser} />
                <UserDrawer />
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
                                        setTimeout(() => setUser(testUser), 300);
                                    }}
                                            leftIcon={<FacebookIcon boxSize="$4"/>}
                                            colorScheme="info"
                                            width={"150px"} mb={"10px"}>
                                        facebook
                                    </Button>
                                </HStack>
                                <HStack>
                                    <Button onClick={() => {
                                        onClose();
                                        setTimeout(() => setUser(testUser), 300);
                                    }}
                                            leftIcon={<FacebookIcon boxSize="$4"/>}
                                            colorScheme="info"
                                            width={"150px"} mb={"10px"}>
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
                        <Badge colorScheme="info">Ross Oreto</Badge>
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
