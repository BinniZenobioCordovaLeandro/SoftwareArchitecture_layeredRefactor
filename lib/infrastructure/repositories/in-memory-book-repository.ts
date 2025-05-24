import type { Book } from "../../domain/entities/book";
import type { BookRepository } from "../../domain/interfaces/book-repository";

const books: Map<string, Book> = new Map();

export class InMemoryBookRepository implements BookRepository {
    async save(book: Book): Promise<void> {
        books.set(book.id, book);
    }

    async findById(id: string): Promise<Book | null> {
        return books.get(id) || null;
    }
}
