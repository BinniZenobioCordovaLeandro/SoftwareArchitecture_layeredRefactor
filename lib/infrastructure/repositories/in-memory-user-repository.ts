import type { Loan } from "../../domain/entities/loan";
import type { User } from "../../domain/entities/user";
import type { UserRepository } from "../../domain/interfaces/user-repository";

const users: Map<string, User> = new Map();
const loans: Map<string, Loan[]> = new Map();

export class InMemoryUserRepository implements UserRepository {
    async save(user: User): Promise<void> {
        users.set(user.id, user);
    }

    async findById(id: string): Promise<User | null> {
        return users.get(id) || null;
    }

    async findLoansByUser(userId: string): Promise<Loan[]> {
        return loans.get(userId) || [];
    }

    async addLoan(userId: string, loan: Loan): Promise<void> {
        if (!loans.has(userId)) {
            loans.set(userId, []);
        }
        loans.get(userId)?.push(loan);
    }
}
