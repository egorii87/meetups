import { FormattedMessage } from 'react-intl';
import { Stepper, StepInfo } from 'components';
import { RequiredFields, AdditionalFields } from 'pages';
import { NewMeetup, ShortUser } from 'model';
import { meetupStore } from 'stores';
import { image64 } from 'pages';

import styles from './CreateMeetup.module.scss';

const dateModified = new Date();

const authorMeetup: ShortUser = {
  id: 'uuu-aaa',
  name: 'employee',
  surname: 'Gerlach',
};

export const meetup: NewMeetup = {
  modified: dateModified.toJSON(),
  author: authorMeetup,
  subject: '',
  place: '',
  speakers: [authorMeetup],
};

export const CreateMeetup = () => {
  const steps: StepInfo[] = [
    {
      title: (
        <FormattedMessage
          id="meetups.stepper.steps.requiredFields"
          defaultMessage="Обязательные поля"
        />
      ),
      key: 'Обязательные поля',
      element: RequiredFields,
      noVerify: false,
    },
    {
      title: (
        <FormattedMessage
          id="meetups.stepper.steps.additionalFields"
          defaultMessage="Дополнительные поля"
        />
      ),
      key: 'Дополнительные поля',
      element: AdditionalFields,
      noVerify: false,
    },
  ];

  let onFinishCheck = async () => {
    const newMeetup = await meetupStore.create(meetup);
    localStorage.setItem(newMeetup.id, image64);
  };

  return (
    <div className={styles.wrapper}>
      <Stepper
        steps={steps}
        finishButtonContent={
          <FormattedMessage id="buttons.create" defaultMessage="Создать" />
        }
        onFinish={onFinishCheck}
      />
      <div className={styles.backgroung}></div>
    </div>
  );
};
