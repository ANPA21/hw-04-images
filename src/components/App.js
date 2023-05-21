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
  // Нужен для catch фазы фетча, что бы знать, что фетч был отменен
  const [abortedFetch, setAbortedFetch] = useState(false);
  // Нужен для отображения "Нет результатов"
  const [noResultsNotification, setNoResultsNotification] = useState(false);

  const handleSubmit = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (query === '') return;
    const getImages = async () => {
      try {
        setIsLoading(true);
        // Ресет динамичных стейтов перед фетчем
        setError(null);
        setAbortedFetch(false);
        const fetchedImages = await fetchImages(query, page, abortController);
        if (!abortController.signal.aborted) {
          setImages(prevImages => [...prevImages, ...fetchedImages]);
        }
      } catch (error) {
        if (error.name === 'CanceledError') {
          setAbortedFetch(true);
          return;
        }
        setError(ERROR_MSG);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
    return () => {
      abortController.abort();
    };
  }, [query, page]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Логика отображения "Нет результатов"
  // Выполняется если есть query, не идет загрузка, фетч не был отменен, но картинок нет
  useEffect(() => {
    if (query !== '' && images.length === 0 && !isLoading && !abortedFetch) {
      setNoResultsNotification(true);
    } else {
      setNoResultsNotification(false);
    }
  }, [query, images.length, isLoading, abortedFetch]);

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
