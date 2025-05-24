import type { BookRepository } from "@domain/interfaces/book-repository";
import type { UserRepository } from "@domain/interfaces/user-repository";
import { faker } from "@faker-js/faker";
import { Loan } from "../../../domain/entities/loan";
import { Student } from "../../../domain/entities/user";
import { BorrowBookUseCase } from "../borrow-book-use-case";

describe("BorrowBookUseCase", () => {
    let userRepository: jest.Mocked<UserRepository>;
    let bookRepository: jest.Mocked<BookRepository>;
    let borrowBookUseCase: BorrowBookUseCase;

    const mockUser = new Student("user-1", "John Doe");

    const mockBook = {
        id: "book-1",
        title: "Clean Code",
    };

    beforeEach(() => {
        userRepository = {
            save: jest.fn(),
            findById: jest.fn(),
            findLoansByUser: jest.fn(),
            addLoan: jest.fn(),
        };
        bookRepository = {
            findById: jest.fn(),
            save: jest.fn(),
        };
        borrowBookUseCase = new BorrowBookUseCase(
            userRepository,
            bookRepository,
        );
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it("should successfully borrow a book when user and book exist and under loan limit", async () => {
        userRepository.findById.mockResolvedValue(mockUser);
        bookRepository.findById.mockResolvedValue(mockBook);
        userRepository.findLoansByUser.mockResolvedValue([]);
        userRepository.addLoan.mockResolvedValue(undefined);

        const loan = await borrowBookUseCase.execute("user-1", "book-1");

        expect(loan).toBeInstanceOf(Loan);
        expect(loan.userId).toBe("user-1");
        expect(loan.bookId).toBe("book-1");
        expect(userRepository.addLoan).toHaveBeenCalledWith(
            "user-1",
            expect.any(Loan),
        );
    });

    it("should throw error if user does not exist", async () => {
        userRepository.findById.mockResolvedValue(null);

        await expect(
            borrowBookUseCase.execute("user-404", "book-1"),
        ).rejects.toThrow("User not found");
    });

    it("should throw error if book does not exist", async () => {
        userRepository.findById.mockResolvedValue(mockUser);
        bookRepository.findById.mockResolvedValue(null);

        await expect(
            borrowBookUseCase.execute("user-1", "book-404"),
        ).rejects.toThrow("Book not found");
    });

    it("should throw error if user has reached loan limit", async () => {
        userRepository.findById.mockResolvedValue(mockUser);
        bookRepository.findById.mockResolvedValue(mockBook);
        userRepository.findLoansByUser.mockResolvedValue(
            Array.from(
                { length: 3 },
                (_, i) =>
                    new Loan(
                        `loan-${i + 1}`,
                        "user-1",
                        faker.string.uuid(),
                        faker.date.recent(),
                    ),
            ),
        );

        await expect(
            borrowBookUseCase.execute("user-1", "book-1"),
        ).rejects.toThrow();
    });

    it("should call addLoan with correct parameters", async () => {
        userRepository.findById.mockResolvedValue(mockUser);
        bookRepository.findById.mockResolvedValue(mockBook);
        userRepository.findLoansByUser.mockResolvedValue([]);
        userRepository.addLoan.mockResolvedValue(undefined);

        const loan = await borrowBookUseCase.execute("user-1", "book-1");

        expect(userRepository.addLoan).toHaveBeenCalledWith(
            "user-1",
            expect.objectContaining({
                userId: "user-1",
                bookId: "book-1",
            }),
        );
    });

    it("should create a loan with a unique id and current date", async () => {
        userRepository.findById.mockResolvedValue(mockUser);
        bookRepository.findById.mockResolvedValue(mockBook);
        userRepository.findLoansByUser.mockResolvedValue([]);
        userRepository.addLoan.mockResolvedValue(undefined);

        const before = Date.now();
        const loan = await borrowBookUseCase.execute("user-1", "book-1");
        const after = Date.now();

        expect(loan.id).toMatch(/^user-user-1_LOAN-\d+$/);
        expect(loan.borrowedAt.getTime()).toBeGreaterThanOrEqual(before);
        expect(loan.borrowedAt.getTime()).toBeLessThanOrEqual(after);
    });
});
