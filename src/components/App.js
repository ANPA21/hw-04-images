import { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Error, Wrapper } from './App.styled';
import { fetchImages } from '../Api';

const ERROR_MSG = 'Something went wrong, please try again!';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  const handleSubmit = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(null);
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (query === '') return;
    const getImages = async () => {
      try {
        setIsLoading(true);
        const fetchedImages = await fetchImages(query, page, abortController);
        if (!abortController.signal.aborted) {
          setImages(prevImages => [...prevImages, ...fetchedImages.hits]);
          setShowBtn(
            page < Math.ceil(fetchedImages.totalHits / 20) ? true : false
          );
        }
      } catch (error) {
        if (error.name === 'CanceledError') {
          setError(error.name);
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

  return (
    <Wrapper>
      <Searchbar onSubmit={handleSubmit} />
      {images.length !== 0 && <ImageGallery items={images} />}
      {isLoading && <Loader />}
      {error && <Error>{error}</Error>}
      {images.length !== 0 && !isLoading && showBtn && (
        <Button onClick={loadMoreImages} />
      )}
    </Wrapper>
  );
};
