import { Divider, Modal } from 'antd';
import React, { PropsWithChildren } from 'react';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  updateModalIsEdit: boolean
}

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { modalVisible, onCancel, updateModalIsEdit } = props;
  const titleText = updateModalIsEdit ? '修改信息' : '新建账号'
  return (
    <Modal
      forceRender={true}
      title={titleText}
      width={452}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    // style={{borderRadius: 0}}
    >
      <Divider style={{ width: 452, marginLeft: -24 }} />
      {props.children}
    </Modal>
  );
};

export default CreateForm;
