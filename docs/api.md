# API Documentation

## Controllers

### LibraryController

Handles library operations such as borrowing books.

#### Methods

##### `borrowBook(userId: string, bookId: string): Promise<string>`

Processes a request for a user to borrow a book.

**Parameters:**
- `userId`: The ID of the user who wants to borrow the book
- `bookId`: The ID of the book to be borrowed

**Returns:**
- A Promise resolving to a success or error message

**Response Examples:**
- Success: `"Book 'Clean Code' borrowed successfully by Alice"`
- Error (user not found): `"Error: User with ID 3 not found"`
- Error (book not found): `"Error: Book with ID 999 not found"`
- Error (book already borrowed): `"Error: Book 'Clean Code' is already borrowed"`
- Error (borrowing limit): `"Error: Student cannot borrow more than 3 books"`

## Usage Examples

```ts
// Initialize repositories
const userRepository = new InMemoryUserRepository();
const bookRepository = new InMemoryBookRepository();

// Create user and book
userRepository.save(new Student("1", "Alice"));
bookRepository.save(new Book("101", "Clean Code"));

// Execute use case
const controller = new LibraryController();

(async () => {
    console.log(await controller.borrowBook("1", "101")); // "Book 'Clean Code' borrowed successfully by Alice"
})();
```
