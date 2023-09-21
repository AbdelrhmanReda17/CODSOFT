import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProjects } from '../../store/projectAction';

const useSearchAndFilter = (page , id) => {
  const dispatch=useDispatch();
  const [searchText, setSearchText] = useState('');
  const [filterOption, setFilterOption] = useState('Default');

  const updateSearchText = (text) => {
    setSearchText(text);   
    dispatch(getProjects(page,id , text, filterOption));
  };

  const updateFilterOption = (option) => {
    setFilterOption(option);
    dispatch(getProjects(page,id , searchText, option));
  };

  return {
    searchText,
    filterOption,
    updateSearchText,
    updateFilterOption,
  };
};

export default useSearchAndFilter;
