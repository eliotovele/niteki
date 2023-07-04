import { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { Box, Container } from '@mui/material';

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <Box mt={5}>
        <Container maxWidth='lg'>{children}</Container>
      </Box>
    </>
  );
}
