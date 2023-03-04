import { useState, useEffect } from 'react';
import { Button } from 'components';
import { ButtonVariant } from 'components';
import { meetupStore, userStore } from 'stores';

interface SupportButtonProps {
  id: string;
}

export const SupportButton = ({ id }: SupportButtonProps): JSX.Element => {
  const [variant, setVariant] = useState<boolean>();
  const [lastAction, setLastAction] = useState<any>();
  useEffect(() => {
    (async () => {
      const votedList = await meetupStore.getVotedUsers(id);
      setVariant(meetupStore.votedThisMeetup(votedList));
    })();
  }, [lastAction]);

  const handleVoting = async () => {
    if (userStore.currentShortUser) {
      await meetupStore.addVotingUser(id, userStore.currentShortUser);
      setLastAction('add');
    }
  };

  const handleUnvoting = async () => {
    if (userStore.currentShortUser) {
      await meetupStore.deleteVotedUser(id, userStore.currentShortUser);
      setLastAction('delete');
    }
  };

  return (
    <Button
      variant={variant ? ButtonVariant.Secondary : ButtonVariant.Primary}
      style={{ width: '130px', height: '20px', borderRadius: '10px' }}
      onClick={async (e) => {
        e.preventDefault();
        variant ? handleUnvoting() : handleVoting();
      }}
    >
      {variant ? 'Поддерживаете' : 'Поддержать'}
    </Button>
  );
};
