import { observable, computed, action } from 'mobx';

import { Meetup, NewMeetup, MeetupStatus, ShortUser } from 'model';
import { userStore } from './UserStore';
import {
  getMeetups,
  createOneMeetup,
  updateMeetup,
  deleteMeetup,
  getMeetup,
  getVotedUsers,
  addVotingUser,
  deleteVotedUser,
} from 'api';

export class MeetupStore {
  @observable meetups: Meetup[] = [];

  @computed get getAllMeetups() {
    return this.meetups;
  }

  @computed get getTopics() {
    return this.meetups.filter(
      (meetup) => meetup.status === MeetupStatus.DRAFT,
    );
  }

  @computed get getOnModeration() {
    return this.meetups.filter(
      (meetup) => meetup.status === MeetupStatus.REQUEST,
    );
  }

  @computed get getUpcoming() {
    let now = new Date();
    return this.meetups.filter((meetup) => {
      if (
        meetup.finish &&
        meetup.status === MeetupStatus.CONFIRMED &&
        now.toJSON() < meetup.finish
      ) {
        return meetup;
      }
    });
  }

  @computed get getFinished() {
    let now = new Date();
    return this.meetups.filter((meetup) => {
      if (
        meetup.finish &&
        meetup.status === MeetupStatus.CONFIRMED &&
        now.toJSON() > meetup.finish
      ) {
        return meetup;
      }
    });
  }

  @action.bound
  async init() {
    this.meetups = await getMeetups();
  }

  @action.bound
  async create(meetup: NewMeetup) {
    const createdMeetup = await createOneMeetup(meetup);
    if (!!createdMeetup) {
      this.meetups.push(createdMeetup);
      return createdMeetup;
    } else return false;
  }

  @action.bound
  async edit(meetup: Meetup) {
    return await updateMeetup(meetup);
  }

  @action.bound
  async delete(id: string) {
    const respStatus = await deleteMeetup(id);
    if (respStatus === 200) {
      localStorage.removeItem(id);
      this.meetups = this.meetups.filter((meetup) => meetup.id !== id);
      return true;
    }
  }

  @action.bound
  async get(id: string) {
    return await getMeetup(id);
  }

  @action.bound
  async approve(id: string) {
    let approvingMeetup = await getMeetup(id);
    approvingMeetup.status = MeetupStatus.CONFIRMED;
    return await meetupStore.edit(approvingMeetup);
  }

  @action.bound
  async getVotedUsers(id: string) {
    return await getVotedUsers(id);
  }

  @action.bound
  votedThisMeetup(votedList: ShortUser[]) {
    let result = votedList.find(
      (user) => user.id === userStore.currentShortUser?.id,
    );
    return !!result;
  }

  @action.bound
  async addVotingUser(id: string, votingUser: ShortUser) {
    return await addVotingUser(id, votingUser);
  }

  @action.bound
  async deleteVotedUser(id: string, votedUser: ShortUser) {
    return await deleteVotedUser(id, votedUser);
  }

  constructor() {}
}

export const meetupStore = new MeetupStore();
