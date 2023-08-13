// Command Coding Exercise
// Implement the Account.process()  method to process different account commands.
//
//   The rules are obvious:
//
//   success indicates whether the operation was successful
//
// You can only withdraw money if you have enough in your account

let Action = Object.freeze({
  deposit: 0,
  withdraw: 1
});

class Command
{
  constructor(action, amount)
  {
    this.action = action;
    this.amount = amount;
    this.success = false;
  }

  call(acc) {
    switch (this.action) {
      case Action.deposit:
        this.success = acc.deposit(this.amount);
        break;
      case Action.withdraw:
        this.success = acc.withdraw(this.amount);
        break;
    }

    return this.success;
  }
}

class Account
{
  constructor()
  {
    this.balance = 0;
  }

  process(cmd)
  {
    if (!cmd) {
      throw new Error('Command not found');
    }

    return cmd.call(this)
  }

  deposit(amount) {
    this.balance += amount;
    return true
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      return true
    }
    return false
  }

  toString() {
    return `Balance: ${this.balance}`;
  }
}

const acc = new Account();
const cmd1 = new Command(Action.deposit, 100);
const cmd2 = new Command(Action.withdraw, 50);
acc.process(cmd1);
console.log (acc.toString());
acc.process(cmd2);
console.log (acc.toString());

