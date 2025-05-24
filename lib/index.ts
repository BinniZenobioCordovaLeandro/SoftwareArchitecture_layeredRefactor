import { Book } from "./domain/entities/book";
import { Student, Teacher } from "./domain/entities/user";
import { InMemoryBookRepository } from "./infrastructure/repositories/in-memory-book-repository";
import { InMemoryUserRepository } from "./infrastructure/repositories/in-memory-user-repository";
import { LibraryController } from "./presentation/controllers/library-controller";

// Initialize repositories
const userRepository = new InMemoryUserRepository();
const bookRepository = new InMemoryBookRepository();

// Create users and book
userRepository.save(new Student("1", "Alice"));
userRepository.save(new Teacher("2", "Bob"));
bookRepository.save(new Book("101", "Clean Code"));

// Execute use case
const controller = new LibraryController();

(async () => {
    // Scenario 1: Student borrows up to 3 books
    bookRepository.save(new Book("102", "Refactoring"));
    bookRepository.save(new Book("103", "Design Patterns"));
    bookRepository.save(new Book("104", "The Pragmatic Programmer"));

    console.log(await controller.borrowBook("1", "101")); // 1st book - OK
    console.log(await controller.borrowBook("1", "102")); // 2nd book - OK
    console.log(await controller.borrowBook("1", "103")); // 3rd book - OK
    console.log(await controller.borrowBook("1", "104")); // 4th book - Exceeds student limit

    // Scenario 2: Teacher borrows up to 5 books
    bookRepository.save(new Book("105", "Domain-Driven Design"));
    bookRepository.save(
        new Book("106", "Patterns of Enterprise Application Architecture"),
    );
    bookRepository.save(
        new Book("107", "Working Effectively with Legacy Code"),
    );
    bookRepository.save(new Book("108", "Continuous Delivery"));

    console.log(await controller.borrowBook("2", "105")); // 1st book - OK
    console.log(await controller.borrowBook("2", "106")); // 2nd book - OK
    console.log(await controller.borrowBook("2", "107")); // 3rd book - OK
    console.log(await controller.borrowBook("2", "108")); // 4th book - OK
    console.log(await controller.borrowBook("2", "104")); // 5th book - OK
    console.log(await controller.borrowBook("2", "103")); // 6th book - Exceeds teacher limit

    // Scenario 3: User does not exist
    console.log(await controller.borrowBook("3", "101")); // User does not exist

    // Scenario 4: Book does not exist
    console.log(await controller.borrowBook("1", "999")); // Book does not exist

    // Scenario 5: Book already borrowed
    console.log(await controller.borrowBook("1", "101")); // Already borrowed
})();
