import { useRef } from 'react';

import Button from '@/components/button';
import CloseIcon from '@/components/icon/close';
import InputLabel from '@/components/input-label';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from '@/components/modal';
import { PointerComponent } from '@/styles/core';

interface AddModalProps {
  onClose: () => void;
  onAction: (name: string, peopleCount: string) => void;
}
function AddModal({ onClose, onAction }: AddModalProps) {
  const name = useRef('');
  const peopleCount = useRef('');

  const checkValidation = () => {
    if (!name.current) {
      alert('방 이름을 입력해주세요.');
      return false;
    }

    if (!peopleCount.current) {
      alert('방 인원을 입력해주세요.');
      return false;
    }

    return true;
  };

  const handleAction = () => {
    checkValidation();
    const editName = name.current;
    const editPeopleCount = peopleCount.current;

    onAction(editName, editPeopleCount);
    onClose();
  };

  return (
    <ModalContainer>
      <ModalHeader>
        <PointerComponent onClick={onClose}>
          <CloseIcon />
        </PointerComponent>
      </ModalHeader>
      <ModalBody>
        <InputLabel
          label="방 이름"
          onChange={(e) => (name.current = e.target.value)}
        />
        <InputLabel
          label="방 인원"
          onChange={(e) => (peopleCount.current = e.target.value)}
        />
      </ModalBody>

      <ModalFooter>
        <Button size="sm" onClick={handleAction}>
          생성
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
}

export default AddModal;
