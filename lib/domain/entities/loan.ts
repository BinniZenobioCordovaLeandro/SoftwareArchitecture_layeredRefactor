export class Loan {
    constructor(
        public id: string,
        public userId: string,
        public bookId: string,
        public borrowedAt: Date,
    ) {}
}
