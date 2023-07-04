import { Box, Typography } from '@mui/material';

type CartFooterProps = {
  total: string;
};

export function CartFooter({ total }: CartFooterProps) {
  return (
    <Box
      component='footer'
      sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'baseline'
      }}>
      <Box>
        <Box
          component='span'
          sx={{ fontWeight: 'bold', color: '#999', mr: 1 }}>
          TOTAL:
        </Box>
        <Typography
          component='strong'
          sx={{ fontSize: '28px', fontWeight: 'bold' }}>
          {total}
        </Typography>
      </Box>
    </Box>
  );
}
