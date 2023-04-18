import { ActionType, ProColumns, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, Radio, Select, Space, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import CreateForm from './CreateForm';
import { deleteDataById, queryDataByDeviceId } from '@/services/demo/device/controller';

interface propsInter {
  optionData: APIDevice.optionListData
}
export default (props: propsInter) => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance>();

  // 新增、修改判断是否选择摄像头
  const [isCamera, setIsCamera] = useState<boolean>(false)
  const chooseType = (data: number) => {
    console.log("dklija", data);
    setIsCamera(data == 1)
  }

  useEffect(() => {
    actionRef.current?.reload()
  }, [props.optionData.clientName])

  // 删除
  const handleRemove = async (id: number) => {
    const hide = message.loading('正在删除');
    if (!id) return true;
    try {
      await deleteDataById({
        id: id
      });
      hide();
      message.success('删除成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  // 停启用
  const changeStatus = async (data: APIDevice.deviceList) => {
    const hide = message.loading('正在删除');
    if (!data) return true;
    try {
      // await deleteDataById({
      //   id: id
      // });
      hide();
      message.success('删除成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  // 修改
  const updateDevice = (data: APIDevice.deviceList) => {
    console.log("修改")
    handleModalVisible(true)
    formRef.current?.setFieldsValue(data)

  }

  // 关闭模态框
  const formCancel = () => {
    handleModalVisible(false)
    formRef.current?.resetFields()
  }

  const columns: ProColumns<APIDevice.deviceList>[] = [
    {
      title: '客户名称',
      dataIndex: 'index',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
      renderFormItem: () => {
        return (
          // <ProFormText noStyle style={{border: 0}} />
          <>
            {props.optionData.clientName}
          </>
        )
      },
    },
    {
      title: '牧场',
      dataIndex: 'd',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '圈舍',
      dataIndex: 'hoopsName',
      valueType: 'text',
    },
    {
      title: '围栏',
      dataIndex: 'e',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      valueType: 'text',
      render: (value) => (value ? '摄像头' : '基站'),
      // valueEnum: {
      //   true: { text: '摄像头' },
      //   false: { text: '基站' }
      // }

      renderFormItem: () => (
        <Select
          placeholder='请选择'
          onChange={chooseType}
          defaultValue={(isCamera) ? 1 : 0}
          options={[
            { value: 1, label: '摄像头' },
            { value: 0, label: '基站' },
          ]}
        />
      ),
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      valueType: 'text',
    },
    {
      title: '工作状态',
      dataIndex: 'workStatus',
      valueType: 'text',
      hideInForm: true,
      valueEnum: {
        true: { text: '启用' },
        false: { text: '禁用' }
      }
    },
    {
      title: '最近上报时间',
      dataIndex: 'reportTime',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '添加人',
      dataIndex: 'i',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '添加时间',
      dataIndex: 'g',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: 'MAC',
      dataIndex: 'k',
      copyable: true,
      ellipsis: true,
      hideInTable: true,
      hideInSearch: true,
      hideInForm: isCamera,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '有无云台',
      dataIndex: 'a',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: !isCamera,
      hideInTable: true,
    },
    {
      title: 'SIP认证ID',
      dataIndex: 'b',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: !isCamera,
      hideInTable: true,
    },
    {
      title: 'SIP通道号',
      dataIndex: 'c',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: !isCamera,
      hideInTable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            style={{ color: '#21B47CFF' }}
            onClick={() => {
              updateDevice(record)
              actionRef.current?.reload()
            }}
          >
            修改
          </a>,
          <a
            style={{ color: '#21B47CFF' }}
            onClick={async () => {
              handleRemove(record.id)
              actionRef.current?.reload()
            }}
          >
            删除
          </a>,
          <a
            style={{ color: '#21B47CFF' }}
            onClick={() => {
              changeStatus(record)
              actionRef.current?.reload()
            }}
          >
            停用
          </a>,
        </>
      )
    },
  ];

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <ProTable<APIDevice.deviceList>
        tableStyle={{ marginTop: 14 }}
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          const { data, success } = await queryDataByDeviceId({
            clientId: props.optionData.id,
            // ...params,
            currentPage: params.current,
            pageSize: params.pageSize
          });
          return {
            total: data?.totalCount,
            data: data?.list || [],
            success,
          };
        }}
        rowKey="id"
        search={{
          style: { borderBottom: '1px solid #F0F0F0FF' },
          labelWidth: 'auto',
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
          ],
          collapseRender: (collapse) => [
            <span
              key="collapse"
              style={{ color: '#21B47C' }}
            >
              {collapse ? '展开' : '收起'}
            </span>,
          ],
        }}
        options={false}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20]
        }}
        toolBarRender={() => [
          <Button
            key="button"
            onClick={() => {
              handleModalVisible(true)
              actionRef.current?.reload();

            }}
            type="primary"
            style={{ position: 'absolute', backgroundColor: '#21B47C', borderRadius: 1, color: '#fff', left: 21 }}
          >
            新增设备
          </Button>,
        ]}
      />
      <CreateForm
        onCancel={formCancel}
        modalVisible={createModalVisible}
      >
        <ProTable<APIDevice.deviceList, APIDevice.deviceList>
          onSubmit={async (value) => {
            // const success = await handleAdd(value);
            // if (success) {
            //   handleModalVisible(false);
            //   if (actionRef.current) {
            //     actionRef.current.reload();
            //   }
            // }
          }}
          onReset={() => {
            handleModalVisible(false)
          }}
          rowKey="id"
          type="form"
          columns={columns}
          formRef={formRef}
          form={{
            layout: 'horizontal',
            labelCol: {
              // xs: {span: 24},
              sm: { span: 5 }
            },
            submitter: {
              searchConfig: {
                resetText: '返回',
                submitText: '提交',
              },
              submitButtonProps: { style: { backgroundColor: '#21B47C', left: 205 } },
              resetButtonProps: { style: { left: 197 } }
            },
          }}
        />
      </CreateForm>
    </PageContainer>

  );
};