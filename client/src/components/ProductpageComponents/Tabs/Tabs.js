/* eslint-disable react/prop-types */
import React from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { AdditionalInfo , Reviews } from '../..';

const CustomTabs = ({product}) => {
  return (
    <Tabs   
    aria-label="Placement indicator tabs"
    defaultValue={0}
    sx={{
        gridColumn: '1/-1',
        backgroundColor: "transparent",
        borderBlockColor: "none"
      }}
    >
      <TabList>        
        <Tab indicatorPlacement="top" value={0}> Reviews ({product.reviews.length}) </Tab>
        <Tab indicatorPlacement="top" value={1}> Additional information </Tab>
      </TabList>
      <TabPanel value={0}>
            <Reviews product={product}/>
      </TabPanel>
      <TabPanel value={1}>
            <AdditionalInfo product={product} />
      </TabPanel>
    </Tabs>
  )
}

export default CustomTabs