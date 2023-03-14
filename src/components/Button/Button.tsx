import classNames from 'classnames';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Default = 'default',
}

type ButtonProps = {
  className?: string;
  variant?: ButtonVariant;
} & PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className,
  variant = ButtonVariant.Primary,
  children,
  ...nativeButtonProps
}: ButtonProps): JSX.Element => (
  <button
    {...nativeButtonProps}
    className={classNames(styles.button, styles[variant], className)}
  >
    {children}
  </button>
);
