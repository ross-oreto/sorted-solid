import { createContext, createSignal, Signal, useContext } from "solid-js";
import User from "./User";

const LoginContext = createContext<Signal<User|null>>();
export function LoginProvider(props: any) {
    return (
        <LoginContext.Provider value={createSignal<User|null>(null)}>
            {props.children}
        </LoginContext.Provider>
    );
}

export function useLogin() {
    const ctx = useContext(LoginContext);
    if (ctx) {
      return ctx;
    }
    throw new Error('Missing Login');
  }
// export const useLogin = () => useContext(LoginContext)!;