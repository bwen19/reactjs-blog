import { ElementType, forwardRef, Ref } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

const StyledBox = styled(Box)({
  width: '100%',
  height: '100vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const StyledBoxCover = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: alpha(theme.palette.grey[900], 0.25),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ImageBackDrop = forwardRef(
  <C extends ElementType>(props: BoxProps<C, { component?: C }>, ref: Ref<HTMLDivElement>) => {
    const { children, ...other } = props;
    return (
      <StyledBox {...other} ref={ref}>
        <StyledBoxCover>{props.children}</StyledBoxCover>
      </StyledBox>
    );
  },
);

ImageBackDrop.displayName = 'ImageBackDrop';
export default ImageBackDrop;
