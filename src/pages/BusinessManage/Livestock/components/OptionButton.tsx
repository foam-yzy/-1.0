import { changeLivestockById, deleteLivestockById, outLivestockByHoopsId, queryFenceList, queryHoopsList, swapLivestockById } from '@/services/demo/livestock/controller';
import { ModalForm, ProForm, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Divider, message } from 'antd'
import React, { useRef, useState } from 'react'

interface propsInter {
    record: APILivestock.livestockList,
    leftOptionData: APILivestock.optionListData,
    isReload: (value: boolean) => void
}
export default function OptionButton(props: propsInter) {

    const outFormRef = useRef<ProFormInstance>();

    // 查看
    const checkHoops = () => {
        history.push('/BusinessManage/Livestock/components/CheckHoops', {id: props.record.id})
    }

    // 牲畜出栏提交
    const outLivestock = async (values: { columnType: string }) => {
        const hoopsType = (values.columnType === 'true') ? true : false
        await outLivestockByHoopsId({ hoopsId: props.record.id, columnType: hoopsType })
        message.success('提交成功');
        props.isReload(true)
        return true
    }

    const [hoopsEnums, setHoopsEnums] = useState<any>()
    // 根据客户id获取圈舍列表
    const getHoopsList = async () => {
        const res = await queryHoopsList({ clientId: props.leftOptionData.id })
        const hoopsList =
            //@ts-ignore
            res.data.reduce((obj: any, { id, hoopsName }) => {
                return ({ ...obj, [id]: hoopsName })
            }, {})
        setHoopsEnums(hoopsList)
    }

    const [fenceEnums, setFenceEnums] = useState()
    // 根据圈舍id获取围栏列表
    const getFenceList = async () => {
        // const res = await queryFenceList({ hoopsId: props.record.hoopsId })
        const res = await queryFenceList({ hoopsId: 13 })
        const fenceList =
            //@ts-ignore
            res.data.reduce((obj: any, { id, name }) => {
                return ({ ...obj, [id]: name })
            }, {})
        setFenceEnums(fenceList)
    }

    // 点击转栏
    const handleChangeLivestock = () => {
        getHoopsList()
        getFenceList()
    }

    // 牲畜转栏提交
    const changeLivestockSub = async (value: { hoopsId: number, fenceId: number }) => {
        await changeLivestockById({ ...value, id: props.record.id })
        message.success('转栏成功')
        props.isReload(true)
        return true
    }

    // 牲畜换标提交
    const swapLivestock = async (value: { intelligentEarNumber: string, earTagsReason: string }) => {
        const earTagsReason = (value.earTagsReason == 'true') ? true : false
        await swapLivestockById({
            id: props.record.id,
            intelligentEarNumber: value.intelligentEarNumber,
            earTagsReason: earTagsReason
        })
        message.success('换标成功')
        props.isReload(true)
        return true
    }

    // 牲畜删除
    const deleteHoops = async () => {
        const hide = message.loading('正在重置');
        try {
            await deleteLivestockById({ id: props.record.id })
            hide();
            message.success('删除成功');
            props.isReload(true)
            return true;
        } catch (error) {
            hide();
            return false;
        }
    };

    return (
        <>
            <a
                className='optionButtons'
                onClick={checkHoops}
            >
                查看
            </a>

            <ModalForm<{ columnType: string }>
                formRef={outFormRef}
                style={{ color: '#21B47C' }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                trigger={
                    <a className='optionButtons'>出栏</a>
                }
                title="牲畜出栏"
                submitter={{
                    searchConfig: {
                        submitText: '确认',
                        resetText: '取消',
                    },
                    submitButtonProps: {
                        style: { backgroundColor: '#21B47C' }
                    }
                }}
                modalProps={{
                    destroyOnClose: true,
                    // onCancel: () => console.log('run'),
                }}
                onFinish={outLivestock}
                width={500}
                layout='horizontal'
            >
                <Divider />
                <ProFormSelect
                    width="md"
                    name="columnType"
                    label="出栏类型"
                    placeholder="请选择"
                    rules={[
                        {
                            required: true,
                            message: '请选择出栏类型',
                        },
                    ]}
                    valueEnum={{
                        false: '销售',
                        true: '死亡',
                    }}
                />
                <ProForm.Item label='客户名称'>
                    {props.leftOptionData.clientName}
                </ProForm.Item>
                <ProForm.Item label='智能耳标编号' >
                    {props.record.intelligentEarNumber}
                </ProForm.Item>
                <ProForm.Item label='圈舍'>
                    {props.record.hoopsName}
                </ProForm.Item>
                <Divider />
            </ModalForm>


            <ModalForm
                style={{ color: '#21B47C' }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                trigger={
                    <a className='optionButtons' onClick={handleChangeLivestock}>转栏</a>
                }
                title="牲畜转栏"
                submitter={{
                    searchConfig: {
                        submitText: '确认',
                        resetText: '取消',
                    },
                    submitButtonProps: {
                        style: { backgroundColor: '#21B47C' }
                    }
                }}
                modalProps={{
                    destroyOnClose: true,
                }}
                onFinish={changeLivestockSub}
                width={500}
                layout='horizontal'
            >
                <Divider />
                <ProForm.Item label='客户名称'>
                    {props.leftOptionData.clientName}
                </ProForm.Item>
                <ProForm.Item label='智能耳标编号' >
                    {props.record.intelligentEarNumber}
                </ProForm.Item>
                <ProForm.Item label='转出圈舍'>
                    {props.record.hoopsName}
                </ProForm.Item>
                <ProForm.Item label='转出围栏'>
                    {props.record.fenceName}
                </ProForm.Item>
                <ProFormSelect
                    width="md"
                    name="hoopsId"
                    label="转入圈舍"
                    placeholder="请选择"
                    rules={[
                        {
                            required: true,
                            message: '请选择出栏类型',
                        },
                    ]}
                    valueEnum={hoopsEnums}
                />
                <ProFormSelect
                    width="md"
                    name="fenceId"
                    label="转入围栏"
                    placeholder="请选择"
                    rules={[
                        {
                            required: true,
                            message: '请选择出栏类型',
                        },
                    ]}
                    valueEnum={fenceEnums}
                />
                <Divider />
            </ModalForm>


            <ModalForm
                style={{ color: '#21B47C' }}
                trigger={
                    <a className='optionButtons'>换标</a>
                }
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 14 }}
                title="牲畜出栏"
                submitter={{
                    searchConfig: {
                        submitText: '确认',
                        resetText: '取消',
                    },
                    submitButtonProps: {
                        style: { backgroundColor: '#21B47C' }
                    }
                }}
                modalProps={{
                    destroyOnClose: true,
                }}
                onFinish={swapLivestock}
                width={500}
                layout='horizontal'

            >
                <Divider />
                <ProForm.Item label='客户名称'>
                    {props.leftOptionData.clientName}
                </ProForm.Item>
                <ProForm.Item label='原智能耳标编号' >
                    {props.record.intelligentEarNumber}
                </ProForm.Item>
                <ProFormText
                    width="md"
                    name="intelligentEarNumber"
                    label="新智能耳标编号"
                    placeholder="请输入"
                    rules={[
                        {
                            required: true,
                            message: '请输入新智能耳标编号',
                        },
                    ]}
                />
                <ProFormSelect
                    width="md"
                    name="earTagsReason"
                    label="带标原因"
                    placeholder="请选择"
                    rules={[
                        {
                            required: true,
                            message: '请选择戴表原因',
                        },
                    ]}
                    valueEnum={{
                        true: '死亡',
                        false: '损坏',
                    }}
                />
                <Divider />
            </ModalForm>


            <a
                className='optionButtons'
                onClick={deleteHoops}
            >
                删除
            </a>
        </>

    )
}
