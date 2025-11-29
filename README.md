# Online Store – Automation Tests (Playwright + JavaScript)
Automated end-to-end and smoke tests for an online store web application (based on the SauceDemo demo store).
Project created to practice E2E testing, Page Object Model design, and Playwright workflows.

## Tech Stack
- JavaScript (ES6)
- Playwright Test Runner
- Page Object Model (POM)
- HTML Reports
- JSON fixtures

## Test Coverage
### E2E Flow
| ID     | Flow |
|--------|-------|
| E2E-01 | Full checkout flow with 2 products |
| E2E-02 | Checkout validation – missing required data |
| E2E-03 | Remove item from cart |
| E2E-04 | Sorting products |

### Smoke Tests
| ID | Name |
|----|------|
| SMK-01 | Successful login (valid user) |
| SMK-02 | Locked-out user cannot login |
| SMK-03 | Invalid credentials validation |
| SMK-04 | Empty fields validation |

## Project Structure
playwright-online-store-automation-tests\
│── package.json\
│── playwright.config.js\
│── /tests\
│ ├── smoke\
│ │ └── smoke-login.spec.js\
│ └── e2e\
│ └── e2e-checkout-and-cart.spec.js\
│── /pages\
│ ├── LoginPage.js\
│ ├── InventoryPage.js\
│ ├── CartPage.js\
│ └── CheckoutPage.js\
│── /fixtures\
└── users.json

## How to run tests
Install dependencies
```
npm install
```
Run all tests
```
npx playwright test
```
Run a single test file
```
npx playwright test tests/e2e/e2e-cart-checkout.spec.js
```
Run Smoke tests only
```
npx playwright test --grep @smoke
```
Run E2E tests only
```
npx playwright test --grep @e2e
```
Re-run only failed tests
```
npx playwright test --last-failed
```
--HELPFUL--
Run tests in headed mode (browser visible)
```
npx playwright test --headed
```
Generate HTML report
```
npx playwright show-report
```
Debug mode
```
npx playwright test --debug
```

## Contents
This project will demonstrate:
- Page Object Model
- E2E flow testing
- Smoke testing
- Selectors & assertions
- Playwright best practices