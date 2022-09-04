import { createContext, createSignal, Signal, useContext } from "solid-js";
import Api from "./Api";
import I18n from "./I18n";
import Info from "./Info";

const InfoContext = createContext<Signal<Info>>();
const ApiContext = createContext<Signal<Api>>();
const I18nContext = createContext<Signal<I18n>>();

export function InfoProvider(props: any) {
    const infoSignal = createSignal<Info>(props.info);
    const apiSignal = createSignal<Api>(new Api(props.info.api, props.info.routes));
    const i18nSignal = createSignal<I18n>(new I18n(props.info.i18n));

    return (
        <InfoContext.Provider value={infoSignal}>
            <ApiContext.Provider value={apiSignal}>
                <I18nContext.Provider value={i18nSignal}>
                    {props.children}
                </I18nContext.Provider>
            </ApiContext.Provider>
        </InfoContext.Provider>
    );
}

export const useInfo = () => useContext(InfoContext)![0]();
export const useApi = () => useContext(ApiContext)![0]();
export const useI18n = () => useContext(I18nContext)![0]();