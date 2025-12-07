# Online Store - Playwright E2E & Smoke Tests (JavaScript)
Automated end-to-end and smoke tests for an online store web application (based on the SauceDemo demo store).
Project created to practice E2E testing, Page Object Model design, and Playwright workflows.

## Tech Stack
- JavaScript (ES6)
- Playwright Test Runner
- Page Object Model (POM)
- HTML reports
- Allure reports
- JSON fixtures

## Test Coverage
### E2E Flow
| ID     | Flow                                        |
|--------|---------------------------------------------|
| E2E-01 | Full checkout flow with 2 products          |
| E2E-02 | Checkout validation (missing required data) |
| E2E-03 | Remove item from cart                       |
| E2E-04 | Sorting products                            |
| E2E-05 | Product details view and return to inventory|

### Smoke Tests
| ID     | Name                                      |
|--------|-------------------------------------------|
| SMK-01 | Successful login (valid user)             |
| SMK-02 | Locked-out user cannot login              |
| SMK-03 | Invalid credentials validation            |
| SMK-04 | Empty fields validation                   |
| SMK-05 | Product details page opens correctly      |
| SMK-06 | Sorting Z→A works                         |
| SMK-07 | Adding item shows cart badge              |
| SMK-08 | Product details open correctly            |
| SMK-09 | Product image is displayed on details page|
| SMK-10 | Back button returns to inventory page     |


## Project Structure
```
playwright-online-store-automation-tests
│── allure-report/                      # Generated Allure HTML report
│── allure-results/                     # Raw results consumed by Allure
│── package.json                        # Project dependencies and scripts
│── playwright.config.js                # Global Playwright configuration
│── tests/                              # All test specifications
│ ├── smoke/                            # High-level tests verifying main flows
│ │ └── smoke-login.spec.js             # Smoke tests for login functionality
│ │ └── smoke-inventory.spec.js         # Smoke tests verifying product list loads
│ │ └── smoke-product-details.spec.js   # Smoke tests verifying product details page
│ └── e2e/                              # Full end-to-end flows across the app
│ └── e2e-checkout-and-cart.spec.js     # Checkout & cart E2E scenarios
│ └── e2e-product-browsing.spec.js      # Product browsing E2E scenarios
│── pages/                              # Page Object Model (POM) classes
│ ├── LoginPage.js                      # Actions and selectors for Login page
│ ├── InventoryPage.js                  # Product listing, sorting, inventory checks
│ ├── CartPage.js                       # Cart operations (add/remove/verify)
│ └── CheckoutPage.js                   # Checkout steps, form filling, validation
│── fixtures/                           # Test data used across tests
│└── users.json                         # Credentials for different user roles
```

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