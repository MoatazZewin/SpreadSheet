# JavaScript Spreadsheet Application

This is a simple, interactive spreadsheet application implemented in JavaScript, HTML, and CSS. It supports arithmetic operations, custom spreadsheet functions, and formula-based calculations with cell references and ranges.

## Live Demo

<a href="https://animated-bublanina-782596.netlify.app/" target="_blank">View the live demo here</a>

## Features

- **Basic Arithmetic**: Supports addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`).
- **Custom Functions**: Includes `sum`, `average`, `median`, and more.
- **Cell References**: Allows referencing cells directly in formulas (e.g., `=A1 + B2`).
- **Range Support**: Allows ranges in formulas (e.g., `=sum(A1:A9)` or `=sum(a1:a9)`).
- **Real-Time Update**: Automatically recalculates cell values upon any update.

### Prerequisites

This application runs in a browser, requiring no special setup or dependencies.

### Installation

1. Clone or download the repository.
2. Open `index.html` in your browser.

### Usage

1. Enter any arithmetic operation (e.g., `=5 + 3`) in a cell to see the result.
2. Use custom functions, such as `=sum(A1:A5)`, to calculate sums of cell ranges.
3. Reference other cells (e.g., `=A1 * B2`) for dynamic formulas.

### Available Functions

- **sum**: Adds up values (e.g., `=sum(A1:A5)`).
- **average**: Calculates the average (e.g., `=average(A1:A5)`).
- **median**: Returns the median (e.g., `=median(A1:A5)`).
- **even**: Filters even numbers (e.g., `=even(A1:A5)`).
- **random**: Generates a random number in a range (e.g., `=random(1, 10)`).

### Example Formulas

- `=sum(A1:A9)` - Calculates the sum of values in cells from A1 to A9.
- `=A1 + B2` - Adds the values of cells A1 and B2.
- `=average(C1:C5)` - Calculates the average of cells C1 through C5.

## License

This project is licensed under the MIT License.
