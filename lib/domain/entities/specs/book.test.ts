import { faker } from "@faker-js/faker";
import { Book } from "../book";

describe("Book Entity", () => {
    it("should create a Book with all properties", () => {
        const id = faker.string.uuid();
        const title = faker.lorem.words(3);
        const author = faker.person.fullName();
        const year = faker.number.int({ min: 1900, max: 2024 });

        const book = new Book(id, title, author, year);

        expect(book.id).toBe(id);
        expect(book.title).toBe(title);
        expect(book.author).toBe(author);
        expect(book.year).toBe(year);
    });
});
