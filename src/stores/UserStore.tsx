import { observable, computed, action } from 'mobx';

import { Credentials, User } from 'model';
import { login, logout, checkLogin } from 'api';

export class UserStore {
  @observable user?: User;

  @computed get currentUser() {
    return this.user;
  }

  @action.bound
  async login(data: Credentials) {
    this.user = await login(data);
  }

  @action.bound
  async logout() {
    this.user = undefined;
    await logout();
  }

  /* @action.bound
  async checkLogin() {
    await checkLogin();
  }   */

  constructor() {}
}

export const userStore = new UserStore();
