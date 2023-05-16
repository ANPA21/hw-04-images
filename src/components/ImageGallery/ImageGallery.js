import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ items }) => {
  return (
    <GalleryList>
      {items.map(item => (
        <ImageGalleryItem key={item.id} image={item} />
      ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
