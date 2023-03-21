import React, { PropsWithChildren, useState } from 'react';
import classNames from 'classnames';
import { dataCy } from 'helpers';

import { Typography, TypographyComponent } from 'components';

import styles from './Tooltip.module.scss';

export enum TooltipVariant {
  Dark = 'dark',
  Colored = 'colored',
  Outline = 'outline',
  White = 'white',
}

interface TooltipProps {
  variant?: TooltipVariant;
  title?: string;
  description: string | JSX.Element;
  descriptionAction?: () => Promise<void>;
}

export const Tooltip = ({
  children,
  variant = TooltipVariant.Dark,
  title,
  description,
  descriptionAction,
}: PropsWithChildren<TooltipProps>) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      {...dataCy('tooltipWrapper')}
    >
      {children}
      <div
        className={classNames(styles.tooltip, styles[variant], {
          [styles.visible]: visible,
        })}
      >
        <Typography
          component={TypographyComponent.Heading3}
          className={styles.title}
        >
          {title}
        </Typography>
        <Typography
          component={TypographyComponent.Paragraph}
          className={styles.description}
          onClick={() => descriptionAction && descriptionAction()}
          {...dataCy('logoutTooltip')}
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};
