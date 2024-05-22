import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export type SortIconProps = {
  sortDirection: 'asc' | 'desc';
  onClick?: () => void;
};

export default function SortIcon({ sortDirection, onClick }: SortIconProps) {
  return (
    <IconButton sx={{ opacity: 0.8 }} onClick={onClick}>
      {sortDirection == 'asc' ? (
        <ArrowUpward fontSize="small" />
      ) : (
        <ArrowDownward fontSize="small" />
      )}
    </IconButton>
  );
}
