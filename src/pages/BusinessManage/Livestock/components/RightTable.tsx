import { ActionType, PageContainer, ProColumns, ProDescriptionsItemProps, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Select, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import CreateForm from './CreateForm';
import { insertLivestock, queryFenceList, queryHoopsByClientId, queryHoopsList, queryLivestockType } from '@/services/demo/livestock/controller';
import moment from 'moment';
import ToolBarButton from './ToolBarButton';
import OptionButton from './OptionButton';

interface hoopsInter {
  label: string,
  value: number
}
interface livestockInter {
  name: string,
  value: string
}
interface propsInter {
  nowOption: APILivestock.optionListData | undefined
}
export default (props: propsInter) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const tableRef = useRef<ProFormInstance>();
  const formRef = useRef<ProFormInstance>();

  const defaultEnum = { label: '全部', value: '' }

  // 获取圈舍列表
  const [hoopsEnum, setHoopsEnums] = useState<hoopsInter[]>([])
  const getHoopsList = async () => {
    if (hoopsEnum.length == 0) {
      const res = await queryHoopsList({ clientId: props.nowOption?.id })
      const hoopsEnums = res.data.map((item: { hoopsName: string, id: number }) => ({
        label: item.hoopsName,
        value: item.id
      }))
      setHoopsEnums([defaultEnum, ...hoopsEnums])
    }
  }

  // 获取围栏列表
  const [fenceEnums, setFenceEnums] = useState([])
  const getFenceList = async (hoopsId: number) => {
    const res = await queryFenceList({ hoopsId: hoopsId })
    const fenceEnums = res.data.map((item: { name: string, id: number }) => ({
      label: item.name,
      value: item.id
    }))
    setFenceEnums(fenceEnums)
  }

  // 选择圈舍发生变化时 do something
  const [isChooseHoops, setIsChooseHoops] = useState<boolean>(true)
  const handleHoopsChange = (value: any) => {
    getFenceList(value)
    // tableRef.current?.setFieldValue('hoopsName', value)
    setIsChooseHoops(false)
  }

  // 获取牲畜类型
  const [typeEnum, setTypeEnum] = useState<livestockInter[]>([])
  const getLivestockType = async () => {
    if (typeEnum.length == 0) {
      const res = await queryLivestockType()
      const typeEnums = res.data.map((item: { name: string, type: string }) => ({
        label: item.name,
        value: item.name
      }))
      setTypeEnum([defaultEnum, ...typeEnums])
    }
  }

  const defaultData = {
    hoopsName: '全部',
    livestockStatus: '',
    livestockType: '全部',
    insuredStatus: '',
    mortgageStatus: ''
  }

  // table表初始化
  useEffect(() => {
    setHoopsEnums([])
    setFenceEnums([])
    actionRef.current?.reload()
    tableRef.current?.resetFields()
    tableRef.current?.setFieldsValue(defaultData)
  }, [props.nowOption?.clientName])

  // 模态框退出
  const formOnCancel = () => {
    handleModalVisible(false)
    formRef.current?.resetFields()
    setIsChooseHoops(true)
  }

  // 刷新页面（子组件传值控制）
  const isReload = (value: boolean) => {
    if (value) {
      actionRef.current?.reload()
    }
  }

  // 牲畜新增提交事件
  const addLivestock = async (value: APILivestock.livestockList) => {
    const hide = message.loading('正在添加');
    try {
      await insertLivestock({ ...value, clientId: props.nowOption?.id })
      hide();
      message.success('添加成功');
      formOnCancel()
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

  const columns: ProColumns<APILivestock.livestockList>[] = [
    {
      title: '圈舍',
      dataIndex: 'hoopsName',
      width: 96,
      align: 'center',
      renderFormItem: (item, { type, defaultRender }) => {
        if (type === 'form') {
          return (
            <Form.Item name='hoopsId' rules={[{ required: true, message: '请输入名称' }]} noStyle>
              <Select
                placeholder="请选择"
                onChange={handleHoopsChange}
                options={hoopsEnum}
                onClick={getHoopsList}
              />
            </Form.Item>
          );
        }
        return defaultRender(item);
      },
    },
    {
      title: '围栏',
      dataIndex: 'fenceName',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: isChooseHoops,
      width: 96,
      align: 'center',
      renderFormItem: (item, { type, defaultRender }) => {
        if (type === 'form') {
          return (
            <Form.Item name='fenceId' rules={[{ required: true, message: '请输入名称' }]} noStyle>
              <Select
                allowClear
                showSearch
                placeholder="请选择"
                options={fenceEnums}
              />
            </Form.Item>
          );
        }
        return defaultRender(item);
      },
    },
    {
      title: '类型',
      dataIndex: 'livestockType',
      valueType: 'text',
      align: 'center',
      width: 96,
      renderFormItem: () => (
        <Select
          placeholder="请选择"
          options={typeEnum}
          onClick={getLivestockType}
        />
      )
    },
    {
      title: '智能耳标编号',
      dataIndex: 'intelligentEarNumber',
      valueType: 'text',
      width: 152,
      align: 'center',
    },
    {
      title: '耳标编号',
      dataIndex: 'normalEarNumber',
      valueType: 'text',
      width: 152,
      align: 'center',
    },
    {
      title: '重量（公斤）',
      dataIndex: 'weight',
      valueType: 'text',
      hideInSearch: true,
      width: 106,
      align: 'center',
    },
    {
      title: '出生日期',
      dataIndex: 'birthTime',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
      renderFormItem: () => (
        <ProFormText placeholder={'例：2021-10-10'}></ProFormText>
      )

    },
    {
      title: '耳温℃',
      dataIndex: 'earTemperature',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      width: 88,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'livestockStatus',
      valueType: 'text',
      hideInForm: true,
      width: 91,
      align: 'center',
      valueEnum: {
        '': { text: '全部' },
        true: { text: '正常' },
        false: { text: '异常' }
      }
    },
    {
      title: '最近更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      width: 120,
      align: 'center',
      hideInForm: true,
      hideInSearch: true,
      ellipsis: true,
      // render: (_, record) => moment(record.updateTime).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '参保状态',
      dataIndex: 'insuredStatus',
      valueType: 'text',
      hideInForm: true,
      width: 96,
      align: 'center',
      valueEnum: {
        '': { text: '全部' },
        true: { text: '已参保' },
        false: { text: '未参保' }
      }
    },
    {
      title: '抵押状态',
      dataIndex: 'mortgageStatus',
      valueType: 'text',
      hideInForm: true,
      width: 96,
      align: 'center',
      valueEnum: {
        '': { text: '全部' },
        true: { text: '抵押中' },
        false: { text: '未抵押' }
      }
    },
    {
      title: '融资期限',
      dataIndex: '[loanEndTime, loanStartTime]',
      valueType: 'date',
      hideInForm: true,
      hideInSearch: true,
      width: 150,
      align: 'center',
      render: (_, record) => (<>{record.loanStartTime}-{record.loanEndTime}</>),
      ellipsis: true,
    },
    {
      title: '操作',
      fixed: 'right',
      width: 220,
      align: 'center',
      hideInForm: true,
      hideInSearch: true,
      render: (record) =>
        //@ts-expect-error
        <OptionButton record={record} leftOptionData={props.nowOption} isReload={isReload} />
      ,
    },
  ];

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {}
      }}
      style={{ padding: 0 }}
      childrenContentStyle={{ padding: 0, width: "100%", position: 'absolute', backgroundColor: '#fff' }}
    >
      <ProTable<APILivestock.livestockList>
        tableStyle={{ marginTop: 20 }}
        columns={columns}
        actionRef={actionRef}
        scroll={{ x: 1200 }}
        formRef={tableRef}
        bordered
        // cardBordered
        request={async (params) => {
          const hoopsName = params.hoopsName == '全部' ? '' : params.hoopsName
          const livestockType = params.livestockType == '全部' ? '' : params.livestockType
          const { data, success } = await queryHoopsByClientId({
            ...params,
            currentPage: params.current,
            clientId: props.nowOption?.id,
            hoopsName: hoopsName,
            livestockType: livestockType
          });
          return {
            total: data.totalCount,
            data: data.list || [],
            success
          }
        }}
        rowKey="id"
        search={{
          style: { borderBottom: '1px solid #F0F0F0FF' },
          labelWidth: 'auto',
          span: 6,
          layout: "horizontal",
          submitterColSpanProps: { span: 80 },
          optionRender: ({ form }) => [
            <Button
              key="resetText"
              onClick={() => {
                form?.resetFields();
                form?.submit();
              }}
            >
              {'重置'}
            </Button>,
            <Button
              key="searchText"
              type="primary"
              style={{ backgroundColor: '#21B47C' }}
              onClick={() => {
                form?.submit();
              }}
            >
              {'查询'}
            </Button>
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
            style={{ position: 'absolute', backgroundColor: '#21B47C', borderRadius: 1, color: '#fff', left: 25 }}
            onClick={() => {
              handleModalVisible(true)
              // actionRef.current?.reload();
            }}
            type="primary"
          >
            新增牲畜
          </Button>,
          <div style={{ position: 'absolute', left: 110 }}>
            <ToolBarButton optionData={props.nowOption} />
          </div>
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => { console.log(selectedRows) },
        }}
      />
      <CreateForm
        onCancel={formOnCancel}
        modalVisible={createModalVisible}
      >
        <ProTable<APILivestock.livestockList, APILivestock.livestockList>
          onSubmit={addLivestock}
          onReset={formOnCancel}
          formRef={formRef}
          rowKey="id"
          type="form"
          columns={columns}
          form={{
            layout: 'horizontal',
            labelCol: {
              sm: { span: 8 }
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