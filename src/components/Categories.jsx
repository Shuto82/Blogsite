import React from 'react'
import Stack from '@mui/material/Stack';
import { SingleChip } from './SingleChip';
import { Typography } from '@mui/material';
import { CategContext } from '../context/CategContext';
import { useContext } from 'react';

export const Categories = ({selectedCateg, setSelectedCateg}) => {
    const {categories} = useContext(CategContext);

  return (
    <div>
<Stack direction="row" spacing={1}>
<Typography>
Kategóriák
</Typography>
 {categories && categories.map(obj => 
    <SingleChip key={obj.name} name={obj.name} 
    selectedCateg = {selectedCateg}
    setSelectedCateg = {setSelectedCateg}
    />
    )}
</Stack>
    </div>
  )
}
