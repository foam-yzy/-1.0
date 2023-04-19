import { ActionType, ProColumns, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, Divider, Radio, Select, Space, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import CreateForm from './CreateForm';
import { addDevice, addDeviceByCamera, changeStatusById, deleteDataById, queryDataByDeviceId, queryFenceByHoops, queryHoopsList, upDevice, upDeviceByCamera } from '@/services/demo/device/controller';

interface propsInter {
  optionData: APIDevice.optionListData
}
export default (props: propsInter) => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance>();

  const [hoopsData, setHoopsData] = useState<Array<{ id: number, hoopsName: string }>>([])
  // 获取圈舍列表
  const getHoopsList = async () => {
    const clientId = props.optionData.id
    const res = await queryHoopsList({ clientId: clientId })
    setHoopsData(res.data)
  }
  const hoopsEnums = hoopsData.map((item) => ({
    value: item.id,
    label: item.hoopsName
  }))

  // 新增按钮点击事件
  const handleAdd = () => {
    formRef.current?.setFieldValue("deviceType", 0)
    handleModalVisible(true)
    // actionRef.current?.reload();
    getHoopsList()
  }

  // 新增、修改判断是否选择摄像头
  const [isCamera, setIsCamera] = useState<boolean>(false)
  const chooseType = (data: number) => {
    setIsCamera(data == 1)
    formRef.current?.setFieldValue("deviceType", data)
  }

  useEffect(() => {
    actionRef.current?.reload()
  }, [props.optionData.clientName])

  const [openFence, handleOpenFence] = useState<boolean>(true)
  // 选择圈舍发生变化，请求后端得到围栏数据
  const hoopsChange = (hoopsId: number) => {
    getFenceList(hoopsId)
    formRef.current?.setFieldValue('fenceName', null)
    formRef.current?.setFieldValue('hoopsName', hoopsId)
    handleOpenFence(false)
  }
  const [fenceData, setFenceData] = useState<Array<{ id: number, name: string }>>([])
  // 根据圈舍id请求围栏数据
  const getFenceList = async (hoopsId: number) => {
    const res = await queryFenceByHoops({ hoopsId: hoopsId })
    setFenceData(res.data)
  }
  const fenceEnums = fenceData.map((item) => ({
    value: item.id,
    label: item.name
  }))

  // 选择围栏
  const chooseFence = (value: number) => {
    formRef.current?.setFieldValue("fenceName", value)
  }

  // 删除
  const handleRemove = async (id?: number) => {
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
    const hide = message.loading('正在修改');
    if (!data) return true;
    try {
      await changeStatusById({
        id: data.id,
        deviceStatus: !data.deviceStatus
      });
      hide();
      message.success('更新成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('更新失败，请重试');
      return false;
    }
  };

  const [isAdd, setIsAdd] = useState<boolean>()
  // 新增请求
  const addSubmit = async (data: APIDevice.deviceList) => {
    const value = formRef.current?.getFieldsValue(true)
    const addApi = isCamera ? addDeviceByCamera : addDevice
    const hide = message.loading('正在新增');
    if (!data) return true;
    try {
      await addApi({
        ...value,
        hoopsId: value.hoopsName,
        fenceId: value.fenceName,
        clientId: props.optionData.id
      });
      hide();
      message.success('新增成功，即将刷新');
      handleModalVisible(false)
      actionRef.current?.reload()
      formRef.current?.resetFields()
      return true;
    } catch (error) {
      hide();
      message.error('新增失败，请重试');
      return false;
    }
  };

  const [upNameData, setUpNameData] = useState<{ hoopsName?: string, fenceName?: string }>()
  // 修改
  const updateDevice = (data: APIDevice.deviceList) => {
    setUpNameData({ hoopsName: data.hoopsName, fenceName: data.fenceName })
    setIsAdd(false)
    getHoopsList()
    getFenceList(data.hoopsId)
    handleOpenFence(false)
    handleModalVisible(true)
    formRef.current?.setFieldsValue(data)
    formRef.current?.setFieldValue("gimbal", String(data.gimbal))
    setIsCamera(data.deviceType == 1)
  }
  // 修改请求
  const updateSubmit = async (data: APIDevice.deviceList) => {
    const value = formRef.current?.getFieldsValue(true)
    const upApi = isCamera ? upDeviceByCamera : upDevice
    const hide = message.loading('正在修改');
    const hoopsId = (upNameData?.hoopsName == data.hoopsName) ? value.hoopsId : Number(data.hoopsName)
    const fenceId = (upNameData?.fenceName == data.fenceName) ? value.fenceId : Number(data.fenceName)
    if (!data) return true;
    try {
      await upApi({
        ...value,
        clientId: props.optionData.id,
        hoopsId: hoopsId,
        fenceId: fenceId,
      });
      hide();
      message.success('修改成功，即将刷新');
      handleModalVisible(false)
      actionRef.current?.reload()
      formRef.current?.resetFields()
      setIsCamera(false)
      return true;
    } catch (error) {
      hide();
      message.error('修改失败，请重试');
      return false;
    }
  };

  // 关闭模态框
  const formCancel = () => {
    handleModalVisible(false)
    formRef.current?.resetFields()
    handleOpenFence(true)
    setIsCamera(false)
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
          <>
            {props.optionData.clientName}
          </>
        )
      },
    },
    // {
    //   title: '牧场',
    //   dataIndex: 'd',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   hideInForm: true,
    // },
    {
      title: '圈舍',
      dataIndex: 'hoopsName',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '圈舍为必填项',
          },
        ],
      },
      renderFormItem: () => (
        <Select
          placeholder='请选择'
          onChange={hoopsChange}
          options={hoopsEnums}
        />
      )
    },
    {
      title: '围栏',
      dataIndex: 'fenceName',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: openFence,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '围栏为必选项',
          },
        ],
      },
      renderFormItem: () => (
        <Select
          placeholder='请选择'
          onChange={chooseFence}
          options={fenceEnums}
        />
      )
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      valueType: 'text',
      valueEnum: {
        1: { text: '摄像头' },
        0: { text: '基站' }
      },
      renderFormItem: () => (
        <Select
          placeholder='请选择'
          onChange={chooseType}
          options={[
            { value: 1, label: '摄像头' },
            { value: 0, label: '基站' },
          ]}
        />
      ),
      formItemProps: {
        rules: [
          {
            required: true,
            message: '设备类型为必填项',
          },
        ],
      },
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '设备名称为必填项',
          },
        ],
      },
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
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '状态',
      dataIndex: 'deviceStatus',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      valueEnum: {
        true: { text: '启用' },
        false: { text: '禁用' }
      }
    },
    {
      title: 'MAC',
      dataIndex: 'mac',
      copyable: true,
      ellipsis: true,
      hideInTable: true,
      hideInSearch: true,
      hideInForm: isCamera,
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'MAC为必填项',
          },
        ],
      },
    },
    {
      title: '有无云台',
      dataIndex: 'gimbal',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: !isCamera,
      hideInTable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '云台为必填项',
          },
        ],
      },
      valueEnum: {
        'true': { text: '有云台' },
        'false': { text: '无云台' }
      }
    },
    {
      title: 'SIP认证ID',
      dataIndex: 'sipId',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: !isCamera,
      hideInTable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'SIP认证ID为必填项',
          },
        ],
      },
    },
    {
      title: 'SIP通道号',
      dataIndex: 'sipChannelNumber',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: !isCamera,
      hideInTable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'SIP通道号为必填项',
          },
        ],
      },
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
              // actionRef.current?.reload()
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            style={{ color: '#21B47CFF' }}
            onClick={async () => {
              handleRemove(record.id)
              actionRef.current?.reload()
            }}
          >
            删除
          </a>
          <Divider type="vertical" />
          <a
            style={{ color: '#21B47CFF' }}
            onClick={() => {
              changeStatus(record)
              actionRef.current?.reload()
            }}
          >
            {record.deviceStatus ? '停用' : '启用'}
          </a>
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
            currentPage: params.current,
            pageSize: params.pageSize,

            hoopsName: params.hoopsName,
            deviceType: formRef.current?.getFieldValue('deviceType'),
            deviceName: params.deviceName,
            workStatus: params.workStatus,
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
                formRef.current?.setFieldValue('deviceType', null)
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
              handleAdd()
              setIsAdd(true)
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
          onSubmit={(value) => {
            isAdd ? addSubmit(value) : updateSubmit(value)
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
              sm: { span: 6 }
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