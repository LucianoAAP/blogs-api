const MIN_DISPLAYNAME_LENGTH = 8;
const PASSWORD_LENGTH = 6;
const NO_ERROR_MESSAGE = 'OK';

const getTooShortError = (entryType, numberOfChraracters) => ({
  err: {
    status: 400,
    message: `"${entryType}" length must be at least ${numberOfChraracters} characters long`,
  },
});

const getDifferentLengthError = (entryType, numberOfChraracters) => ({
  err: {
    status: 400,
    message: `"${entryType}" length must be ${numberOfChraracters} characters long`,
  },
});

const getIsRequiredError = (entryType) => ({
  err: {
    status: 400,
    message: `"${entryType}" is required`,
  },
});

const getEmptyError = (entryType) => ({
  err: {
    status: 400,
    message: `"${entryType}" is not allowed to be empty`,
  },
});

const invalidEmailError = {
  err: {
    status: 400,
    message: '"email" must be a valid email',
  },
};

const validateDisplayName = (entry) => {
  const entryType = 'displayName';
  if (!entry) return getIsRequiredError(entryType);
  if (entry.length < MIN_DISPLAYNAME_LENGTH) {
    return getTooShortError(entryType, MIN_DISPLAYNAME_LENGTH);
  }
  return NO_ERROR_MESSAGE;
};

const validatePassword = (password) => {
  const entryType = 'password';
  if (password === undefined) return getIsRequiredError(entryType);
  if (password.length === 0) return getEmptyError(entryType);
  if (password.length !== PASSWORD_LENGTH) {
    return getDifferentLengthError(entryType, PASSWORD_LENGTH);
  }
  return NO_ERROR_MESSAGE;
};

const validateEmail = (email) => {
  const entryType = 'email';
  if (email === undefined) return getIsRequiredError(entryType);
  if (email.length === 0) return getEmptyError(entryType);
  // Regex tirado de https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return invalidEmailError;
  return NO_ERROR_MESSAGE;
};

const validateUser = ({ displayName, email, password }) => {
  const displayNameValidation = validateDisplayName(displayName);
  if (displayNameValidation.err) return displayNameValidation;
  const emailValidation = validateEmail(email);
  if (emailValidation.err) return emailValidation;
  const passwordValidation = validatePassword(password);
  if (passwordValidation.err) return passwordValidation;
  return NO_ERROR_MESSAGE;
};

const validateLogin = ({ email, password }) => {
  const emailValidation = validateEmail(email);
  if (emailValidation.err) return emailValidation;
  const passwordValidation = validatePassword(password);
  if (passwordValidation.err) return passwordValidation;
  return NO_ERROR_MESSAGE;
};

const validateCategory = ({ name }) => {
  if (!name) return getIsRequiredError('name');
  return NO_ERROR_MESSAGE;
};

module.exports = { validateUser, validateLogin, validateCategory };