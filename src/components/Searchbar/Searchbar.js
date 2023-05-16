import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  Input,
  Label,
  SearchBtn,
  Searchform,
  StyledSearchbar,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handeInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputValue);
  };
  render() {
    return (
      <StyledSearchbar className="searchbar">
        <Searchform className="form" onSubmit={this.handleSubmit}>
          <SearchBtn type="submit" className="button">
            <Label className="button-label">Search</Label>
          </SearchBtn>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handeInputChange}
          />
        </Searchform>
      </StyledSearchbar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
