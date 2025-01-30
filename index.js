#!/usr/bin/env node

import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";

let totalCorrect = 0;
let wrongQuestionsIndex = [];
let again = false;

class QuizGame {
  constructor() {
    this.totalCorrect = 0;
    this.wrongQuestionsIndex = [];
    this.again = true;
    this.questions = {};
    this.topics = [];
  }
  addNewQuestion(topic, question, level) {
    if (!this.questions[topic]) {
      console.error("no existing topic!");
      return;
    }
    if (!this.questions[topic][level]) {
      console.error("no existing level!");
      return;
    }
    this.questions[topic][level].push(question);
  }
  addQuestions(topicValue, topicLabel, questions) {
    this.topics.push({ value: topicValue, label: topicLabel });
    this.questions[topicValue] = { ...questions };
  }

  async askQuestion(question, index) {
    const options = [];
    question.options.forEach((answer) => {
      options.push({ value: answer, label: answer });
    });
    const answer = await p.select({
      message: `${question.question}${
        question.code ? `\n${question.code}` : ""
      }`,
      initialValue: "1",
      options: options,
    });
    const s = p.spinner();
    s.start();
    await setTimeout(1000);
    s.stop();
    if (answer === question.answer) {
      this.totalCorrect++;
    } else {
      this.wrongQuestionsIndex.push(index);
    }
  }

