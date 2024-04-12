const readlineSync = require("readline-sync");

const users = [
  { username: "user1", password: "password1", balance: 2000, loginAttempts: 0 },
  { username: "user2", password: "password2", balance: 2000, loginAttempts: 0 },
];

let currentUser = null;

function authenticateUser() {
  const username = readlineSync.question("Enter your username: ");
  const password = readlineSync.question("Enter your password: ", {
    hideEchoBack: true,
  });

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    console.log("Invalid username or password.");
    return false;
  }

  currentUser = user;
  return true;
}

function displayMenu() {
  console.log("1. Deposit");
  console.log("2. Withdraw");
  console.log("3. View Balance");
  console.log("4. Transfer Money");
  console.log("5. Logout");
}

function deposit() {
  const amount = parseFloat(readlineSync.question("Enter deposit amount: "));
  if (isNaN(amount) || amount <= 0) {
    console.log("Invalid amount.");
    return;
  }
  currentUser.balance += amount;
  console.log(
    `Deposit successful. Your new balance is $${currentUser.balance}`
  );
}

function withdraw() {
  const amount = parseFloat(readlineSync.question("Enter withdrawal amount: "));
  if (isNaN(amount) || amount <= 0 || amount > currentUser.balance) {
    console.log("Invalid amount or insufficient funds.");
    return;
  }
  currentUser.balance -= amount;
  console.log(
    `Withdrawal successful. Your new balance is $${currentUser.balance}`
  );
}

function viewBalance() {
  console.log(`Your current balance is $${currentUser.balance}`);
}

function transferMoney() {
  const recipient = readlineSync.question("Enter recipient username: ");
  const amount = parseFloat(readlineSync.question("Enter transfer amount: "));
  const recipientUser = users.find((u) => u.username === recipient);
  if (!recipientUser || amount <= 0 || amount > currentUser.balance) {
    console.log("Invalid recipient or amount or insufficient funds.");
    return;
  }
  currentUser.balance -= amount;
  recipientUser.balance += amount;
  console.log(
    `Transfer successful. Your new balance is $${currentUser.balance}`
  );
}

function main() {
  let loginAttempts = 0;
  while (loginAttempts < 3) {
    if (authenticateUser()) {
      console.log(`Welcome, ${currentUser.username}!`);
      let choice;
      do {
        displayMenu();
        choice = readlineSync.question("Enter your choice: ");
        switch (choice) {
          case "1":
            deposit();
            break;
          case "2":
            withdraw();
            break;
          case "3":
            viewBalance();
            break;
          case "4":
            transferMoney();
            break;
          case "5":
            console.log("Logging out...");
            break;
          default:
            console.log("Invalid choice. Please try again.");
        }
      } while (choice !== "5");
      currentUser = null;
      return;
    } else {
      loginAttempts++;
      console.log(`Login attempts left: ${3 - loginAttempts}`);
    }
  }
  console.log("Maximum login attempts reached");
}

main();
