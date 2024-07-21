import {
  Button,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { Form } from '@edwinlee/common-ui';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';

export default function FormModalTest() {
  const form = useForm({
    defaultValues: {
      textField: 'Text field value',
      checkbox: true,
      datePicker: '2024-01-01',
      select: '',
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = form;

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    onClose();
  };

  return (
    <FormProvider {...form}>
      <Stack gap={1}>
        <Typography fontWeight={900}>Form Modal</Typography>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open Form Modal
        </Button>

        <Form.FormModal
          title="Test Form Modal"
          isDirty={isDirty}
          open={open}
          onClose={onClose}
          onSubmit={handleSubmit(onSubmit)}
          onModalExited={reset}
        >
          <CardContent component={Stack} gap={2}>
            <Typography>Is Dirty: {isDirty ? 'True' : 'False'}</Typography>
            <Form.FormTextField
              name="textField"
              label={'Text Field'}
              rules={{
                required: 'This field is required.',
              }}
            />
            <Form.FormCheckbox name="checkbox" label="Checkbox" />
            <Form.FormDatePicker name="datePicker" label={'Date Picker'} />
            <Form.FormSelect
              name="select"
              label="Select"
              options={[
                {
                  label: 'Option 1',
                },
                { label: 'Option 2' },
                { label: 'Option 2' },
              ]}
            />

            {/* None validatable fields */}
            <Form.ClearableTextField label={'Clearable Text Field'} />
            <Form.NumberFilterInput label={'Number Input Filter'} />
            <Form.TextFieldWithOptions
              options={[
                {
                  value: 'Option 1',
                },
                {
                  value: 'Option 2',
                },
                {
                  value: 'Option 3',
                },
              ]}
            />
          </CardContent>

          <CardActions>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </CardActions>
        </Form.FormModal>
      </Stack>
    </FormProvider>
  );
}
