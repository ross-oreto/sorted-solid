import { Route } from "./Info";

export default class Api {
    constructor(protected api: string, protected routes: Route[]) {
    }

    public setApi(api: string) {
        this.api = api;
    }

    public setRoutes(routes: Route[]) {
        routes.forEach(r => this.routes.push(r));
    }

    route(name: string): Route|undefined {
        return this.routes.find(it => it.name == name);
    }

    request(name: string, init?: RequestInit): Promise<Response> {
        const route: Route|undefined = this.route(name);
        let uri = name;
        if (route) {
            uri = route.path;
            if (init && !init.method) {
                init.method = route.methods[0];
            } else if (!init) {
                init = {method: route.methods[0]};
            }
        }
        return fetch(`${this.api}/${uri}`, init);
    }

    get(name: string, init?: RequestInit): Promise<Response> {
        if (init) init.method = 'GET';
        else init = { method: 'GET' };
        return this.request(name, init);
    }
    
    post(name: string, init?: RequestInit): Promise<Response> {
        if (init) init.method = 'POST';
        else init = { method: 'POSt' };
        return this.request(name, init);
    } 

    put(name: string, init?: RequestInit): Promise<Response> {
        if (init) init.method = 'PUT';
        else init = { method: 'PUT' };
        return this.request(name, init);
    } 

    delete(name: string, init?: RequestInit): Promise<Response> {
        if (init) init.method = 'DELETE';
        else init = { method: 'DELETE' };
        return this.request(name, init);
    } 
}