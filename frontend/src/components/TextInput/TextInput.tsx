import { HTMLAttributes } from 'react';

type TextInputProps = {
  readonly?: boolean;
} & HTMLAttributes<HTMLInputElement>;

export const TextInput = ({
  readonly,
  ...nativeHtmlProps
}: TextInputProps): JSX.Element =>
  !readonly ? (
    <input type="text" {...nativeHtmlProps} />
  ) : (
    <input type="text" readOnly {...nativeHtmlProps} />
  );
