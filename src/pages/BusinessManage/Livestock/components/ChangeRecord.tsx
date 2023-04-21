import { ActionType, PageContainer, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
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
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
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
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {}
      }}
    childrenContentStyle={{padding: 0}}
    >
      <ProTable<any>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        // request={async (params = {}, sort, filter) => {
        //   console.log(sort, filter);
        //   await waitTime(2000);
        //   return request<{
        //     data: GithubIssueItem[];
        //   }>('https://proapi.azurewebsites.net/github/issues', {
        //     params,
        //   });
        // }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
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
        }}
        options={false}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20]
        }}
        dateFormatter="string"
        headerTitle={false}
      />
    </PageContainer>
  );
};
