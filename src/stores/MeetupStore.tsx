import { observable, computed, action } from 'mobx';

import { Meetup, MeetupStatus } from 'model';
import { getMeetups } from 'api';

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

  constructor() {}
}

export const store = new MeetupStore();
