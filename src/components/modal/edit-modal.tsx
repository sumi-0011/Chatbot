import type { PropsWithChildren } from 'react';
import { useRef } from 'react';

import Button from '@/components/button';
import CloseIcon from '@/components/icon/close';
import InputLabel from '@/components/input-label';
import type { ModalProps } from '@/components/modal';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from '@/components/modal';
import { PointerComponent } from '@/styles/core';

interface EditModalProps extends ModalProps {
  id: number;

  initName: string;
  initPeopleCount: number;
}

function EditModal({
  onClose,
  initName,
  initPeopleCount,
}: PropsWithChildren<EditModalProps>) {
  const name = useRef(initName);
  const peopleCount = useRef(initPeopleCount);

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

  const onEdit = () => {
    checkValidation();
    const editName = name.current;
    const editPeopleCount = peopleCount.current;
  };

  const onDelete = () => {
    checkValidation();
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
        <Button size="sm" colorScheme="error" onClick={onDelete}>
          삭제
        </Button>
        <Button size="sm" onClick={onEdit}>
          수정
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
}

export default EditModal;
