import { addAccount, changeStatus, handleAccountReset, queryAccountList, queryClientList, queryRoleEnum, updateAccount } from '@/services/demo/account/controller';
import {
  ActionType,
  PageContainer,
  ProDescriptionsItemProps,
  ProFormInstance,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, message, Radio, RadioChangeEvent, Space, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import CreateForm from './components/CreateForm';

const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalIsEdit, handleUpdateModalIsEdit] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const [clientValue, setClientValue] = useState<number>();
  const [clientEnum, setClientEnum] = useState([])
  // 监管企业的radio改变时，do something
  const clientChange = (data: RadioChangeEvent) => {
    setClientValue(data.target.value)
    formRef.current?.setFieldValue('clientRelevance', data.target.value)
    if (data.target.value == '1') {
      getClientList()
    }
  }
  // 请求后端得到监管企业的关联企业列表
  const getClientList = async () => {
    const res = await queryClientList()
    setClientEnum(res)
  }
  // 转化为关联企业枚举类
  const clientEnums = clientEnum.map((item: any) => ({
    label: item.clientName,
    value: item.id
  }))

  // 关联企业枚举类的变化 do something
  const handleClientChange = (data: any) => {
    formRef.current?.setFieldValue('clientId', data)
    console.log("下拉跨昂", data);

  }

  const [statusEnum, setStatusEnum] = useState<boolean>(true);
  // 搜索和模态框的状态字段不一样
  const statusValueEnum = statusEnum ?
    {
      '': { text: '全部' },
      'true': { text: '启用', status: '启用' },
      'false': { text: '停用', status: '停用' },
    } :
    {
      'true': { text: '启用', status: '启用' },
      'false': { text: '停用', status: '停用' },
    }
  /**
 * 账号重置
 * @param fields
 */
  const handleReset = async (id?: number) => {
    const hide = message.loading('正在重置');
    try {
      await handleAccountReset({ id })
      hide();

      message.success('重置成功');
      return true;
    } catch (error) {
      hide();
      message.error('重置失败请重试！');
      return false;
    }
  };

  // 账号新增或修改
  const handleAdd = async (fields: APIAccount.AccountInfo) => {
    const user = formRef.current?.getFieldsValue(true)
    const isEdit = updateModalIsEdit
    const data = isEdit ? { ...fields, id: user.id } : fields
    const text1 = isEdit ? '正在修改' : '正在添加'
    const text2 = isEdit ? '修改成功' : '添加成功'
    const text3 = isEdit ? '修改失败请重试！' : '添加失败请重试！'
    const hide = message.loading(text1);
    const getApi = isEdit ? updateAccount : addAccount
    try {
      await getApi({
        ...data,
        clientIds:fields.clientId,
        roleId: Number(fields.roleId),
      });
      hide();
      message.success(text2);
      return true;
    } catch (error) {
      hide();
      message.error(text3);
      return false;
    }
  };

  // 账号停启用
  const handleChangeStatus = async (value: APIAccount.AccountStatus) => {
    const text1 = (value.status) ? '正在启用' : '正在停用'
    const text2 = (value.status) ? '启用成功' : '停用成功'
    const text3 = (value.status) ? '启用失败请重试' : '停用失败请重试'
    const hide = message.loading(text1);
    try {
      await changeStatus(value)
      hide();
      message.success(text2);
      return true;
    } catch (error) {
      hide();
      message.error(text3);
      return false;
    }
  };

  // 点击编辑
  const handleEdit = (value: APIAccount.AccountInfo) => {
    handleModalVisible(true)
    setStatusEnum(false)
    handleUpdateModalIsEdit(true)
    formRef.current?.setFieldsValue(value)
    formRef.current?.setFieldValue('roleId', String(value.roleId))
    formRef.current?.setFieldValue('status', String(value.status))
    setClientValue(value.clientRelevance)

    // 当为部分关联时请求关联企业列表并渲染
    if (value.clientRelevance == 1) {
      getClientList()
      const data = formRef.current?.getFieldsValue(true)
      formRef.current?.setFieldValue("clientId", data.clientIds)
    }
  }

  const [roleEnum, setRoleEnum] = useState([])
  // 请求后端得到角色枚举类
  const getRoleEnum = async () => {
    const res = await queryRoleEnum()
    setRoleEnum(res)
  }
  useEffect(() => {
    getRoleEnum()
  }, [])
  // 角色转化枚举
  const roleEnums = () =>
    roleEnum.reduce((obj: any, { id, roleName }) =>
      ({ ...obj, [id]: { text: roleName } }), {});

  // 模态框关闭时 do somehting
  const createFormOnCancel = () => {
    handleModalVisible(false)
    setStatusEnum(true)
    formRef.current?.resetFields()
    handleUpdateModalIsEdit(false)
    setClientValue(undefined)
  }


  const columns: ProDescriptionsItemProps<APIAccount.AccountInfo>[] = [
    {
      title: '账号',
      dataIndex: 'account',
      formItemProps: {
        validateTrigger: 'onBlur',
        rules: [
          {
            required: true,
            message: '账号为必填项',
          },
          {
            max: 10,
            message: '不超过10个字'
          }
        ],
      },
      renderFormItem: () => {
        return (
          createModalVisible ?
            <ProFormText placeholder={"不超过10个字"} noStyle disabled={updateModalIsEdit} /> :
            <ProFormText noStyle />
        )
      },
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      valueType: 'text',
      formItemProps: {
        validateTrigger: 'onBlur',
        rules: [
          {
            required: true,
            message: '姓名为必填项',
          },
        ],
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      valueType: 'text',
      formItemProps: {
        validateTrigger: 'onBlur',
        rules: [
          {
            required: true,
            message: '手机号为必填项',
          },
          {
            len: 11,
            message: '手机号格式不正确'
          },
          {
            message: '只能输入数字',
            pattern: /^[0-9]+$/
          }
        ],
      },
      renderFormItem: () => {
        return (
          <ProFormText noStyle />
        )
      },
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '角色为必选项',
          },
        ],
      },
      valueEnum: roleEnums,
    },
    {
      title: '监管企业',
      dataIndex: 'clientRelevance',
      hideInTable: true,
      hideInSearch: true,
      valueType: 'radio',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      renderFormItem: () => (
        <Radio.Group onChange={clientChange} value={clientValue}>
          <Space direction="horizontal">
            <Radio value={0}>全部关联</Radio>
            <Radio value={1}>部分关联</Radio>
            <Radio value={2}>不关联</Radio>
          </Space>
        </Radio.Group>
      )
    },
    {
      title: '关联企业',
      dataIndex: 'clientId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: (clientValue != 1),
      formItemProps: {
        rules: [
          {
            required: true,
            message: "关联人员必填"
          },
        ],
      },
      renderFormItem: () => (
        <Select
          mode="multiple"
          allowClear
          showSearch
          placeholder="请选择关联企业"
          // defaultValue={[1, 18]}
          onChange={handleClientChange}
          options={clientEnums}
        />
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '状态为必选项',
          },
        ],
      },
      valueEnum: statusValueEnum,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => handleEdit(record)}
            style={{ color: '#21B47C' }}
          >
            编辑</a>

          <Divider type="vertical" />
          <a
            onClick={() => {
              handleReset(record.id)
              actionRef.current?.reloadAndRest?.();
            }}
            style={{ color: '#21B47C' }}
          >重置</a>

          <Divider type="vertical" />
          <a onClick={() => {
            handleChangeStatus({ id: record.id, status: !record.status }),
              actionRef.current?.reloadAndRest?.()
          }}
            style={{ color: '#21B47C' }}
          >{record.status ? '停用' : '启用'}</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <ProTable<APIAccount.AccountInfo>
        tableStyle={{ marginTop: 41 }}
        style={{ position: 'relative' }}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 42,
          collapseRender: false,
          span: 5,
          layout: "horizontal",
          submitterColSpanProps: { span: 80 },
          optionRender: ({ form }) => [
            <Button
              key="searchText"
              type="primary"
              style={{ backgroundColor: '#21B47C', marginLeft: 50 }}
              onClick={() => {
                form?.submit();
              }}
            >
              {'查询'}
            </Button>,
            <Button
              key="resetText"
              onClick={() => {
                form?.resetFields();
                form?.submit();
              }}
            >
              {'重置'}
            </Button>,
          ]
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="default"
            onClick={() => { handleModalVisible(true), setStatusEnum(false) }}
            style={{ position: 'absolute', backgroundColor: '#21B47C', borderRadius: 1, color: '#fff', left: 21, top: 20 }}
          >
            新建账号
          </Button>,
        ]}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20]
        }}
        request={async (params) => {
          const { data, success } = await queryAccountList({
            ...params,
            currentPage: params.current,
            pageSize: params.pageSize,
            status: params.status
          });
          return {
            total: data?.totalCount,
            data: data?.list || [],
            success,
          };
        }}
        columns={columns}
        options={false}
      />
      <CreateForm
        onCancel={createFormOnCancel}
        modalVisible={createModalVisible}
        updateModalIsEdit={updateModalIsEdit}
      >
        <ProTable<APIAccount.AccountInfo, APIAccount.AccountInfo>
          onSubmit={async (value) => {
            console.log("编辑"+value)
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              createFormOnCancel()
              if (actionRef.current) {
                actionRef.current.reload();
              }
              
            }
          }}
          formRef={formRef}
          form={{
            layout: 'horizontal',
            style: { borderRadius: 0 },
            labelCol: {
              // xs: {span: 24},
              sm: { span: 5 }
            },
            // wrapperCol: {
            //   xs: {span: 28},
            //   sm: {span: 25}
            // },
            submitter: {
              submitButtonProps: { style: { backgroundColor: '#21B47C' } },
              resetButtonProps: { style: { marginLeft: 230 } }
            }
          }}
          rowKey="id"
          type='form'
          columns={columns}
        />
      </CreateForm>
    </PageContainer>
  );
};

export default TableList;
