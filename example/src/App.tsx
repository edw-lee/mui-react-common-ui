import { Stack } from '@mui/material';
import AlertPromptTest from './components/alert-prompt-test';
import SpinnerTest from './components/spinner-test';
import CollapsibleTableTest from './components/collapsible-table-test';
import DataTableTest from './components/data-table-test';
import FormModalTest from './components/form-test';
import SlideModalTest from './components/slide-modal-test';

function App() {
  return (
    <Stack gap={5} marginY={5}>
      <SpinnerTest />
      <AlertPromptTest />
      <SlideModalTest />
      <CollapsibleTableTest />
      <DataTableTest />
      <FormModalTest />
    </Stack>
  );
}

export default App;
