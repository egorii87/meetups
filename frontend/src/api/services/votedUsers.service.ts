import { httpClient } from 'helpers';
import { ShortUser } from 'model';

export const getVotedUsers = async (id: string): Promise<ShortUser[]> => {
  const { data: votedUsers } = await httpClient.get<ShortUser[]>(
    `/meetups/${id}/votedusers`,
  );
  return votedUsers;
};

export const addVotingUser = async (
  id: string,
  votingUser: ShortUser,
): Promise<ShortUser[]> => {
  const { data: votedUsers } = await httpClient.post<ShortUser[]>(
    `/meetups/${id}/votedusers`,
    {
      data: votingUser,
    },
  );
  return votedUsers;
};

export const deleteVotedUser = async (
  id: string,
  votedUser: ShortUser,
): Promise<ShortUser[]> => {
  const { data: votedUsers } = await httpClient.delete<ShortUser[]>(
    `/meetups/${id}/votedusers`,
    {
      data: votedUser,
    },
  );
  return votedUsers;
};
