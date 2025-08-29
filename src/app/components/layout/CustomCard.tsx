import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { ReactNode } from 'react';

type CustomCardType = {
  header: ReactNode;
  children: ReactNode;
};

const CustomCard = ({ header, children }: CustomCardType) => {
  return (
    <>
      <Card>
        <CardHeader title={header} />
        <Divider variant="fullWidth" />
        <CardContent>{children}</CardContent>
      </Card>
    </>
  );
};

export default CustomCard;
