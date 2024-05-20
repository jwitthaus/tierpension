import React from 'react'
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const Button = styled(MuiButton)(({ theme }) => ({

    borderRadius: '12px', 
    height: '48px', 
    flex:1, 
    borderColor:theme.palette.border.main,
    color: theme.palette.text.standard,
  }));

const SecondaryButton = (props) => {
  return (
    <Button variant="outlined" startIcon={props.icon}>{props.label}</Button>
  )
}

export default SecondaryButton