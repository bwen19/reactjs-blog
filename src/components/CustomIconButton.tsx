import { ElementType, forwardRef, Ref } from 'react';
import { styled } from '@mui/material/styles';
import { ButtonBase, ButtonBaseProps } from '@mui/material';

// -------------------------------------------------------------------

const Wrapper = styled('div')(({ theme }) => ({
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.grey[200],
  '&:hover': {
    color: theme.palette.primary.light,
  },
}));

// ========================// CustomIconButton //======================== //

const CustomIconButton = forwardRef(
  <C extends ElementType>(props: ButtonBaseProps<C, { component?: C }>, ref: Ref<HTMLButtonElement>) => {
    const { children, ...other } = props;
    return (
      <ButtonBase {...other} ref={ref} sx={{ borderRadius: '12px' }}>
        <Wrapper>{props.children}</Wrapper>
      </ButtonBase>
    );
  },
);

CustomIconButton.displayName = 'CustomIconButton';
export default CustomIconButton;
