import { exportClockDetail, queryAssessmentList, queryDetailsList } from '@/services/demo/assessment/controller';
import { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import moment from 'moment';
import { Button } from 'antd';

interface propsInter {
    tab: string,
    clockCheck: (id: number) => void,
    accountId: { id?: number },
}

export default (props: propsInter) => {
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [pageData, setPageData] = useState<APIAssessment.queryClockList>()
    const isTab1 = (props.tab === 'tab1') ? true : false
    const isTab3 = (props.tab === 'tab3') ? true : false

    const columns: ProColumns<APIAssessment.AssessmentInfo>[] = [
        {
            title: '序号',
            dataIndex: 'id',
            order: 10,
            hideInSearch: true,
            hideInTable: !isTab1
        },
        {
            disable: true,
            title: '账号',
            dataIndex: 'account',
            order: 9,
            valueType: 'text',
            hideInSearch: isTab3,
        },
        {
            disable: true,
            title: '姓名',
            dataIndex: 'userName',
            hideInSearch: isTab3,
            order: 8,
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            order: 7,
            valueType: 'text',
            hideInSearch: isTab3,
            ellipsis: true,
        },

        {
            title: '日期',
            dataIndex: 'startEndTime',
            valueType: 'dateRange',
            hideInTable: true,
            order: 12,
            search: {
                transform: ([startTime, endTime]) => ({ startTime, endTime }),
            },
        },
        {
            title: '正常打卡次数',
            dataIndex: 'normalClock',
            valueType: 'text',
            order: 6,
            hideInSearch: true,
            hideInTable: !isTab1
        },
        {
            title: '异常打卡次数',
            order: 0,
            dataIndex: 'abnormalClock',
            valueType: 'text',
            hideInSearch: true,
            hideInTable: !isTab1
        },
        {
            title: '操作',
            valueType: 'option',
            hideInTable: !isTab1,
            render: (_, record,) => {
                return (
                    <a onClick={() => checkAssessment(record)} style={{ color: '#21B47C' }}>查看明细</a>
                )
            }
        },
        {
            title: '打卡状态',
            dataIndex: 'clockStatus',
            hideInTable: isTab1,
            hideInSearch: isTab1,
            valueEnum: {
                null: { text: '全部', status: 'default' },
                true: { text: '打卡成功', status: '打卡成功' },
                false: { text: '缺卡', status: '缺卡' },
            }
        },
        {
            title: '记录时间',
            dataIndex: 'updateTime',
            valueType: 'date',
            hideInTable: isTab1,
            hideInSearch: true,
            render: (_, record) => moment(record.updateTime).format('YYYY-MM-DD HH:mm:ss')
        },
    ];

    // 查看明细
    const checkAssessment = (record: any) => {
        props.clockCheck(record.id)
    }
    // 打卡统计请求
    const getClockCountList = async (params: any) => {
        const { data, success } = await queryAssessmentList({
            ...params,
            startTime: params.startTime,
            endTime: params.endTime
        })
        return {
            data: data || [],
            success,
        };
    }
    // 打卡明细请求
    const getClockDetailList = async (params: any) => {
        console.log("打卡明细", params);
        //当为tab3时，给导出明细excel请求存数据
        (props.tab != 'tab3') ? null : setPageData({
            currentPage: params.current,
            pageSize: params.pageSize,
            startTime: params.startTime,
            endTime: params.endTime,
            clockStatus: params.clockStatus,
        })

        const { data, success } = await queryDetailsList({
            accountId: props.accountId.id,
            ...params,
            currentPage: params.current,
            startTime: params.startTime,
            endTime: params.endTime,
        })
        return {
            total: data?.totalCount,
            data: data.list || [],
            success,
        };
    }
    // 设置table数据的请求方式
    const getTableData = (props.tab === 'tab1') ? getClockCountList : getClockDetailList
    // 只有tab1不显示分页
    const pagination = (props.tab != 'tab1') ? {
        defaultCurrent: 1,
        defaultPageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20],
    } : false
    // tab3多了一个按钮
    const toolBarRenderButton = (props.tab != 'tab3') ? false : () => [
        <Button
            key="1"
            type="primary"
            onClick={() => handleDetails()}
            style={{ backgroundColor: '#21B47C', position: 'absolute', left: 25 }}
        >
            导出明细
        </Button>
    ]
    // 导出明细excel文件请求
    const handleDetails = async () => {
        const data = formRef?.current?.getFieldValue("clockStatus")
        console.log('查询条件' + data);

        const res = await exportClockDetail({ accountId: props.accountId.id, ...pageData })
        let objectUrl = URL.createObjectURL(res)
        downloadFile(objectUrl, '我的资源.xlsx')
    }
    // excel文件下载
    const downloadFile = (content: any, fileName: string) => {
        let a = document.createElement('a')
        a.href = content
        a.download = fileName
        a.click()
    }

    return (
        <ProTable<APIAssessment.AssessmentInfo>
            bordered
            columns={columns}
            actionRef={actionRef}
            formRef={formRef}
            request={getTableData}
            rowKey="id"
            options={false}
            pagination={pagination}
            toolBarRender={toolBarRenderButton}
            search={{
                collapseRender: (collapse) => [
                    <span
                        key="collapse"
                        style={{ color: '#21B47C' }}
                    >
                        {collapse ? '展开' : '收起'}
                    </span>,
                ],
                labelWidth: 'auto',
                searchGutter: 24,
                span: 6,
                optionRender: ({ form }) => [
                    <Button
                        key="resetText"
                        onClick={() => {
                            form?.resetFields();
                            form?.submit()
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
                    </Button>,
                ],
            }}
            form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                syncToUrl: (values, type) => {
                    if (type === 'get') {
                        return {
                            // ...values,
                            created_at: [values.startTime, values.endTime],
                        };
                    }
                    return values;
                },
            }}
        />
    );
};