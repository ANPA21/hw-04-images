import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Input,
  Label,
  SearchBtn,
  Searchform,
  StyledSearchbar,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const handeInputChange = event => {
    setInputValue(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(inputValue);
  };
  return (
    <StyledSearchbar className="searchbar">
      <Searchform className="form" onSubmit={handleSubmit}>
        <SearchBtn type="submit" className="button">
          <Label className="button-label">Search</Label>
        </SearchBtn>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handeInputChange}
        />
      </Searchform>
    </StyledSearchbar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
