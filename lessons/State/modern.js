/**
 *
 State Coding Exercise
 A combination lock is a lock that opens after the right digits have been entered. A lock is preprogrammed with a combination (e.g., 12345 ) and the user is expected to enter this combination to unlock the lock.

 The lock has a Status field that indicates the state of the lock. The rules are:

 If the lock has just been locked (or at startup), the status is LOCKED.

 If a digit has been entered, that digit is shown on the screen. As the user enters more digits, they are added to Status.

 If the user has entered the correct sequence of digits, the lock status changes to OPEN.

 If the user enters an incorrect sequence of digits, the lock status changes to ERROR.

 Please implement the CombinationLock  class to enable this behavior. Be sure to test both correct and incorrect inputs.

 Here is an example unit test for the lock:

 let cl = new CombinationLock([1, 2, 3, 4, 5]);
 expect(cl.status).toEqual('LOCKED');
 cl.enterDigit(1);
 expect(cl.status).toEqual('1');
 cl.enterDigit(2);
 expect(cl.status).toEqual('12');
 cl.enterDigit(3);
 expect(cl.status).toEqual('123');
 cl.enterDigit(4);
 expect(cl.status).toEqual('1234');
 cl.enterDigit(5);
 */

const STATUSES = Object.freeze({
  LOCKED: 'LOCKED',
  OPEN: 'OPEN',
  ERROR: 'ERROR'
})

class CombinationLock
{
  constructor(combination)
  {
    this.combination = combination;
    this.status = STATUSES.LOCKED;
    this.combLength = combination.length;
    this.currentCombination = [];
  }

  reset()
  {
    this.status = STATUSES.LOCKED;
  }

  checkCombination() {

  }

  enterDigit(digit)
  {
    this.currentCombination.push(digit);
    if (this.currentCombination.length < this.combLength) {
      this.status = this.currentCombination.join('');
    } else {
      this.status = this.currentCombination.join('') === this.combination.join('') ? STATUSES.OPEN : STATUSES.ERROR;
    }
  }
}

// Sample unit test
let cl = new CombinationLock([1, 2, 3, 4, 5]);
console.log(cl.status); // Output: LOCKED
cl.enterDigit(1);
console.log(cl.status); // Output: 1
cl.enterDigit(2);
console.log(cl.status); // Output: 12
cl.enterDigit(3);
console.log(cl.status); // Output: 123
cl.enterDigit(4);
console.log(cl.status); // Output: 1234
cl.enterDigit(5);
console.log(cl.status); // Output: OPEN
