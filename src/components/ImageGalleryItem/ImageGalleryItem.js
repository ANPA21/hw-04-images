import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import Modal from 'react-modal';
import { ListItem, ListImage } from './ImageGalleryItem.styled';
import { ImageModal } from 'components/Modal/Modal';

Modal.setAppElement('#root');

export const ImageGalleryItem = ({
  image: { previewURL, tags, webformatURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Fragment>
      <ListItem className="gallery-item">
        <ListImage src={previewURL} alt={tags} onClick={openModal} />
      </ListItem>
      <ImageModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        largeImage={webformatURL}
        tags={tags}
      />
    </Fragment>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    previewURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
};
