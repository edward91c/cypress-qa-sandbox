import HomePage from '../../pages/HomePage';

describe('Home Page - Elements Visibility', () => {
  beforeEach(() => {
    HomePage.visit();
  });

  it('should display all critical elements', () => {
    HomePage.verifyPageElement();
  });
});
