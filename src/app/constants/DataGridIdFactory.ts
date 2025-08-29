type DataGridCategory = 'SpecialOrder';

/**
 * @example
 * const id = getDataGridId('SpecialOrder', 'BussinessExpertOrderList'
 */
export const createDataGridId = (category: DataGridCategory, key: string): string => {
  return `${category}${key}`;
};

const DataGridIdConstants = {
  SpecialOrder: {
    BussinessExpertOrderList: createDataGridId('SpecialOrder', 'BussinessExpertOrderList'),
    ProductList: createDataGridId('SpecialOrder', 'ProductList'),
  },
};

export default DataGridIdConstants;
