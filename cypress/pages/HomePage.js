class HomePage {
  // Selectors (Getters)
  get heroTitle() {
    return cy.get('[data-testid="hero-title"]');
  }

  get heroSubtitle() {
    return cy.get('[data-testid="hero-subtitle"]');
  }

  get themeToggle() {
    return cy.get('[data-testid="theme-toggle"]');
  }

  get cardEcommerce() {
    return cy.get('[data-testid="card-ecommerce"]');
  }

  get startShoppingLink() {
    return cy.get('[data-testid="card-ecommerce-link"]');
  }

  get cardPlayground() {
    return cy.get('[data-testid="card-playground"]');
  }

  get startPlaygroundLink() {
    return cy.get('[data-testid="card-playground-link"]');
  }

  // Actions
  visit() {
    cy.visit('/');
  }

  clickGetStarted() {
    this.startShoppingLink.click();
  }

  clickGetStartedPlayground() {
    this.startPlaygroundLink.click();
  }

  clickToggleTheme() {
    this.themeToggle.click();
  }

  // Grouped validations
  verifyPageElement() {
    this.heroTitle.should('be.visible');

    // Validamos el subtítulo usando el fixture
    cy.fixture('texts').then((texts) => {
      this.heroSubtitle.should('be.visible').should('have.text', texts.homePage.subtitle);
    });

    this.themeToggle.should('be.visible');
    this.cardEcommerce.should('be.visible');
    this.startShoppingLink.should('be.visible');
    this.cardPlayground.should('be.visible');
    this.startPlaygroundLink.should('be.visible');
  }
}

export default new HomePage();
