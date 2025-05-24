# Domain Model

### User

- **User**: Base entity with common attributes (id, name)
- **Student**: Can borrow up to 3 books
- **Teacher**: Can borrow up to 5 books

### Book

Represents a book in the library with attributes:
- ID
- Title

## Repository Interfaces

### UserRepository
- Defines methods to save and retrieve user entities

### BookRepository
- Defines methods to save, retrieve, and update book entities

## Domain Rules

1. Students can borrow a maximum of 3 books
2. Teachers can borrow a maximum of 5 books
3. A book can only be borrowed by one user at a time
4. Users can only borrow available books
