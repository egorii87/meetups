import { getVotedUsers } from 'api';
import { httpClient } from 'helpers';
import { Meetup, NewMeetup } from 'model';

export const getMeetups = async (): Promise<Meetup[]> => {
  const { data: meetups } = await httpClient.get<Meetup[]>('/meetups');
  return meetups;
};

export const getMeetup = async (id: string): Promise<Meetup> => {
  const { data: meetup } = await httpClient.get<Meetup>(`/meetups/${id}`);
  const votedUsers = await getVotedUsers(id);

  return {
    ...meetup,
    votedUsers,
  };
};

export const createOneMeetup = async (
  newMeetupData: NewMeetup,
): Promise<Meetup> => {
  const { data: createdMeetup } = await httpClient.post<Meetup>('/meetups', {
    data: newMeetupData,
  });
  return createdMeetup;
};

export const updateMeetup = async (
  updatedMeetupData: Meetup,
): Promise<Meetup> => {
  const { data: updatedMeetup } = await httpClient.put<Meetup>('/meetups', {
    data: updatedMeetupData,
  });
  return updatedMeetup;
};

export const deleteMeetup = async (id: string): Promise<number | boolean> => {
  let resp = await httpClient.delete(`/meetups/${id}`);
  console.log(resp);
  if (!resp) return false;
  return resp.status;
};
