import { useRef, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import TableData from './components/TableData';
import './index.less'

export default () => {
    const [tab, setTab] = useState('tab1');
    const accountIdRef = useRef<{id?: number}>()
    // table里的查看明细点击事件
    const clockCheck = (id: number) => {
        setTab('tab3');
        accountIdRef.current = {id: id}
    }
    return (
        <div>
            <ProCard
                tabs={{
                    activeKey: tab,
                    destroyInactiveTabPane: true,
                    items: [
                        {
                            label: `打卡统计`,
                            key: 'tab1',
                            children: <TableData tab={tab} clockCheck={clockCheck} accountId={{}} />,
                        },
                        {
                            label: `打卡明细`,
                            key: 'tab2',
                            children: <TableData tab={tab} clockCheck={() => {}} accountId={{}} />,
                        },
                        {
                            label: false,
                            key: 'tab3',
                            children: <TableData tab={tab} clockCheck={() => {}} accountId={{id: accountIdRef.current?.id}} />,
                        },
                    ],
                    onChange: (key) => {
                        setTab(key);
                    },
                }}
            />
        </div>
    );
};