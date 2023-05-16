import PropTypes from 'prop-types';
import { Component, Fragment } from 'react';
import Modal from 'react-modal';
import { ListItem, ListImage } from './ImageGalleryItem.styled';
import { ImageModal } from 'components/Modal/Modal';

Modal.setAppElement('#root');

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };
  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const {
      image: { previewURL, tags, webformatURL },
    } = this.props;
    return (
      <Fragment>
        <ListItem className="gallery-item">
          <ListImage src={previewURL} alt={tags} onClick={this.openModal} />
        </ListItem>
        <ImageModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          largeImage={webformatURL}
          tags={tags}
        />
      </Fragment>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    previewURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
};
