export abstract class User {
    constructor(
        public id: string,
        public name: string,
    ) {}

    abstract getLoanLimit(): number;
}

export class Student extends User {
    getLoanLimit(): number {
        return 3;
    }
}

export class Teacher extends User {
    getLoanLimit(): number {
        return 5;
    }
}
