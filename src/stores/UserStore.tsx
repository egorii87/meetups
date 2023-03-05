import { observable, computed, action, makeAutoObservable } from 'mobx';
import { getUsers } from 'api';

import { Credentials, User, ShortUser, UserRole } from 'model';
import { login, logout, checkLogin } from 'api';

export class UserStore {
  @observable user?: User;

  @observable usersList: User[] = [];

  @computed get currentUser() {
    return this.user;
  }

  @computed get getUsersList() {
    return this.usersList;
  }

  @computed get getAuthorList() {
    return this.usersList.map((value) => {
      return {
        value: {
          id: value.id,
          name: value.name,
          surname: value.surname,
        },
        label: `${value.name} ${value.surname}`,
      };
    });
  }

  @computed get currentShortUser() {
    if (this.user) {
      const shortUser: ShortUser = {
        id: this.user.id,
        name: this.user.name,
        surname: this.user.surname,
      };
      return shortUser;
    }
    return null;
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

  @action.bound
  async checkLogin() {
    let res = await checkLogin();
    if (!this.user) {
      this.user = res;
    }
    return res;
  }

  @action.bound
  async initUsersList() {
    this.usersList = await getUsers();
  }

  @action.bound
  hasChiefPermission() {
    return userStore.currentUser?.roles.toLowerCase() === UserRole.CHIEF;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const userStore = new UserStore();