  async test() {
    const topic = await p.select({
      message: "Which Topic do you want?",
      options: this.topics.map((topic) => topic),
    });
    console.log(topic);

    let level = "beginner";
    const local_questions = this.questions[topic];
    console.log(local_questions);

    if (topic === "js") {
      level = await p.select({
        message: "Which level do you want ?",
        options: [
          { value: "beginner", label: "beginner" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
        ],
      });
    }
    for (let i = 0; i < local_questions[level].length; i++) {
      await this.askQuestion(local_questions[level][i], i);
    }
    const score = this.questions[topic][level].length
    // Decide what ending screen to show based on how many questions user answered correctly
    p.outro(
      `${color.bgMagenta(
        color.black(
          `You got ${this.totalCorrect} questions correct! out of ${score}`
        )
      )}`
    );

    if (this.totalCorrect == score) {
      const s = p.spinner();
      s.start("Generating secret message");
      await setTimeout(5000);
      s.stop();
      p.outro(
        `${color.bgMagenta(
          color.black(
            ` MEEFR is stands for [Mohamed Essam Eldeen Fahmy Elramah] `
          )
        )}`
      );
    } else {
      const s = p.spinner();
      s.start();
      await setTimeout(3000);
      s.stop();
      const showQuestions = await p.select({
        message: "Want to see the questions you answered wrong?",
        options: [
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ],
      });
      if (showQuestions) {
        await p.outro(
          color.bgMagenta(
            color.black(
              this.wrongQuestionsIndex
                .map((i) => {
                  return `
                  
            Questions: ${local_questions[level][i].question}
            ${local_questions[level][i].code ?local_questions[level][i].code :"" }`;
                })
                .join("\n")
            )
          )
        );
        const showAnswers = await p.select({
          message: "Want to see answers ?",
          options: [
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ],
        });
        if (showAnswers) {
          await p.outro(
            color.bgMagenta(
              color.black(
                this.wrongQuestionsIndex
                  .map((i) => {
                    return `
                Questions: ${local_questions[level][i].question}
                ${local_questions[level][i].code?local_questions[level][i].code:""}
                Correct answer is: ${local_questions[level][i].answer}
                Explanation:
                ${local_questions[level][i].explanation}
                          `;
                  })
                  .join("\n")
              )
            )
          );
        }
      }
    }
    this.again = await p.select({
      message: "want to test yourself again? ",
      options: [
        { value: true, label: "yes" },
        { value: false, label: "no" },
      ],
    });
  }

  async start() {
    p.intro(`${color.bgMagenta(color.black(" Welcome To Meefr Game!"))}`);
    const readyToPlay = await p.select({
      message: "No cheating. Results at the end. Ready to play?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    });

    if (readyToPlay === "yes") {
      do {
        await this.test();
        this.totalCorrect = 0;
        this.wrongQuestionsIndex = [];
      } while (this.again);
    } else {
      this.again = false;
      p.outro(`${color.bgMagenta(color.black(` NOOB! `))}`);
    }
  }
}

async function main() {
  const NetworkQuestions = {
    beginner: [
      {
        question: "What is the primary function of a network?",
        options: [
          "To allow devices to communicate over the internet",
          "To connect servers to databases",
          "To transfer files between computers",
          "To store data on the cloud",
        ],
        answer: "To allow devices to communicate over the internet",
        explanation:
          "Networks allow devices to exchange data and communicate, especially over the internet.",
      },
      {
        question: "Which of the following is NOT a common type of network?",
        options: ["LAN", "WAN", "MAN", "HTTP"],
        answer: "HTTP",
        explanation:
          "HTTP (Hypertext Transfer Protocol) is not a type of network but a protocol used for communication over the web.",
      },
      {
        question:
          "Which HTTP method is typically used to retrieve data from a server?",
        options: ["POST", "GET", "PUT", "DELETE"],
        answer: "GET",
        explanation:
          "The GET method is used to retrieve data from the server in HTTP requests.",
      },
      {
        question: "What is the key difference between HTTP and HTTPS?",
        options: [
          "HTTPS is faster than HTTP",
          "HTTPS includes encryption for secure communication, while HTTP does not",
          "HTTP can only be used on mobile devices",
          "HTTP uses HTTP2 while HTTPS uses HTTP1",
        ],
        answer:
          "HTTPS includes encryption for secure communication, while HTTP does not",
        explanation:
          "HTTPS ensures data security by encrypting communication between the client and server, unlike HTTP.",
      },
      {
        question: "What is the main difference between IPv4 and IPv6?",
        options: [
          "IPv4 uses hexadecimal notation, while IPv6 uses decimal notation",
          "IPv6 uses hexadecimal notation, while IPv4 uses decimal notation",
          "IPv4 supports more addresses than IPv6",
          "IPv6 uses IPv4 addressing",
        ],
        answer:
          "IPv6 uses hexadecimal notation, while IPv4 uses decimal notation",
        explanation:
          "IPv6 addresses are written in hexadecimal format, while IPv4 addresses are written in decimal format.",
      },
      {
        question: "How many unique IP addresses are possible with IPv4?",
        options: [
          "2^32 = 4.3 billion",
          "2^64 = 18 quintillion",
          "2^128 = 340 undecillion",
          "None of the above",
        ],
        answer: "2^32 = 4.3 billion",
        explanation:
          "IPv4 allows for a total of approximately 4.3 billion unique addresses (2^32).",
      },
      {
        question: "What is the primary role of the DNS?",
        options: [
          "To store data on a server",
          "To resolve domain names into IP addresses",
          "To compress data for transmission",
          "To cache data for quicker access",
        ],
        answer: "To resolve domain names into IP addresses",
        explanation:
          "The Domain Name System (DNS) is responsible for converting human-readable domain names into IP addresses.",
      },
      {
        question:
          "Which of the following DNS records maps a domain name to an IPv6 address?",
        options: ["A record", "CNAME record", "AAAA record", "MX record"],
        answer: "AAAA record",
        explanation: "An AAAA record maps a domain name to an IPv6 address.",
      },
      {
        question:
          "Which type of API is the most commonly used for web services?",
        options: ["SOAP", "REST", "XML-RPC", "JSON-RPC"],
        answer: "REST",
        explanation:
          "REST (Representational State Transfer) is the most commonly used architectural style for web services.",
      },
      {
        question:
          "What is a common format used for data transfer in RESTful APIs?",
        options: ["XML", "CSV", "JSON", "HTML"],
        answer: "JSON",
        explanation:
          "JSON (JavaScript Object Notation) is widely used for data transfer in RESTful APIs due to its simplicity.",
      },
      {
        question:
          "Which of the following is the correct syntax to create a server in Express Node.js?",
        options: [
          "const server = new express();",
          "const app = express();",
          "app.listen(3000);",
          "const express = require('express');",
        ],
        answer: "const app = express();",
        explanation:
          "The correct syntax to create a server in Express is `const app = express();`.",
      },
      {
        question:
          "What is the purpose of `app.listen(PORT, callback)` in Express?",
        options: [
          "To start the server and listen for incoming requests on a specific port",
          "To connect the server to a database",
          "To define the HTTP request method",
          "To handle routing",
        ],
        answer:
          "To start the server and listen for incoming requests on a specific port",
        explanation:
          "`app.listen()` binds the server to the specified port and listens for client requests.",
      },
      {
        question:
          "Which tool is commonly used for testing APIs in a development environment?",
        options: ["VS Code", "Postman", "Docker", "Nginx"],
        answer: "Postman",
        explanation:
          "Postman is a popular tool for testing APIs and making HTTP requests during development.",
      },
      {
        question:
          "What does the `Status Code 200` indicate in an HTTP response?",
        options: [
          "Request failed",
          "Request successful",
          "Server error",
          "Unauthorized access",
        ],
        answer: "Request successful",
        explanation:
          "A 200 status code indicates that the HTTP request was successful and the server returned the requested resource.",
      },
      {
        question:
          "What is the purpose of using Promises or Async/Await in API calls?",
        options: [
          "To handle errors in synchronous code",
          "To ensure that API calls are made in a sequential order",
          "To make the code run faster",
          "To handle asynchronous operations like API calls more easily",
        ],
        answer: "To handle asynchronous operations like API calls more easily",
        explanation:
          "Promises and async/await help manage asynchronous code by providing a cleaner and more readable approach.",
      },
    ]
  };
  const JSquestions = {
    beginner: [
      {
        question: "What will the following code output?",
        code: "console.log(typeof 42);",
        answer: '"number"',
        options: ['"string"', '"number"', '"object"', '"undefined"'],
        explanation: "The typeof operator returns 'number' for numeric values.",
      },
      {
        question: "What does the following code output?",
        code: "console.log([1, 2, 3].length);",
        answer: "3",
        options: ["1", "2", "3", "undefined"],
        explanation:
          "The length property returns the number of elements in an array.",
      },
      {
        question: "What does this code return?",
        code: "console.log(typeof null);",
        answer: '"object"',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        explanation:
          "In JavaScript, null is considered an object type due to a legacy bug.",
      },
      {
        question: "What does the following function return?",
        code: "function sum(a, b) { return a + b; } console.log(sum(3, 4));",
        answer: "7",
        options: ["3", "4", "7", "undefined"],
        explanation: "The function adds two numbers and returns their sum.",
      },
      {
        question: "What does this code return?",
        code: "console.log([].length);",
        answer: "0",
        options: ["0", "1", "undefined", "null"],
        explanation: "An empty array has a length of 0.",
      },
      {
        question: "What will this code output?",
        code: "let x; console.log(x);",
        answer: "undefined",
        options: ["null", '"x"', "undefined", "0"],
        explanation:
          "A declared variable without an assigned value defaults to undefined.",
      },
      {
        question: "What is the result of this code?",
        code: 'console.log(5 + "5");',
        answer: '"55"',
        options: ["10", '"55"', "5", '"5"'],
        explanation:
          "JavaScript performs string concatenation when one of the operands is a string.",
      },
    ],
    intermediate: [
      {
        question: "What will this code output?",
        code: "const x = 5; x = 10; console.log(x);",
        answer: "Error",
        options: ["5", "10", "undefined", "Error"],
        explanation: "Reassigning a constant variable throws a TypeError.",
      },
      {
        question: "What does the following code output?",
        code: "let a = 2; let b = a++; console.log(b);",
        answer: "2",
        options: ["1", "2", "3", "undefined"],
        explanation:
          "The postfix increment returns the current value before incrementing.",
      },
      {
        question: "What does this code return?",
        code: "console.log([1, 2, 3].splice(1, 1));",
        answer: "[2]",
        options: ["[2]", "[1]", "[3]", "undefined"],
        explanation:
          "The splice method removes and returns the specified elements.",
      },
      {
        question: "What does this code return?",
        code: 'console.log("5" - 3);',
        answer: "2",
        options: ["2", '"53"', "NaN", '"2"'],
        explanation: "JavaScript converts strings to numbers for subtraction.",
      },
      {
        question: "What is the result of this code?",
        code: "console.log(typeof NaN);",
        answer: '"number"',
        options: ['"number"', '"NaN"', '"undefined"', '"object"'],
        explanation:
          "NaN is a special numeric value representing 'Not-a-Number.'",
      },
    ],
    advanced: [
      {
        question: "What will this code output?",
        code: 'function foo() \n{\n return { bar: "hello" }; \n}\n console.log(foo().bar);',
        answer: '"hello"',
        options: ["undefined", "null", '"hello"', "Error"],
        explanation:
          "The function returns an object, and the 'bar' property is accessed correctly.",
      },
      {
        question: "What does this code do?",
        code: "(() => { console.log('Immediately Invoked'); })();",
        answer: "Logs 'Immediately Invoked'",
        options: [
          "Error",
          "undefined",
          "Logs 'Immediately Invoked'",
          "Does nothing",
        ],
        explanation:
          "An IIFE (Immediately Invoked Function Expression) runs immediately after being defined.",
      },
      {
        question: "What does this code return?",
        code: "console.log(0.1 + 0.2 === 0.3);",
        answer: "false",
        options: ["true", "false", "undefined", "Error"],
        explanation:
          "Due to floating-point precision issues, 0.1 + 0.2 does not equal 0.3 exactly.",
      },
      {
        question: "What will the output be?",
        code: "console.log([] + []);",
        answer: '""',
        options: ["[]", "undefined", '""', "Error"],
        explanation:
          "When arrays are added, they are coerced into strings, resulting in an empty string.",
      },
      {
        question: "What is the result of this code?",
        code: "console.log(typeof (() => {}));",
        answer: '"function"',
        options: ['"function"', '"object"', '"undefined"', '"arrow"'],
        explanation:
          "Arrow functions are still considered functions in JavaScript.",
      },
    ]
  };
  const game = new QuizGame();
  game.addQuestions("networks", "Networks", NetworkQuestions);
  game.addQuestions("js", "JavaScript", JSquestions);
  game.start();
}


main().catch(console.error);
