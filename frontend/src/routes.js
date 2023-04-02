const pageRoutes = {
  mainPage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  notFoundPage: () => '*',
};

const apiRoutes = {
  login: () => '/api/v1/login',
  signUp: () => '/api/v1/signup',
  getData: () => '/api/v1/data',
};

export { pageRoutes, apiRoutes };
