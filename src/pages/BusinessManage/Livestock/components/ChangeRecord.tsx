import { queryOrderList } from '@/services/demo/livestock/controller';
import { ActionType, PageContainer, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

interface propsInter {
  nowOptionData?: APILivestock.optionListData
}
export default (props: propsInter) => {

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<APILivestock.changeRecordList>[] = [
    {
      title: '导入时间',
      dataIndex: '[startTime, endTime]',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      title: '变动时间',
      dataIndex: 'changeTime',
      hideInSearch: true,
    },
    {
      title: '变动类型',
      dataIndex: 'changeType',
    },
    {
      title: '牧场',
      dataIndex: 'clientName',
      hideInSearch: true,
    },
    {
      title: '耳号',
      dataIndex: 'intelligentEarNumber',
      hideInSearch: true,
    },
    {
      title: '变动内容',
      dataIndex: 'changeContent',
      hideInSearch: true,
    },
    {
      title: '变动前内容',
      dataIndex: 'oldChangeContent',
      hideInSearch: true,
    },
    {
      title: '变动后内容',
      dataIndex: 'newChangeContent',
      hideInSearch: true,
    },
    {
      title: '变动人员',
      dataIndex: 'changeUser',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          style={{ color: '#21B47C' }}
          onClick={() => {
            // action?.startEditable?.(record.id);
          }}
        >
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
      childrenContentStyle={{ padding: 0 }}
    >
      <ProTable<APILivestock.changeRecordList>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const { data, success } = await queryOrderList({
            ...params,
            clientId: props.nowOptionData?.id,
            currentPage: params.current,
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
        // dateFormatter="string"
        headerTitle={false}
      />
    </PageContainer>
  );
};
