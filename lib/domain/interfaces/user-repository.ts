import type { Loan } from "../entities/loan";
import type { User } from "../entities/user";

export interface UserRepository {
    save(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
    findLoansByUser(userId: string): Promise<Loan[]>;
    addLoan(userId: string, loan: Loan): Promise<void>;
}
