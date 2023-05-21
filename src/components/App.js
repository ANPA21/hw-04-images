import { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Error, Wrapper, Notification } from './App.styled';
import { fetchImages } from '../Api';

const ERROR_MSG = 'Something went wrong, please try again!';
const NO_RSLT_MSG = 'No results found.';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortController = new AbortController();

  const handleSubmit = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };
  const getImages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedImages = await fetchImages(query, page, abortController);
      if (!abortController.signal.aborted) {
        setImages(prevImages => [...prevImages, ...fetchedImages]);
      }
    } catch (error) {
      setError(ERROR_MSG);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query === '') return;
    getImages();
    return () => {
      abortController.abort();
    };
  }, [query, page]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  let noResultsNotification = null;
  if (query !== '' && images.length === 0 && !isLoading) {
    noResultsNotification = true;
  }
  return (
    <Wrapper>
      <Searchbar onSubmit={handleSubmit} />
      {images.length !== 0 && <ImageGallery items={images} />}
      {isLoading && <Loader />}
      {error && <Error>{error}</Error>}
      {noResultsNotification && <Notification>{NO_RSLT_MSG}</Notification>}
      {images.length !== 0 && !isLoading && <Button onClick={loadMoreImages} />}
    </Wrapper>
  );
};
