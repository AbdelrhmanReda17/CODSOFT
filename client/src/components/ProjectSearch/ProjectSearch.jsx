import React, { useState } from 'react';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/joy/Button';
import { useSelector } from 'react-redux';

const ProjectSearch = ({ updateSearchText }) => {
 const {isLoading} = useSelector((state) => state.appReducer);
  const [text, setText] = useState();
  const handleInputChange = (e , newValue) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    updateSearchText(text);
  }
  return (
    <Input
      startDecorator={<SearchIcon color="primary" fontSize='medium' />}
      color="primary"
      placeholder='Search text...'
      value={text} // Use the searchText from props
      onChange={handleInputChange} // Call handleInputChange on input change
      endDecorator={<Button color="primary" onClick={handleSubmit} loading={isLoading}  className='me-1 ms-1 ' variant="soft">Search</Button>}
      sx={{ height: '45px', width: '70%' }}
      size='lg'
    ></Input>
  );
};

export default ProjectSearch;
