const UserService = require('../UserService');
const UserClient = require('../UserClient');
jest.mock('../UserClient');

describe('UserService', () => {
  const login = jest.fn(async (id, password) => {return 'success'});
  UserClient.mockImplementation(() => {
    return {
      login:login,
    };
  });
  let userService;

  beforeEach(() => {
    userService = new UserService(new UserClient());
  });

  it('calls login() on UserClient when tries to login', async () => {
    await userService.login('abc', 'abc');
    expect(login.mock.calls.length).toBe(1);
  });

  it('should not call login() on UserClient again if already logged in', async () => {
    await userService.login('abc', 'abc');
    await userService.login('abc', 'abc');

    expect(login.mock.calls.length).toBe(1);
  });
});
