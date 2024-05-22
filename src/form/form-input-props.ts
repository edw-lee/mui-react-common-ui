import { Control, RegisterOptions } from 'react-hook-form';

export type FormRules =
  | Omit<
      RegisterOptions<any, any>,
      'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
    >
  | undefined;

export type FormInputProps = {
  name: string;
  control: Control<any>;
  label?: string;
  rules?:
    | Omit<
        RegisterOptions<any, any>,
        'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
      >
    | undefined;
};
