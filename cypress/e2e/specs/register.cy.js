import RegisterPage from '../../pages/RegisterPage';
import ProfilePage from '../../pages/ProfilePage';
import generateRandomUser from '../../utils/dataGenerator';

describe('User Registration Flow and Form Validations', () => {
  beforeEach(() => {
    RegisterPage.visit();
  });

  //Validate register page elements are displayed
  it('Verify register page elements', () => {
    RegisterPage.verifyPageElements();
  });

  //Validate register a new user
  it('Register a new user', () => {
    const user = generateRandomUser();
    RegisterPage.registerUser(user.name, user.email, user.password, user.password);
    RegisterPage.submitRegister();
    ProfilePage.profileTitle.should('be.visible');
  });

  // Verify that the validations are working correctly in all fields
  it('Verify validations are working correctly in all fields', () => {
    RegisterPage.submitRegister();
    RegisterPage.verifyErrorMessages();
  });

  //Validate the Confirm Password field with different values
  it('Validate the Confirm Password field', () => {
    const user = generateRandomUser();
    RegisterPage.registerUser(user.name, user.email, user.password, user.password + 'X');
    RegisterPage.submitRegister();
    RegisterPage.verifyConfirmPasswordError();
  });
});
