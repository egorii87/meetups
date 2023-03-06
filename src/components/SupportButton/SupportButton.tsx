import { useState, useEffect } from 'react';
import { Button } from 'components';
import { ButtonVariant } from 'components';
import { meetupStore, userStore } from 'stores';

import { ReactComponent as ProfileIcon } from './profile.svg';
import { Typography, TypographyComponent } from 'components';
import { FormattedMessage } from 'react-intl';
import styles from './SupportButton.module.scss';

interface SupportButtonProps {
  id: string;
}

export const SupportButton = ({ id }: SupportButtonProps): JSX.Element => {
  const [variant, setVariant] = useState<boolean>();
  const [lastAction, setLastAction] = useState<string>();
  const [votesCount, setVotesCount] = useState<number>();

  useEffect(() => {
    (async () => {
      const votedList = await meetupStore.getVotedUsers(id);
      setVariant(meetupStore.votedThisMeetup(votedList));
      const voted = await meetupStore.getVotedUsers(id);
      setVotesCount(voted.length);
    })();
  }, [lastAction]);

  async function handleVoting() {
    if (userStore.currentShortUser) {
      await meetupStore.addVotingUser(id, userStore.currentShortUser);
      setLastAction('add');
    }
  }

  async function handleUnvoting() {
    if (userStore.currentShortUser) {
      await meetupStore.deleteVotedUser(id, userStore.currentShortUser);
      setLastAction('delete');
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        <ProfileIcon className={styles.icon} />
        <Typography
          component={TypographyComponent.Paragraph}
          className={styles.text}
        >
          {votesCount}{' '}
          <FormattedMessage
            id="fieldsName.support"
            defaultMessage="Поддерживают"
          />
        </Typography>
      </div>
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
    </div>
  );
};
