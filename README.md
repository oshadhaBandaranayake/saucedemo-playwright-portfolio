# SauceDemo Playwright + TypeScript Test Automation Suite

![Playwright Tests](https://github.com/oshadhaBandaranayake/saucedemo-playwright-portfolio/actions/workflows/playwright.yml/badge.svg)

End-to-end and API test automation project built with **Playwright** and **TypeScript**,
following the **Page Object Model (POM)** design pattern, with a full **GitHub Actions**
CI/CD pipeline.

## What This Project Covers
- UI test automation (login, shopping cart, checkout flow)
- API test automation (GET, POST, PUT, DELETE)
- Page Object Model architecture for maintainable tests
- Cross-browser testing (Chrome, Firefox, Safari, Mobile Chrome)
- Continuous Integration with GitHub Actions
- Automatic screenshots, videos, and traces on failure

## Tech Stack
- **Playwright** – browser automation framework
- **TypeScript** – type-safe test scripting
- **GitHub Actions** – CI/CD pipeline
- **SauceDemo** / **JSONPlaceholder** – demo applications under test

## Project Structure
  pages/ Page Object Model classes
  tests/ UI and API test specs
  .github/ CI/CD workflow

## How to Run Locally
  git clone https://github.com/oshadhaBandaranayake/saucedemo-playwright-portfolio.git
  cd saucedemo-playwright-portfolio
  npm install
  npx playwright install
  npx playwright test

## View the HTML Report
  npx playwright show-report
  
## Author
  **Oshadha Bandaranayake** – Aspiring QA Automation Engineer
  [LinkedIn](https://www.linkedin.com/in/oshadha-bandaranayake) · [GitHub](https://github.com/oshadhaBandaranayake)
  
