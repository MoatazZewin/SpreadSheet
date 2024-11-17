// Object that maps operators to their corresponding arithmetic functions
const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

// Function to evaluate arithmetic expressions using regex matching and infix functions
const infixEval = (str, regex) =>
  str.replace(regex, (_match, arg1, operator, arg2) =>
    infixToFunction[operator](parseFloat(arg1), parseFloat(arg2))
  );

// Evaluates high-precedence operations (multiplication and division) in the string
const highPrecedence = (str) => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  const str2 = infixEval(str, regex);
  return str === str2 ? str : highPrecedence(str2);
};

// Utility functions for various operations
const isEven = (num) => num % 2 === 0;
const sum = (nums) => nums.reduce((acc, el) => acc + el, 0);
const average = (nums) => sum(nums) / nums.length;

// Calculates the median of an array of numbers
const median = (nums) => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
};

// Object mapping spreadsheet function names to their implementations
const spreadsheetFunctions = {
  sum,
  average,
  median,
  even: (nums) => nums.filter(isEven),
  someeven: (nums) => nums.some(isEven),
  everyeven: (nums) => nums.every(isEven),
  firsttwo: (nums) => nums.slice(0, 2),
  lasttwo: (nums) => nums.slice(-2),
  has2: (nums) => nums.includes(2),
  increment: (nums) => nums.map((num) => num + 1),
  random: ([x, y]) => Math.floor(Math.random() * y + x),
  range: (nums) => range(...nums),
  nodupes: (nums) => [...new Set(nums).values()],
  "": (num) => num,
};

// Applies functions to expressions in the string, processing arithmetic and function calls
const applyFunction = (str) => {
  const noHigh = highPrecedence(str);
  const infix = /([\d.]+)([+-])([\d.]+)/;
  const str2 = infixEval(noHigh, infix);
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
  const toNumberList = (args) => args.split(",").map(parseFloat);
  const apply = (fn, args) =>
    spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
  return str2.replace(functionCall, (match, fn, args) =>
    spreadsheetFunctions.hasOwnProperty(fn.toLowerCase())
      ? apply(fn, args)
      : match
  );
};

// Creates a numeric range array for integers or characters
const range = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((element, index) => element + index);

// Character range creation based on char codes
const charRange = (start, end) =>
  range(start.charCodeAt(0), end.charCodeAt(0)).map((code) =>
    String.fromCharCode(code)
  );

// Evaluates spreadsheet formulas with cell references and ranges
const evalFormula = (x, cells) => {
  const idToText = (id) => cells.find((cell) => cell.id === id).value;
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
  const elemValue = (num) => (character) =>
    idToText(character.toUpperCase() + num);
  const addCharacters = (character1) => (character2) => (num) =>
    charRange(character1, character2).map(elemValue(num));
  const rangeExpanded = x.replace(
    rangeRegex,
    (_match, char1, num1, char2, num2) => {
      return rangeFromString(num1, num2).map(addCharacters(char1)(char2));
    }
  );
  const cellRegex = /[A-J][1-9][0-9]?/gi;
  const cellExpanded = rangeExpanded.replace(cellRegex, (match) =>
    idToText(match.toUpperCase())
  );
  const functionExpanded = applyFunction(cellExpanded);
  return functionExpanded === x
    ? functionExpanded
    : evalFormula(functionExpanded, cells);
};

// Sets up the grid of spreadsheet cells on page load
window.onload = () => {
  const container = document.getElementById("container");
  const createLabel = (name) => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  };
  const letters = charRange("A", "J");
  letters.forEach(createLabel);
  range(1, 99).forEach((number) => {
    createLabel(number);
    letters.forEach((letter) => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number;
      input.onchange = update;
      container.appendChild(input);
    });
  });
};

// Event handler for cell value updates and formula evaluation
const update = (event) => {
  const element = event.target;
  const value = element.value.replace(/\s/g, "");
  if (!value.includes(element.id) && value.startsWith("=")) {
    element.value = evalFormula(
      value.slice(1),
      Array.from(document.getElementById("container").children)
    );
  }
};
