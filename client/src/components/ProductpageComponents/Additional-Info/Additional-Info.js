/* eslint-disable react/prop-types */
import React from 'react'
import Table from '@mui/joy/Table';

const Additional = ({product}) => {
  return (
    <Table aria-label="basic table" borderAxis="both" variant='outlined' >
        <tbody>
        <tr>
            <td style={{ width: '10%' }}>Color</td>
            <td>{product.colors.map((color) => color.charAt(0).toUpperCase() + color.slice(1)).join(', ')}</td>
        </tr>
        <tr>
        <td style={{ width: '10%' }}>Size</td>
        <td>{product.sizes.join(', ')}</td>
        </tr>
        </tbody>
   </Table>
  )
}

export default Additional