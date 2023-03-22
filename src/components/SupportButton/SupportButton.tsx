import { useState, useEffect } from 'react';
import {
  Button,
  ButtonVariant,
  Typography,
  TypographyComponent,
  NotificationVariant,
  notification,
} from 'components';
import { meetupStore, userStore } from 'stores';
import { dataCy } from 'helpers';
import { FormattedMessage } from 'react-intl';

import styles from './SupportButton.module.scss';
import { ReactComponent as ProfileIcon } from './profile.svg';

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
        className={styles.supportButton}
        onClick={async (e) => {
          e.preventDefault();
          if (variant) {
            handleUnvoting();
            notification(
              NotificationVariant.Info,
              'Вы больше не поддерживаете митап',
            );
          } else {
            handleVoting();
            notification(NotificationVariant.Info, 'Вы поддерживаете митап');
          }
        }}
        data-testid="supportButton"
        {...dataCy('supportButton')}
      >
        {variant ? (
          <FormattedMessage
            id="supportButton.supported"
            defaultMessage="Поддерживаете"
          />
        ) : (
          <FormattedMessage
            id="supportButton.support"
            defaultMessage="Поддержать"
          />
        )}
      </Button>
    </div>
  );
};
