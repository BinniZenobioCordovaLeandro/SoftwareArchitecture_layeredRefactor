import type { Book } from "@domain/entities/book";
import { InMemoryBookRepository } from "../in-memory-book-repository";

const createBook = (
    id: string,
    title: string,
    author: string,
    year: number,
): Book => ({
    id,
    title,
    author,
    year,
});

describe("InMemoryBookRepository", () => {
    let repository: InMemoryBookRepository;

    beforeEach(() => {
        repository = new InMemoryBookRepository();
    });

    it("should save a book and retrieve it by id", async () => {
        const book = createBook("1", "Test Book", "Author", 2024);

        await repository.save(book);
        const found = await repository.findById(book.id);

        expect(found).toEqual(book);
    });

    it("should return null when book is not found", async () => {
        const nonExistentId = "non-existent-id";
        const found = await repository.findById(nonExistentId);

        expect(found).toBeNull();
    });

    it("should overwrite a book with the same id", async () => {
        const book1 = createBook("2", "First Title", "Author1", 2020);
        const book2 = createBook("2", "Second Title", "Author2", 2021);

        await repository.save(book1);
        await repository.save(book2);
        const found = await repository.findById(book2.id);

        expect(found).toEqual(book2);
    });

    it("should handle saving multiple books and retrieving them", async () => {
        const bookA = createBook("A", "Book A", "AuthorA", 2018);
        const bookB = createBook("B", "Book B", "AuthorB", 2019);

        await repository.save(bookA);
        await repository.save(bookB);
        const foundA = await repository.findById(bookA.id);
        const foundB = await repository.findById(bookB.id);

        expect(foundA).toEqual(bookA);
        expect(foundB).toEqual(bookB);
    });
});
