import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

type CreateColumnParams<T = any> = {
  field: string;
  headerName: string;
  renderCell?: (params: GridRenderCellParams<T>) => React.ReactNode;
} & Partial<GridColDef>;

export const createColumn = <T = any,>({ field, headerName, renderCell, ...rest }: CreateColumnParams<T>): GridColDef => ({
  field,
  headerName,
  sortable: false,
  filterable: false,
  disableColumnMenu: true,
  editable: false,
  headerClassName: 'hideRightSeparator',
  headerAlign: 'center',
  align: 'center',
  renderCell,
  ...{
    flex: 1,
    minWidth: 150,
    ...rest, // Put rest *after* default values to override them
  },
});

type ColumnDefinition<T = any> = Omit<CreateColumnParams<T>, 'field' | 'renderCell'> & {
  field: keyof T | string;
  renderCell?: (params: GridRenderCellParams<T>) => React.ReactNode;
};

export const createColumns = <T = any,>(columns: ColumnDefinition<T>[]): GridColDef[] => {
  return columns.map((column) =>
    createColumn<T>({
      ...column,
      field: String(column.field),
    }),
  );
};
