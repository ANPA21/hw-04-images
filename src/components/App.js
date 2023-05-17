import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Error, Wrapper, Notification } from './App.styled';
import { fetchImages } from '../Api';

const ERROR_MSG = 'Something went wrong, please try again!';
const NO_RSLT_MSG = 'No results found.';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  handleSubmit = searchQuery => {
    this.setState({ query: searchQuery, page: 1, images: [] });
  };

  getImages = async () => {
    const { query, page } = this.state;
    try {
      this.setState({ isLoading: true });
      this.setState({ error: null });
      const fetchedImages = await fetchImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...fetchedImages],
      }));
    } catch (error) {
      this.setState({ error: ERROR_MSG });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, error } = this.state;

    let noResultsNotification = null;
    if (
      this.state.query !== '' &&
      this.state.images.length === 0 &&
      !isLoading
    ) {
      noResultsNotification = true;
    }

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length !== 0 && <ImageGallery items={this.state.images} />}
        {isLoading && <Loader />}
        {error && <Error>{error}</Error>}
        {noResultsNotification && <Notification>{NO_RSLT_MSG}</Notification>}
        {images.length !== 0 && !isLoading && (
          <Button onClick={this.loadMoreImages} />
        )}
      </Wrapper>
    );
  }
}
