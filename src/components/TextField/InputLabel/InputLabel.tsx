import { PropsWithChildren, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { Typography, TypographyComponent } from 'components';

import styles from './InputLabel.module.scss';

export const InputLabel = ({
  children,
  ...nativeHtmlProps
}: PropsWithChildren & HTMLAttributes<HTMLLabelElement>): JSX.Element => (
  <Typography
    {...nativeHtmlProps}
    component={TypographyComponent.Heading3}
    className={classNames(nativeHtmlProps.className, styles.label)}
  >
    {children}
  </Typography>
);