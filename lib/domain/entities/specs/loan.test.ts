import { faker } from "@faker-js/faker";
import { Loan } from "../loan";

describe("Loan Entity", () => {
    it("should create a Loan instance with given properties (AAA)", () => {
        const id = faker.string.uuid();
        const userId = faker.string.uuid();
        const bookId = faker.string.uuid();
        const borrowedAt = faker.date.recent();

        const loan = new Loan(id, userId, bookId, borrowedAt);

        expect(loan.id).toBe(id);
        expect(loan.userId).toBe(userId);
        expect(loan.bookId).toBe(bookId);
        expect(loan.borrowedAt).toBe(borrowedAt);
    });
});
