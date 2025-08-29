import { Accordion, AccordionDetails, AccordionSummary, Card, Divider, SxProps } from '@mui/material';
import { SolarRoundAltArrowUpOutline } from '../../Iconify/SolarRoundAltArrowUpOutline';

type CustomAccordionComponentProps = {
  accordionSummary: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  direction?: 'rtl' | 'ltr';
  sx?: SxProps;
  summarySx?: SxProps;
};

export const CustomAccordionComponent = ({
  accordionSummary,
  children,
  defaultExpanded = false,
  direction = 'ltr',
  sx,
  summarySx,
}: CustomAccordionComponentProps) => {
  return (
    <Card
      sx={{
        m: '16px',
        mt: '0px',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'divider',
        ...sx,
      }}
    >
      <Accordion defaultExpanded={defaultExpanded}>
        <AccordionSummary
          sx={{
            flexDirection: direction === 'rtl' ? 'row-reverse' : 'row',
            ...summarySx,
          }}
          expandIcon={<SolarRoundAltArrowUpOutline />}
          color="primary"
          aria-controls="panel3-content"
          id="panel3-header"
        >
          {accordionSummary}
        </AccordionSummary>
        <Divider />
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Card>
  );
};
