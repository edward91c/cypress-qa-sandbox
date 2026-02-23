# 🧪 QA Automation Sandbox — Cypress E2E Tests

Automated E2E test suite using [Cypress](https://www.cypress.io/) for the [QA Automation Sandbox](https://qa-automation-sandbox.vercel.app/).

---

### 📁 Project Structure

```
cypress/
├── e2e/
│   └── specs/        # Test specifications (.cy.js)
├── fixtures/         # Static test data (JSON) - e.g., texts.json
├── pages/            # Page Objects (UI encapsulation)
├── reports/          # Mochawesome reports (git-ignored)
├── support/          # Custom commands & global hooks
└── utils/            # Helpers (fake data generators, formatters)
```

> **Note on Fixtures:** The project uses `cypress/fixtures/texts.json` to store static text content (titles, messages, labels) separarely from the test code. This improves maintainability and centralization of text updates.

---

## 🔧 Tech Stack

| Tool                             | Version  | Purpose                              |
| -------------------------------- | -------- | ------------------------------------ |
| **Cypress**                      | ^15.10.0 | E2E testing framework                |
| **@faker-js/faker**              | ^9.5.0   | Dynamic fake data generation         |
| **Mochawesome**                  | ^7.1.4   | Visual HTML/JSON test reporter       |
| **mochawesome-merge**            | ^5.1.1   | Combines reports from multiple specs |
| **mochawesome-report-generator** | ^6.3.2   | Generates final HTML report          |
| **Prettier**                     | ^3.x     | Opinionated code formatter           |
| **GitHub Actions**               | CI       | Automated test execution on push     |

---

## 🏗️ Architecture & Patterns

This project follows the **Page Object Model (POM)** pattern:

```
┌─────────────┐       ┌──────────────┐       ┌──────────────┐
│  Spec File  │──────▶│  Page Object │──────▶│   Browser    │
│ (WHAT)      │       │ (HOW)        │       │ (WHERE)      │
│             │       │              │       │              │
│ "login with │       │ .typeEmail() │       │ cy.get(...)  │
│  valid user"│       │ .clickLogin()│       │ cy.click()   │
└─────────────┘       └──────────────┘       └──────────────┘
```

- **Specs** describe _what_ to test (user flows, assertions).
- **Page Objects** encapsulate _how_ to interact (selectors, actions).
- **Cypress API** handles _where_ the interaction happens.

---

## ⚙️ Configuration Highlights

Located in `cypress.config.js`:

| Option                   | Value                                       | Why                                                   |
| ------------------------ | ------------------------------------------- | ----------------------------------------------------- |
| `baseUrl`                | `https://qa-automation-sandbox.vercel.app/` | Avoids repeating the full URL in every `cy.visit()`   |
| `viewportWidth/Height`   | `1920 × 1080`                               | Consistent desktop resolution across all runs         |
| `specPattern`            | `cypress/e2e/specs/**/*.cy.{js,jsx,ts,tsx}` | Only runs files inside `/specs`, ignores Page Objects |
| `video`                  | `false`                                     | Reduces CI storage; enable for debugging if needed    |
| `screenshotOnRunFailure` | `true`                                      | Auto-captures screenshots on failed tests             |
| `reporter`               | `mochawesome`                               | Generates visual HTML reports per run                 |

---

## 🚀 Setup & Execution

### 📋 Prerequisites

- ✅ [Node.js](https://nodejs.org) (v18+)
- ✅ Git

### 🛠️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/edward91c/cypress-qa-sandbox.git

# 2. Navigate into the project
cd qa-automation

# 3. Install dependencies
npm install
```

### ▶️ Running Tests

| Command                | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm run cy:open`      | Opens Cypress interactive runner (GUI)        |
| `npm run cy:run`       | Runs all tests headlessly + generates reports |
| `npm run cy:clean`     | Deletes old reports from `cypress/reports/`   |
| `npm run format`       | Auto-formats all code with Prettier           |
| `npm run format:check` | Verifies code formatting (used in CI)         |

---

## 📊 Reports

After running `npm run cy:run`, reports are auto-generated in:

```
cypress/reports/
├── mochawesome_001.html   ← Open in browser to view
├── mochawesome_001.json
└── ...
```

To **merge multiple reports** into one:

```bash
npx mochawesome-merge cypress/reports/*.json > cypress/reports/merged.json
npx marge cypress/reports/merged.json --reportDir cypress/reports --inline
```

To **clean up** old reports:

```bash
npm run cy:clean
```

---

## 📛 Naming Conventions

| Element             | Convention                   | Example                            |
| ------------------- | ---------------------------- | ---------------------------------- |
| **Spec files**      | `feature.cy.js`              | `home.cy.js`, `login.cy.js`        |
| **Page Objects**    | `PascalCase + Page`          | `HomePage.js`, `LoginPage.js`      |
| **Describe blocks** | `Page Name - Feature`        | `'Home Page - Element Visibility'` |
| **It blocks**       | `should + expected behavior` | `'should display the hero title'`  |
| **Selectors**       | `data-testid` attributes     | `[data-testid="hero-title"]`       |

---

## 🧪 How to Add a New Test

1. **Create a Page Object** in `cypress/pages/`:

```javascript
// cypress/pages/LoginPage.js
class LoginPage {
  get emailInput() {
    return cy.get('[data-testid="login-email"]');
  }

  visit() {
    cy.visit('/login');
  }

  typeEmail(email) {
    this.emailInput.clear().type(email);
  }
}

export default new LoginPage();
```

2. **Create a Spec** in `cypress/e2e/specs/`:

```javascript
// cypress/e2e/specs/login.cy.js
import LoginPage from '../../pages/LoginPage';

describe('Login Page', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('should display the email input', () => {
    LoginPage.emailInput.should('be.visible');
  });
});
```

3. **Run your test**:

```bash
npm run cy:open
```

---

## 🧠 Best Practices

- ✅ Use **Page Objects** to encapsulate all UI interaction logic.
- ✅ Prefer `data-testid` selectors — they survive CSS and text changes.
- ✅ Use `cy.intercept()` to control network requests deterministically.
- ✅ Assert visibility (`should('be.visible')`) before interacting with elements.
- ❌ Avoid `cy.wait(ms)` — use network aliases or DOM assertions instead.
- ❌ Avoid test interdependence — each test must run independently.
- ❌ Don't select elements by CSS class names or deep DOM paths.

---

## 🌱 Branching Workflow

| Branch              | Purpose                                                    |
| ------------------- | ---------------------------------------------------------- |
| 🌿 `main`           | Stable base: config, structure, and polished test suites   |
| ✨ `feature/<name>` | New test flows (e.g., `feature/login`, `feature/checkout`) |
| 🐛 `fix/<name>`     | Fixes for flaky or broken tests                            |

---

## ✅ Test Coverage

| Module             | Status       |
| ------------------ | ------------ |
| Home Page          | ✅ Completed |
| Login              | 🔲 Pending   |
| Register           | ✅ Completed |
| Products Catalog   | 🔲 Pending   |
| Product Detail     | 🔲 Pending   |
| Shopping Cart      | 🔲 Pending   |
| Checkout           | 🔲 Pending   |
| User Profile       | 🔲 Pending   |
| Testing Playground | 🔲 Pending   |

<details>
<summary><b>View detail: Home Page Coverage</b></summary>
<br>

- `✅` Verify all critical elements are visible
</details>

<details>
<summary><b>View detail: Register Coverage</b></summary>
<br>

- `✅` Verify register page UI elements
- `✅` Register a new user successfully (Happy Path)
- `✅` Verify required validations with empty fields
- `✅` Validate Confirm Password specific mismatch error
</details>

---

## ⚠️ Project Status

This is an evolving test suite. The initial focus is on setting up robust infrastructure and covering primary user flows. Future iterations will include:

- **CI/CD Pipeline** (GitHub Actions): Tests run automatically on every push.
- Advanced network stubbing scenarios
- Visual regression testing
- Cross-browser testing

---

## 📌 Author

Made by [edward91c](https://github.com/edward91c)
📧 Email: [edward1791c@gmail.com](mailto:edward1791c@gmail.com)
🔗 LinkedIn: [Edward Campeón](https://www.linkedin.com/in/edward-campeón-72aa8316b/)

---

Happy Testing! 🎯
