import type { User } from "@domain/entities/user";
import { faker } from "@faker-js/faker";
import { Loan } from "../../../domain/entities/loan";
import { InMemoryUserRepository } from "../in-memory-user-repository";

function createUser(): User {
    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
    } as User;
}

function createLoan(userId: string): Loan {
    return new Loan(
        faker.string.uuid(),
        userId,
        faker.string.uuid(),
        faker.date.recent(),
    );
}

describe("InMemoryUserRepository", () => {
    let repository: InMemoryUserRepository;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
    });

    it("should save and find a user by id (AAA)", async () => {
        const user = createUser();
        await repository.save(user);
        const foundUser = await repository.findById(user.id);
        expect(foundUser).toEqual(user);
    });

    it("should return null if user is not found (AAA)", async () => {
        const nonExistentId = faker.string.uuid();
        const foundUser = await repository.findById(nonExistentId);
        expect(foundUser).toBeNull();
    });

    it("should add a loan to a user and retrieve it (AAA)", async () => {
        const userId = faker.string.uuid();
        const loan = createLoan(userId);
        await repository.addLoan(userId, loan);
        const userLoans = await repository.findLoansByUser(userId);
        expect(userLoans).toHaveLength(1);
        expect(userLoans[0]).toEqual(loan);
    });

    it("should return an empty array if user has no loans (AAA)", async () => {
        const userId = faker.string.uuid();
        const userLoans = await repository.findLoansByUser(userId);
        expect(userLoans).toEqual([]);
    });

    it("should add multiple loans to a user (AAA)", async () => {
        const userId = faker.string.uuid();
        const loan1 = createLoan(userId);
        const loan2 = createLoan(userId);
        await repository.addLoan(userId, loan1);
        await repository.addLoan(userId, loan2);
        const userLoans = await repository.findLoansByUser(userId);
        expect(userLoans).toHaveLength(2);
        expect(userLoans).toContainEqual(loan1);
        expect(userLoans).toContainEqual(loan2);
    });
});
