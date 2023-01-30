import { Typography, TypographyComponent } from 'components';

import styles from './DescriptionText.module.scss';

export const DescriptionText = () => {
  return (
    <div>
      <Typography
        className={styles.header}
        component={TypographyComponent.Heading1}
      >
        Новый митап
      </Typography>
      <Typography
        className={styles.paragraph}
        component={TypographyComponent.Paragraph}
      >
        Заполните необходимые поля ниже наиболее подробно, это даст полную
        информацию о предстоящем событии.
      </Typography>
    </div>
  );
};
