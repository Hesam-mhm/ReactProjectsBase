/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import * as React from 'react';
import { gridPageCountSelector, useGridApiContext, useGridSelector, gridPageSizeSelector, gridPageSelector } from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import {
  getDataGridStyles,
  getDataGridContainerStyles,
  getDataGridSelectStyles,
} from '../../../_metronic/partials/layout/theme-mode/styled/DataGrid.styles';
import { useThemeMode } from '../../../_metronic/partials/layout/theme-mode/ThemeModeProvider';
import { usePagination } from '../../context/PaginationContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterButton from '../molecule/FilterButton';
import CustomButtonWithIcon from '../molecule/CustomButtonWithIcon';
import { AddCircleIcon } from '../../Iconify/AddCircleIcon';

/**
 * Props for DataGridComponent
 * @template T - Type of data in the table
 * @property {T[]} tableVarient - Array of data to display in the grid
 * @property {GridColDef[]} columns - Column definitions for the grid
 * @property {keyof T} rowIdKey - Key to use as unique identifier for each row
 * @property {string} gridId - Unique identifier for this grid instance to manage its pagination state
 */
type DataGridComponentProps<T> = {
  tableVarient: T[];
  columns: GridColDef[];
  rowIdKey: keyof T;
  headerMainTitle: string;
  dataKindTitle?: string;
  dataTotalNumber?: number;
  gridId: string;
  withCustomButton?: boolean;
  withFilterButton?: boolean;
  customButtonTitle?: string;
  customButtonIcon?: React.ReactNode;
  disabledButton?: boolean;
  showPagination?: boolean;
  handleFilterClick?: () => void;
  handleCustomButtonClick?: () => void;
  onPageModelChange?: (model: GridPaginationModel) => void;
};

/**
 * Custom pagination component for the DataGrid
 * Handles page size selection and page navigation
 */
function Pagination({
  page,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: {
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  pageSize: number;
  onPageSizeChange: (event: SelectChangeEvent<number>) => void;
}) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row-reverse' }}
      alignItems="center"
      width={'100%'}
      justifyContent="space-between"
      gap={2}
      p={{ xs: 1, sm: 2 }}
    >
      <MuiPagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, newPage) => {
          onPageChange(event, newPage - 1);
        }}
        size={isMobile ? 'small' : 'medium'}
      />

      <FormControl sx={{ width: { xs: '100%', sm: 'auto' } }}>
        <Select sx={getDataGridSelectStyles()} value={pageSize} onChange={onPageSizeChange} IconComponent={KeyboardArrowDownIcon}>
          {[5, 10, 20].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

/**
 * Custom pagination wrapper component
 * Integrates with DataGrid's pagination system and PaginationContext
 */
function CustomPagination(props: { className?: string; gridId: string }) {
  const apiRef = useGridApiContext();
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const page = useGridSelector(apiRef, gridPageSelector);
  const { setPaginationState } = usePagination();

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = event.target.value as number;
    apiRef.current.setPageSize(newPageSize);
    apiRef.current.resetRowHeights();

    setPaginationState(props.gridId, {
      pageSize: newPageSize,
      page: page,
    });
  };

  return (
    <Pagination
      page={page}
      pageSize={pageSize}
      onPageChange={(event, newPage) => {
        apiRef.current.setPage(newPage);
        setPaginationState(props.gridId, {
          page: newPage,
          pageSize: pageSize,
        });
      }}
      onPageSizeChange={handlePageSizeChange}
      {...props}
    />
  );
}

/**
 * DataGrid Component
 * A reusable data grid component with built-in pagination, state management and styling
 *
 * @example
 * ```tsx
 * // Define your data type
 * interface UserData {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * // Define columns
 * const columns: GridColDef[] = [
 *   {
 *     field: 'name',
 *     headerName: 'نام',
 *     flex: 1,
 *   },
 *   {
 *     field: 'email',
 *     headerName: 'ایمیل',
 *     flex: 1,
 *   }
 * ];
 *
 * // Your data
 * const users: UserData[] = [
 *   { id: 1, name: 'علی', email: 'ali@example.com' },
 *   { id: 2, name: 'مریم', email: 'maryam@example.com' }
 * ];
 *
 * // Use the component with pagination state management
 * <DataGridComponent
 *   columns={columns}
 *   tableVarient={users}
 *   rowIdKey="id"
 *   gridId="users-grid"
 * />
 * ```
 *
 * Features:
 * - Automatic pagination with customizable page sizes (5, 10, 20)
 * - Persistent pagination state across page navigation
 * - Responsive design
 * - Dark/Light theme support
 * - Customizable header
 * - Alternating row colors
 * - RTL support
 * - Custom styling through theme
 */
const DataGridComponent = <T,>({
  columns,
  disabledButton = false,
  tableVarient,
  rowIdKey,
  headerMainTitle,
  dataTotalNumber,
  dataKindTitle,
  gridId,
  withFilterButton = true,
  withCustomButton = true,
  handleFilterClick,
  handleCustomButtonClick,
  customButtonTitle,
  onPageModelChange,
  customButtonIcon = <AddCircleIcon />,
  showPagination = true,
}: DataGridComponentProps<T>) => {
  const { mode } = useThemeMode();
  const dataGridStyles = getDataGridStyles(mode);
  const { getPaginationState, resetPaginationState } = usePagination();

  const { page, pageSize } = getPaginationState(gridId);
  React.useEffect(() => {
    resetPaginationState(gridId);
  }, [gridId]);
  return (
    <Box sx={getDataGridContainerStyles()}>
      <Box sx={{ p: '16px' }} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
        <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
          <Typography fontSize={'16px'} fontWeight={'700'}>
            {headerMainTitle}
          </Typography>
          {dataKindTitle && (
            <Typography fontSize={'14px'} fontWeight={'400'}>
              {`نمایش ${dataTotalNumber || 0} ${dataKindTitle}`}
            </Typography>
          )}
        </Box>
        <Box gap={'16px'} display={'flex'} flexDirection={'row'}>
          {withFilterButton && <FilterButton onClick={handleFilterClick} />}
          {withCustomButton && (
            <CustomButtonWithIcon
              buttonTitle={customButtonTitle}
              onClick={handleCustomButtonClick}
              startIcon={customButtonIcon}
              disabled={disabledButton}
            />
          )}
        </Box>
      </Box>

      <DataGrid
        autoHeight
        disableRowSelectionOnClick
        rows={tableVarient || []}
        columns={columns}
        disableColumnFilter={false}
        getRowId={(row) => row[rowIdKey] as string}
        onPaginationModelChange={(model) => {
          if (onPageModelChange) {
            onPageModelChange(model);
          }
        }}
        slots={{
          pagination: showPagination ? (props) => <CustomPagination {...props} gridId={gridId} /> : undefined,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize || 5,
              page: page || 0,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        pagination={showPagination ? true : undefined}
        hideFooterPagination={!showPagination}
        localeText={{
          noRowsLabel: 'رکوردی یافت نشد',
        }}
        sx={dataGridStyles.MuiDataGrid.styleOverrides.root}
      />
    </Box>
  );
};

export default DataGridComponent;
