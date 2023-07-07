import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import { Button, ButtonVariant, removeMeetup } from 'components';
import { meetupStore, userStore } from 'stores';
import { Meetup, MeetupStatus } from 'model';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import styles from './MeetupActions.module.scss';

interface MeetupActionsProps {
  meetup: Meetup;
  id?: string;
}

export const MeetupActions = ({
  meetup,
  id,
}: PropsWithChildren<MeetupActionsProps>) => {
  const navigate = useNavigate();

  return (
    <div className={classNames(styles.dataContent, styles.actions)}>
      <Button variant={ButtonVariant.Default} onClick={() => navigate(-1)}>
        <FormattedMessage id="buttons.back" defaultMessage="Назад" />
      </Button>
      {meetup.status === MeetupStatus.DRAFT &&
        (userStore.hasChiefPermission() ||
          userStore.hasPermissionToInteract(meetup.author.id)) && (
          <div className={styles.actionsWrapper}>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={async (e) => {
                e.preventDefault();
                !!id && removeMeetup(id);
                navigate('/meetups/topics');
              }}
            >
              <FormattedMessage id="buttons.delete" defaultMessage="Удалить" />
            </Button>
            <Button variant={ButtonVariant.Primary}>
              <FormattedMessage
                id="buttons.approveTopic"
                defaultMessage="Одобрить тему"
              />
            </Button>
          </div>
        )}
      {meetup.status === MeetupStatus.REQUEST &&
        (userStore.hasChiefPermission() ||
          userStore.hasPermissionToInteract(meetup.author.id)) && (
          <div className={styles.actionsWrapper}>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={(e) => {
                e.preventDefault();
                !!id && removeMeetup(id);
                navigate('/meetups/moderation');
              }}
            >
              <FormattedMessage id="buttons.delete" defaultMessage="Удалить" />
            </Button>
            {userStore.hasChiefPermission() && (
              <Button
                variant={ButtonVariant.Primary}
                onClick={() => {
                  id && meetupStore.approve(id);
                  navigate('/meetups/upcoming');
                }}
              >
                <FormattedMessage
                  id="buttons.publish"
                  defaultMessage="Опубликовать"
                />
              </Button>
            )}
          </div>
        )}
      {meetup.status === MeetupStatus.CONFIRMED &&
        (userStore.hasChiefPermission() ||
          userStore.hasPermissionToInteract(meetup.author.id)) && (
          <Button
            variant={ButtonVariant.Secondary}
            onClick={(e) => {
              e.preventDefault();
              !!id && removeMeetup(id);
              navigate('/meetups/upcoming');
            }}
          >
            <FormattedMessage id="buttons.delete" defaultMessage="Удалить" />
          </Button>
        )}
    </div>
  );
};
