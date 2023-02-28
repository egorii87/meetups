import { observable, computed, action } from 'mobx';

import { Meetup, NewMeetup, MeetupStatus, ShortUser } from 'model';
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
    return await createOneMeetup(meetup);
  }

  @action.bound
  async edit(meetup: Meetup) {
    return await updateMeetup(meetup);
  }

  @action.bound
  async delete(id: string) {
    localStorage.removeItem(id);
    return await deleteMeetup(id);
  }

  @action.bound
  async get(id: string) {
    return await getMeetup(id);
  }

  @action.bound
  async getVotedUsers(id: string) {
    return await getVotedUsers(id);
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
