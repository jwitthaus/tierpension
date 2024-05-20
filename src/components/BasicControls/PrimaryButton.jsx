import React from 'react'
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const Button = styled(MuiButton)(({ theme }) => ({

    borderRadius: '12px', 
    height: '48px', 
    flex:1, 
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: '#C1EF72',
    },
  }));

const PrimaryButton = (props) => {
  return (
    <Button variant="contained" onClick={props.onClick} startIcon={props.icon}>{props.label}</Button>
  )
}

export default PrimaryButton