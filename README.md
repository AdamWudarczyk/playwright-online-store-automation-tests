# Online Store - Playwright E2E & Smoke Tests (JavaScript)
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
| ID     | Flow                                        |
|--------|---------------------------------------------|
| E2E-01 | Full checkout flow with 2 products          |
| E2E-02 | Checkout validation (missing required data) |
| E2E-03 | Remove item from cart                       |
| E2E-04 | Sorting products                            |

### Smoke Tests
| ID | Name |
|----|------|
| SMK-01 | Successful login (valid user) |
| SMK-02 | Locked-out user cannot login |
| SMK-03 | Invalid credentials validation |
| SMK-04 | Empty fields validation |

## Project Structure
playwright-online-store-automation-tests\
│── allure-report\
│── allure-results\
│── package.json                     # Project dependencies and scripts\
│── playwright.config.js             # Global Playwright configuration\
│── tests\
│ ├── smoke                          # High-level tests verifying main flows\
│ │ └── smoke-login.spec.js          # Smoke tests for login functionality\
│ └── e2e \                          # Full end-to-end flows across the app\
│ └── e2e-checkout-and-cart.spec.js \
│── pages                           # Page Object Model (POM) classes\
│ ├── LoginPage.js                   # Actions and selectors for Login page\
│ ├── InventoryPage.js               # Product listing, sorting, inventory checks\
│ ├── CartPage.js                    # Cart operations (add/remove/verify)\
│ └── CheckoutPage.js                # Checkout steps, form filling, validation\
│── /fixtures                        # Test data used across tests\
└── users.json                        # Credentials for different user roles


## How to run tests
**Install dependencies**
```bash
npm install
```
**Run all tests**
```bash
npx playwright test
```
**Run a single test file**
```bash
npx playwright test tests/e2e/e2e-cart-checkout.spec.js
```
**Run Smoke tests only**
```bash
npx playwright test --grep @smoke
```
**Run E2E tests only**
```bash
npx playwright test --grep @e2e
```
**Re-run only failed tests**
```bash
npx playwright test --last-failed
```
**Run tests in headed mode (browser visible)**
```bash
npx playwright test --headed
```
### Helpful commands
**Generate HTML report**
```bash
npx playwright show-report
```
**Generate Allure report**
```bash
npm run allure:report
```
**Open report in browser**
```bash
npm run allure:open
```

**Debug mode**
```bash
npx playwright test --debug
```

## Contents
This project will demonstrate:
- Page Object Model
- E2E flow testing
- Smoke testing
- Selectors & assertions
- Allure report