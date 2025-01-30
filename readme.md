# Quiz Game

## Introduction

Welcome to the Quiz Game! This is a Node.js command-line quiz game where you can test your knowledge in different topics such as Network or JavaScript. The game asks multiple-choice questions based on the selected topic and level, tracks your score, and provides explanations for the questions. You can also review the questions you answered incorrectly at the end.

## Features

- **Topic Selection**: Choose from different topics like Network, JavaScript, and more.
- **Level Selection**: Select the difficulty level for each topic: Beginner, Intermediate, or Advanced.
- **Interactive Quiz**: Answer multiple-choice questions with a simple CLI interface.
- **Results and Feedback**: Receive a score based on your correct answers and explanations for each question.
- **Review Incorrect Answers**: See which questions you answered incorrectly and get correct answers and explanations.
- **Retry Option**: You can play the quiz again after finishing, or exit the game at any time.

## Requirements

- Node.js (version 14 or above)
- npm (Node package manager)

## Run the Quiz 
1. Run this command on the terminal:
    ```bash
    npx meefr-quiz-test
    ```

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Meefr/QuizGame-CLI
   ```

2. Navigate into the project directory:

   ```bash
   cd QuizGame-CLI
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

## Usage

1. Run the game by executing the following command:

   ```bash
   node index.js
   ```

2. Follow the prompts to select a topic, level, and answer the questions.
3. At the end of the quiz, you'll get a score and a chance to review any incorrect answers.
4. You can choose to play again or exit.

## Game Flow

- You start by selecting a topic.
- If the topic is JavaScript, you'll choose a level: Beginner, Intermediate, or Advanced.
- The game will ask multiple-choice questions, and you'll select your answer.
- After answering, the game will tell you if you were correct or incorrect and give an explanation.
- At the end of the quiz, you'll be given your score.
- If you answered all questions correctly, a special secret message will be revealed.
- You'll also have the option to review any incorrect answers and retry the quiz.

## Code Structure

- `QuizGame`: The main class that manages the game logic, including adding questions, asking questions, and calculating the score.
- `NetworkQuestions` and `JSquestions`: Object storing questions for each topic and level.
- `main()`: The function that runs the game and starts the process.

## Example Output

```
Welcome To Meefr Game!
No cheating. Results at the end. Ready to play?
You got 3 questions correct out of 5!
```

## Libraries Used

- **@clack/prompts**: To create interactive prompts in the CLI.
- **picocolors**: For adding color to text in the CLI.
- **node:timers/promises**: For adding delays (to simulate loading and spinning effects).

## Contributing

Feel free to fork the project, make changes, and open pull requests! Contributions are welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy the game, and test your knowledge!