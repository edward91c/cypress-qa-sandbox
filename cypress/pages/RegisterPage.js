class RegisterPage {
  visit() {
    cy.visit('/register');
  }

  // Selectors (Getters)
  get titlePage() {
    return cy.get('[data-testid="register-title"]');
  }

  get loginLink() {
    return cy.get('[data-testid="login-link"]');
  }

  get nameInput() {
    return cy.get('[data-testid="name-input"]');
  }

  get emailInput() {
    return cy.get('[data-testid="email-input"]');
  }

  get passwordInput() {
    return cy.get('[data-testid="password-input"]');
  }

  get confirmPasswordInput() {
    return cy.get('[data-testid="confirm-password-input"]');
  }

  get registerButton() {
    return cy.get('[data-testid="submit-register"]');
  }

  // Validations
  verifyPageElements() {
    this.titlePage.should('be.visible');
    this.loginLink.should('be.visible');
    this.nameInput.should('be.visible');
    this.emailInput.should('be.visible');
    this.passwordInput.should('be.visible');
    this.confirmPasswordInput.should('be.visible');
    this.registerButton.should('be.visible');
  }

  // Actions (Methods)
  registerUser(name, email, password, confirmPassword) {
    this.nameInput.type(name);
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.confirmPasswordInput.type(confirmPassword);
  }
  submitRegister() {
    this.registerButton.click();
  }

  //Get all error messages
  get nameError() {
    return cy.get('[data-testid="name-error"]');
  }
  get emailError() {
    return cy.get('[data-testid="email-error"]');
  }
  get passwordError() {
    return cy.get('[data-testid="password-error"]');
  }
  get confirmPasswordError() {
    return cy.get('[data-testid="confirmPassword-error"]');
  }

  //Validate error messages
  verifyErrorMessages() {
    this.nameError.should('be.visible').and('contain', 'Name must be at least 2 characters');
    this.emailError.should('be.visible').and('contain', 'Invalid email address');
    this.passwordError
      .should('be.visible')
      .and('contain', 'Password must be at least 6 characters');
  }
  verifyConfirmPasswordError() {
    this.confirmPasswordError.should('be.visible').and('contain', "Passwords don't match");
  }
}

export default new RegisterPage();
