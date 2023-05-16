import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Error, Wrapper, Notification } from './App.styled';
import { fetchImages } from './Api';

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
  componentDidMount() {}
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ page: 1 }, () => {
        this.getImages();
      });
    }
    if (prevState.page !== this.state.page) {
      this.getImages();
    }
  }

  getSearchQuery = searchQuery => {
    this.setState({ query: searchQuery });
  };

  getImages = async () => {
    const { query, page } = this.state;
    try {
      this.setState({ isLoading: true });
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
    if (this.state.query !== '' && this.state.images.length === 0) {
      noResultsNotification = true;
    }

    return (
      <Wrapper>
        <Searchbar onSubmit={this.getSearchQuery} />
        <ImageGallery items={this.state.images} />
        {isLoading && <Loader />}
        {error && <Error>{error}</Error>}
        {noResultsNotification && <Notification>{NO_RSLT_MSG}</Notification>}
        {images.length !== 0 && <Button onClick={this.loadMoreImages} />}
      </Wrapper>
    );
  }
}
