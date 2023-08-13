/**
 * Interpreter Coding Exercise
 * You are asked to write an expression processor for simple numeric expressions with the following constraints:
 *
 * Expressions use integral values (e.g., '13'), single-letter variables defined in Variables, as well as + and - operators only
 *
 * There is no need to support braces or any other operations
 *
 * If a variable is not found in variables  (or if we encounter a variable with >1 letter, e.g. ab), the evaluator returns 0 (zero)
 *
 * In case of any parsing failure, evaluator returns 0
 *
 * Example:
 *
 * calculate("1+2+3")  should return 6
 *
 * calculate("1+2+xy")  should return 0
 *
 * calculate("10-2-x")  when x=3 is in variables  should return 5
 */

class ExpressionProcessor {
  constructor() {
    this.variables = {};
  }

  calculate(expression) {
    const tokens = expression.split(/[+\-]/);
    let result = 0;
    let operator = '+';

    for (let token of tokens) {
      token = token.trim();

      if (token.length === 1 && /[a-zA-Z]/.test(token)) {
        const value = this.variables[token] || 0;
        if (operator === '+') {
          result += value;
        } else if (operator === '-') {
          result -= value;
        }
      } else if (/^\d+$/.test(token)) {
        const value = parseInt(token, 10);
        if (operator === '+') {
          result += value;
        } else if (operator === '-') {
          result -= value;
        }
      } else {
        return 0; // Parsing failure, return 0
      }

      if (expression.indexOf(token) > -1) {
        operator = expression.charAt(expression.indexOf(token) + token.length);
      }
    }

    return result;
  }

  setVariable(variable, value) {
    if (variable.length === 1 && /[a-zA-Z]/.test(variable)) {
      this.variables[variable] = value;
    }
  }
}

const processor = new ExpressionProcessor();
console.log(processor.calculate("1+2+3")); // Output: 6
console.log(processor.calculate("1+2+xy")); // Output: 0
processor.setVariable('x', 3);
console.log(processor.calculate("10-2-x")); // Output: 5
