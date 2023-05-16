import PropTypes from 'prop-types';
import { StyledModal, StyledOverlay, ModalImage } from './Modal.styled';
import Modal from 'react-modal';

export const ImageModal = ({ isModalOpen, closeModal, largeImage, tags }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="overlay"
      contentElement={(props, children) => (
        <StyledModal {...props}>{children}</StyledModal>
      )}
      overlayElement={(props, contentElement) => (
        <StyledOverlay {...props}>{contentElement}</StyledOverlay>
      )}
    >
      <ModalImage src={largeImage} alt={tags} />
    </Modal>
  );
};

ImageModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
