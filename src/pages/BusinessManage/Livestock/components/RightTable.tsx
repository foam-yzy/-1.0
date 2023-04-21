import { ActionType, PageContainer, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import CreateForm from './CreateForm';

export default () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    {
      title: '圈舍',
      dataIndex: 'hoopsName',
      valueType: 'text',
    },
    {
      title: '围栏',
      dataIndex: 'fenceName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '类型',
      dataIndex: 'livestockType',
      valueType: 'text',
    },
    {
      title: '智能耳标编号',
      dataIndex: 'intelligentEarNumber',
      valueType: 'text',
    },
    {
      title: '重量（公斤）',
      dataIndex: 'weight',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '出生日期',
      dataIndex: 'birthTime',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '耳温℃',
      dataIndex: 'earTemperature',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'livestockStatus',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '最近更新时间',
      dataIndex: 'updateTime',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '参保状态',
      dataIndex: 'insuredStatus',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '抵押状态',
      dataIndex: 'mortgageStatus',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '融资期限',
      // dataIndex: 'created_at',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
      ],
    },
  ];

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {}
      }}
      style={{padding: 0}}
      childrenContentStyle={{ padding: 0 }}
    >
      <ProTable<any>
        tableStyle={{ marginTop: 20 }}
        columns={columns}
        actionRef={actionRef}
        // cardBordered
        // request={async (params = {}, sort, filter) => {
        // console.log(sort, filter);
        // await waitTime(2000);
        // return request<{
        //   data: GithubIssueItem[];
        // }>('https://proapi.azurewebsites.net/github/issues', {
        //   params,
        // });
        // }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          // onChange(value) {
          //   console.log('value: ', value);
          // },
        }}
        rowKey="id"
        search={{
          style: { borderBottom: '1px solid #F0F0F0FF'},
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
        // dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            style={{ position: 'absolute', backgroundColor: '#21B47C', borderRadius: 1, color: '#fff', left: 25, marginTop: 4 }}
            onClick={() => {
              handleModalVisible(true)
              actionRef.current?.reload();
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.UserInfo, API.UserInfo>
          // onSubmit={async (value) => {
          //   const success = await handleAdd(value);
          //   if (success) {
          //     handleModalVisible(false);
          //     if (actionRef.current) {
          //       actionRef.current.reload();
          //     }
          //   }
          // }}
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