import type { Book } from "../entities/book";

export interface BookRepository {
    save(book: Book): Promise<void>;
    findById(id: string): Promise<Book | null>;
}
