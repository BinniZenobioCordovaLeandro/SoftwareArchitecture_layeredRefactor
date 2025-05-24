import { BorrowBookUseCase } from "../../application/use-cases/borrow-book-use-case";
import { InMemoryBookRepository } from "../../infrastructure/repositories/in-memory-book-repository";
import { InMemoryUserRepository } from "../../infrastructure/repositories/in-memory-user-repository";

export const SUCCESS_MESSAGE = "Book borrowed successfully. Loan ID: ";
export const ERROR_PREFIX = "Error: ";
export const UNKNOWN_ERROR = "An unknown error occurred.";

export class LibraryController {
    private useCase: BorrowBookUseCase;

    constructor() {
        const userRepository = new InMemoryUserRepository();
        const bookRepository = new InMemoryBookRepository();
        this.useCase = new BorrowBookUseCase(userRepository, bookRepository);
    }

    async borrowBook(userId: string, bookId: string): Promise<string> {
        try {
            const loan = await this.useCase.execute(userId, bookId);
            return `${SUCCESS_MESSAGE}${loan.id}`;
        } catch (error) {
            if (error instanceof Error) {
                return `${ERROR_PREFIX}${error.message}`;
            }
            return UNKNOWN_ERROR;
        }
    }
}
