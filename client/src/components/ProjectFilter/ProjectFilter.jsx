import React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useSelector } from 'react-redux';

const ProjectFilter = ({ filterOption, updateFilterOption }) => {
const {isLoading} = useSelector((state) => state.appReducer);

  const handleChange = (e , newValue) => {
    updateFilterOption(newValue);
  };

  return (
    <Select
      placeholder="Default sorting"
      variant="outlined"
      color='primary'
      value={filterOption}
      disabled={isLoading}
      onChange={handleChange}
      sx={{ height: '40px', width: '30%' }}
    >
      <Option value="Default">Default sorting</Option>
      <Option value="Completed">Sort by Completed</Option>
      <Option value="In Progress">Sort by In Progress</Option>
      <Option value="Expired">Sort by On Expired</Option>
    </Select>
  );
};

export default ProjectFilter;
