export default class I18n {
    constructor(protected i18n: Map<string, string>) {
    }

    addAll(i18n: Map<string, string>) {
        i18n.forEach((v, k) => this.i18n.set(k, v));
    }

    t(key: string): string {
        const value = this.i18n.get(key);
        return value ? value : key;
    }
}