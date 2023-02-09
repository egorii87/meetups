import { Typography, TypographyComponent } from 'components';
import { FormattedMessage } from 'react-intl';

import styles from './DescriptionText.module.scss';

export const DescriptionText = () => {
  return (
    <div>
      <Typography
        className={styles.header}
        component={TypographyComponent.Heading1}
      >
        <FormattedMessage
          id="meetups.stepper.description.header"
          defaultMessage="Новый митап"
        />
      </Typography>
      <Typography
        className={styles.paragraph}
        component={TypographyComponent.Paragraph}
      >
        <FormattedMessage
          id="meetups.stepper.description.paragraph"
          defaultMessage="Заполните необходимые поля ниже наиболее подробно, это даст полную информацию о предстоящем событии."
        />
      </Typography>
    </div>
  );
};
