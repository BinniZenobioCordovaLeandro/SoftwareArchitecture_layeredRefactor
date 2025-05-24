import { Book } from "../../../domain/entities/book";
import { Student, User } from "../../../domain/entities/user";
import { InMemoryBookRepository } from "../../../infrastructure/repositories/in-memory-book-repository";
import { InMemoryUserRepository } from "../../../infrastructure/repositories/in-memory-user-repository";
import {
    ERROR_PREFIX,
    LibraryController,
    SUCCESS_MESSAGE,
    UNKNOWN_ERROR,
} from "../library-controller";

const seedUser = (userRepo: InMemoryUserRepository, userId: string) => {
    userRepo.save(new Student(userId, "Test User"));
};
const seedBook = (
    bookRepo: InMemoryBookRepository,
    bookId: string,
    available = true,
) => {
    bookRepo.save(new Book(bookId, "Test Book"));
};

const setupControllerAndRepos = () => {
    const controller = new LibraryController();
    const userRepo = new InMemoryUserRepository();
    const bookRepo = new InMemoryBookRepository();
    return { controller, userRepo, bookRepo };
};

describe("LibraryController", () => {
    let controller: LibraryController;
    let userRepo: InMemoryUserRepository;
    let bookRepo: InMemoryBookRepository;

    beforeEach(() => {
        ({ controller, userRepo, bookRepo } = setupControllerAndRepos());
    });

    it("should borrow a book successfully", async () => {
        const userId = "user-1";
        const bookId = "book-1";
        seedUser(userRepo, userId);
        seedBook(bookRepo, bookId);

        const result = await controller.borrowBook(userId, bookId);

        expect(result).toMatch(new RegExp(`^${SUCCESS_MESSAGE}.+`));
    });

    it("should return error if user does not exist", async () => {
        const userId = "non-existent-user";
        const bookId = "book-2";
        seedBook(bookRepo, bookId);

        const result = await controller.borrowBook(userId, bookId);

        expect(result).toMatch(new RegExp(`^${ERROR_PREFIX}`));
        expect(result).toContain("User not found");
    });

    it("should return error if book does not exist", async () => {
        const userId = "user-2";
        const bookId = "non-existent-book";
        seedUser(userRepo, userId);

        const result = await controller.borrowBook(userId, bookId);

        expect(result).toMatch(new RegExp(`^${ERROR_PREFIX}`));
        expect(result).toContain("Book not found");
    });

    it("should return UNKNOWN_ERROR for non-Error exceptions", async () => {
        controller.useCase.execute = jest.fn().mockImplementation(() => {
            throw "some string error";
        });

        const result = await controller.borrowBook("user", "book");

        expect(result).toBe(UNKNOWN_ERROR);
    });
});
