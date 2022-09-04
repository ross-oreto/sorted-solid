/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import Down from './Down';
import Info, { Route } from './info/Info';
import { InfoProvider } from './info/InfoContext';

const root = document.getElementById('root') as HTMLElement; 
fetch(import.meta.env.VITE_api + '/info/all')
.then((response) =>  
  response.ok 
    ? response.json() 
    : renderDown(response.status) 
).then(data => render(() => <InfoProvider info={mapToInfo(data)}><App/></InfoProvider>, root))
.catch(error => renderDown(error));

function renderDown(error: any) {
    console.info(error);
    const lang =  navigator.languages[0];
    let message = "";
    
    if (lang?.startsWith('en'))
        message = "Under construction, please try again later";
    else if (lang?.startsWith("es"))
        message = "En construcción, inténtalo de nuevo más tarde";
    else
        message = "Under construction, please try again later";

    render(() => <Down message={message} />, root); 
}

function mapToInfo(json: any): Info {
    const routes: Route[] = [];
    for (var route of json.routes) {
        routes.push(new Route(route.name, route.path, route.methods, route.group));
    }

    const i18n: Map<string, string> = new Map();
    for (const [k, v] of Object.entries(json.i18n)) {
        i18n.set(k, String(v));
    }
    return new Info(json.version
        , json.javaVersion
        , json.vertx
        , json.mode
        , json.debug
        , import.meta.env.VITE_api
        , routes
        , i18n);
}
