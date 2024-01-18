import { Link, LinkProps } from "react-router-dom";
import Button, { ButtonProps } from "@mui/material/Button";
import ListItemButton, {ListItemButtonOwnProps} from '@mui/material/ListItemButton';
import MenuItem from '@mui/material/MenuItem';


import styled from '@emotion/styled'
import { Box, BoxProps } from "@mui/material";

interface LinkButtonProps extends ButtonProps {
  to: LinkProps['to'];
}

export const LinkButton = styled(Button)<LinkButtonProps>(() => ({}));


interface ListItemButtonProps extends ListItemButtonOwnProps {
  to: LinkProps['to'];
}

export const LinkListItemButton = styled(ListItemButton)<ListItemButtonProps>(() => ({}))

export const LinkMenuItem = styled(MenuItem)<ListItemButtonProps>(() => ({}))


export function LinkBox ({
  to,
  children,
  ...props
}:{
  to: LinkProps['to'];
  children?: React.ReactNode;
  props?: BoxProps;
}) {
  return (
    <Box component={Link} to={to} {...props}>
      {children}
    </Box>
  )
}
