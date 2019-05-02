import { localStorageWrapper } from "../helpers";

const NS_USERS = "users";
const NS_LOGGED_USER = "logged_user";

export const login = ({ username, password }) => {
  const user = (localStorageWrapper.get(NS_USERS) || {})[username];
  if (!user || user.password !== password) {
    alert("Invalid User/Password");
  } else {
    localStorageWrapper.set(NS_LOGGED_USER, user);

    return true;
  }
};

export const register = ({ username, password }) => {
  const users = localStorageWrapper.get(NS_USERS) || {};
  if (users[username]) {
    alert("User already exists");
  } else {
    const user = {
      username,
      password
    };

    localStorageWrapper.set(NS_USERS, {
      ...users,
      [username]: user
    });

    return user;
  }
};

export const isLogged = () => !!localStorageWrapper.get(NS_LOGGED_USER);

export const logout = () => localStorageWrapper.set(NS_LOGGED_USER, null);

export const getUser = () =>
  isLogged && localStorageWrapper.get(NS_LOGGED_USER);

export default {
  register,
  login,
  isLogged,
  getUser,
  logout
};
