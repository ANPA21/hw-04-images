import styled from 'styled-components';

export const StyledModal = styled.div`
  top: '50%';
  left: '50%';
  right: 'auto';
  bottom: 'auto';
  margin-right: '-50%';
  transform: 'translate(-50%, -50%)';

  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export const StyledOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3500;
  background: #212b3277;
`;

export const ModalImage = styled.img`
  border-radius: 4px;
`;
