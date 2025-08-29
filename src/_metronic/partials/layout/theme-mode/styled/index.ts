import { getAccordionStyles } from './Accordion.style';
import { getButtonStyles } from './Button.styles';
import { getCardStyles } from './Card.styles';
import { getDataGridStyles } from './DataGrid.styles';
import { getDividerStyles } from './Divider.style';
import { getFormStyles } from './Form.styles';
import { getRadioStyles } from './Radio.style';
import { StyleFunction, StyledComponentProps } from './types';

export const MuiStyledComponents: StyleFunction = ({ palette, themeMode }: StyledComponentProps) => ({
  ...getButtonStyles(palette),
  ...getDataGridStyles(themeMode),
  ...getFormStyles(palette),
  ...getCardStyles(palette),
  ...getDividerStyles(palette),
  ...getRadioStyles(palette),
  // ...getAccordionStyles(themeMode),
});
