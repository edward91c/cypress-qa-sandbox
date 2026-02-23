class ProfilePage {
  // Selectors (Getters)
  get profileTitle() {
    return cy.get('[data-testid="profile-title"]');
  }

  get logoutNav() {
    return cy.get('[data-testid="logout-nav"]');
  }

  get profileName() {
    return cy.get('[data-testid="profile-name"]');
  }

  get profileEmail() {
    return cy.get('[data-testid="profile-email"]');
  }

  get logoutButton() {
    return cy.get('[data-testid="logout-btn"]');
  }

  // Validations
  verifyPageElements() {
    this.profileTitle.should('be.visible');
    this.logoutNav.should('be.visible');
    this.profileName.should('be.visible');
    this.profileEmail.should('be.visible');
    this.logoutButton.should('be.visible');
  }

  // Actions (Methods)
  logout() {
    this.logoutButton.click();
  }
}

export default new ProfilePage();
