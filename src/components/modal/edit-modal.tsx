import type { PropsWithChildren } from 'react';
import { useState } from 'react';

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
import { deleteChatRoom, editChatRoom } from '@/utils/chat';

interface EditModalProps extends ModalProps {
  id: string;

  initName: string;
  initPeopleCount: string;
}

function EditModal({
  onClose,
  initName,
  initPeopleCount,
  id,
}: PropsWithChildren<EditModalProps>) {
  // const name = useRef(initName);
  const [name, setName] = useState(initName);
  const [peopleCount, setPeopleCount] = useState(initPeopleCount);
  // const peopleCount = useRef(initPeopleCount);

  const checkValidation = () => {
    if (!name) {
      alert('방 이름을 입력해주세요.');
      return false;
    }

    if (!peopleCount) {
      alert('방 인원을 입력해주세요.');
      return false;
    }

    return true;
  };

  const onEdit = () => {
    checkValidation();
    const editName = name;
    const editPeopleCount = peopleCount;

    editChatRoom(id, editName, editPeopleCount);
    onClose();
  };

  const onDelete = () => {
    checkValidation();
    deleteChatRoom(id);
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
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputLabel
          label="방 인원"
          type="number"
          value={peopleCount}
          onChange={(e) => setPeopleCount(e.target.value)}
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
