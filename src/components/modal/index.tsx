import styled from 'styled-components';

interface ModalProps {
  onClose: () => void;
}

export const ModalContainer = styled.div`
  position: fixed;
  margin: auto;
  top: 50px;
  left: 30px;
  right: 30px;
  bottom: 50px;
  background: #1f1f1f;
  border-radius: 5px;

  max-width: 400px;
  width: 100%;
  height: fit-content;
  padding: 27px;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: flex-end;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const ModalFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;
