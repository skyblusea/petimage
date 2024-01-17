import { LinkProps } from "react-router-dom";
import Button, { ButtonProps } from "@mui/material/Button";
import ListItemButton, {ListItemButtonOwnProps} from '@mui/material/ListItemButton';
import MenuItem from '@mui/material/MenuItem';


import styled from '@emotion/styled'

interface LinkButtonProps extends ButtonProps {
  to: LinkProps['to'];
}

export const LinkButton = styled(Button)<LinkButtonProps>(() => ({}));


interface ListItemButtonProps extends ListItemButtonOwnProps {
  to: LinkProps['to'];
}

export const LinkListItemButton = styled(ListItemButton)<ListItemButtonProps>(() => ({}))

export const LinkMenuItem = styled(MenuItem)<ListItemButtonProps>(() => ({}))