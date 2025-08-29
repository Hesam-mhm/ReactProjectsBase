import { Button } from '@mui/material';
import React from 'react';
import { SolarFilterOutline } from '../../Iconify/FilterOutline';

type FilterButtonType = {
  onClick: () => void;
};

const FilterButton = ({ onClick }: FilterButtonType) => {
  return (
    <>
      <Button variant="outlined" startIcon={<SolarFilterOutline />} color="secondary" onClick={onClick}>
        فیلتر
      </Button>
    </>
  );
};

export default FilterButton;
