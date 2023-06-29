import { Divider, Modal } from 'antd';
import React, { PropsWithChildren } from 'react';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      forceRender={true}
      title="新增牲畜"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Divider />
      {props.children}
    </Modal>
  );
};

export default CreateForm;
