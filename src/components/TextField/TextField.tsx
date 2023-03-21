import {
  InputFieldExternalProps,
  InputField,
  InputRenderProps,
  TextInput,
  TextArea,
} from 'components';

type TextInputOrAreaProps = {
  placeholderText?: string;
  readonly?: boolean;
} & (
  | {
      multiline: false | undefined;
    }
  | {
      multiline: true;
      maxLetterCount?: number;
    }
);

type TextFieldProps = InputFieldExternalProps & TextInputOrAreaProps;

export const TextField = (props: TextFieldProps): JSX.Element => {
  let placeholderText: string | undefined;
  let inputFieldProps: InputFieldExternalProps;
  let multiline: boolean | undefined;
  let maxLetterCount: number | undefined;
  let readonly: boolean | undefined;

  switch (props.multiline) {
    case true:
      ({ placeholderText, multiline, maxLetterCount, ...inputFieldProps } =
        props);

      return (
        <InputField {...inputFieldProps}>
          {({ field, className }: InputRenderProps): JSX.Element => (
            <TextArea
              {...field}
              className={className}
              placeholder={placeholderText}
              maxLetterCount={maxLetterCount}
            />
          )}
        </InputField>
      );
    case false:
    default:
      ({ readonly, placeholderText, ...inputFieldProps } = props);

      return (
        <InputField {...inputFieldProps}>
          {({ field, className }: InputRenderProps): JSX.Element => (
            <TextInput
              {...field}
              className={className}
              placeholder={placeholderText}
              readonly={readonly}
            />
          )}
        </InputField>
      );
  }
};
