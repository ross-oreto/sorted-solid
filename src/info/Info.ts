export default class Info {
    constructor(public version: string
        , public javaVersion: string
        , public vertx: string
        , public mode: string
        , public debug: boolean
        , public api: string
        , public routes: Route[]
        , public i18n: Map<string, string>) {
    }
}

export class Route {
    constructor(public name: string, public path: string, public methods: string[], public group: string) {
    }
}