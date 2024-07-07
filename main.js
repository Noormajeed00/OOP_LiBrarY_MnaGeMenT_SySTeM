#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
class Member {
    constructor(name) {
        this.borrowedBooks = [];
        this.name = name;
    }
    borrowBook(book) {
        this.borrowedBooks.push(book);
    }
}
class Librarian {
    constructor(name, library) {
        this.name = name;
        this.library = library;
    }
    addBook(book) {
        this.library.books.push(book);
    }
}
class Library {
    constructor() {
        this.books = [];
        this.members = [];
        this.librarians = [];
    }
    addMember(member) {
        this.members.push(member);
    }
    addLibrarian(librarian) {
        this.librarians.push(librarian);
    }
    findBook(title) {
        return this.books.find((book) => book.title === title);
    }
}
const library = new Library();
const programStart = (library) => __awaiter(void 0, void 0, void 0, function* () {
    do {
        console.log(chalk_1.default.bold.italic.bgYellow("\n\tWelcome to Noor Shaikh's - Library Management System  \n\t"));
        const ans = yield inquirer_1.default.prompt([
            {
                name: "select",
                type: "list",
                message: "Who are you?",
                choices: ["Librarian", "Member", "Exit"],
            },
        ]);
        if (ans.select === "Librarian") {
            const librarianAns = yield inquirer_1.default.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter your name:",
                },
                {
                    name: "action",
                    type: "list",
                    message: "What would you like to do?",
                    choices: ["Add Book", "View Books"],
                },
            ]);
            let librarian = library.librarians.find((lib) => lib.name === librarianAns.name);
            if (!librarian) {
                librarian = new Librarian(librarianAns.name, library);
                library.addLibrarian(librarian);
            }
            if (librarianAns.action === "Add Book") {
                const bookAns = yield inquirer_1.default.prompt([
                    {
                        name: "title",
                        type: "input",
                        message: "Enter book title:",
                    },
                    {
                        name: "author",
                        type: "input",
                        message: "Enter book author:",
                    },
                ]);
                const newBook = new Book(bookAns.title, bookAns.author);
                librarian.addBook(newBook);
                console.log(chalk_1.default.bold.bgBlueBright("\n\tBook added successfully. \n"));
            }
            else if (librarianAns.action === "View Books") {
                console.log(chalk_1.default.bold.bgGreenBright("\n\tBooks in the library: \n"));
                console.log(library.books);
            }
        }
        else if (ans.select === "Member") {
            const memberAns = yield inquirer_1.default.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter your name:",
                },
                {
                    name: "action",
                    type: "list",
                    message: "What would you like to do?",
                    choices: ["Borrow Book", "View Borrowed Books"],
                },
            ]);
            let member = library.members.find((mem) => mem.name === memberAns.name);
            if (!member) {
                member = new Member(memberAns.name);
                library.addMember(member);
            }
            if (memberAns.action === "Borrow Book") {
                const bookAns = yield inquirer_1.default.prompt([
                    {
                        name: "title",
                        type: "input",
                        message: "Enter book title:",
                    },
                ]);
                const book = library.findBook(bookAns.title);
                if (book) {
                    member.borrowBook(book);
                    console.log(chalk_1.default.bold.bgCyanBright("\n\tBook borrowed successfully. \n"));
                }
                else {
                    console.log(chalk_1.default.bgRedBright.bold("\n\tBook not found. \n"));
                }
            }
            else if (memberAns.action === "View Borrowed Books") {
                console.log(chalk_1.default.bold.bgMagentaBright("\n\tBorrowed Books: \n"));
                console.log(member.borrowedBooks);
            }
        }
        else if (ans.select === "Exit") {
            console.log(chalk_1.default.bgRed("\n\tThank you for using the Library Management System. \n"));
            process.exit();
        }
    } while (true);
});
programStart(library);
