
export default class User {
    constructor(public username: string, public email: string, public profile: Profile) {
    }

    name(): string {
        return `${this.profile.firstName} ${this.profile.lastName}`;
    }
}

export class Profile {
    constructor(public firstName: string, public lastName: string) {
    }
}