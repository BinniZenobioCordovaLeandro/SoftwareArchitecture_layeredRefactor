import { faker } from "@faker-js/faker";
import { Student, Teacher } from "../user";

describe("User Entities", () => {
    describe("Student", () => {
        it("should create a Student with given id and name", () => {
            const id = faker.string.uuid();
            const name = faker.person.fullName();

            const student = new Student(id, name);

            expect(student.id).toBe(id);
            expect(student.name).toBe(name);
        });

        it("should return loan limit of 3 for Student", () => {
            const student = new Student(
                faker.string.uuid(),
                faker.person.fullName(),
            );

            const loanLimit = student.getLoanLimit();

            expect(loanLimit).toBe(3);
        });
    });

    describe("Teacher", () => {
        it("should create a Teacher with given id and name", () => {
            const id = faker.string.uuid();
            const name = faker.person.fullName();

            const teacher = new Teacher(id, name);

            expect(teacher.id).toBe(id);
            expect(teacher.name).toBe(name);
        });

        it("should return loan limit of 5 for Teacher", () => {
            const teacher = new Teacher(
                faker.string.uuid(),
                faker.person.fullName(),
            );

            const loanLimit = teacher.getLoanLimit();

            expect(loanLimit).toBe(5);
        });
    });
});
