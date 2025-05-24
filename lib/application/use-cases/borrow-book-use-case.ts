import { Loan } from "../../domain/entities/loan";
import type { BookRepository } from "../../domain/interfaces/book-repository";
import type { UserRepository } from "../../domain/interfaces/user-repository";

export class BorrowBookUseCase {
    constructor(
        private userRepository: UserRepository,
        private bookRepository: BookRepository,
    ) {}

    async execute(userId: string, bookId: string): Promise<Loan> {
        const user = await this.userRepository.findById(userId);
        const book = await this.bookRepository.findById(bookId);

        if (!user) {
            throw new Error("User not found");
        }
        if (!book) {
            throw new Error("Book not found");
        }

        const userLoans = await this.userRepository.findLoansByUser(userId);
        const userLoanLimit = user.getLoanLimit();
        if (userLoans.length >= userLoanLimit) {
            throw new Error(
                `Loan limit exceeded for user ${user.name} (ID: ${user.id}): currently borrowing ${userLoans.length} books`,
            );
        }

        const loan = new Loan(
            `user-${user.id}_LOAN-${Date.now()}`,
            userId,
            bookId,
            new Date(),
        );

        await this.userRepository.addLoan(userId, loan);
        return loan;
    }
}
