import { Stepper, StepInfo } from 'components';
import { RequiredFields, AdditionalFields } from 'pages';
import { NewMeetup, ShortUser } from 'model';
import { meetupStore } from 'stores';

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
      title: 'Обязательные поля',
      element: RequiredFields,
      noVerify: false,
    },
    {
      title: 'Дополнительные поля',
      element: AdditionalFields,
      noVerify: false,
    },
  ];

  let onFinishCheck = async () => {
    await meetupStore.create(meetup);
  };

  return (
    <div className={styles.wrapper}>
      <Stepper
        steps={steps}
        finishButtonContent="Создать"
        onFinish={onFinishCheck}
      />
    </div>
  );
};
