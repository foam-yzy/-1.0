// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

import { RequestConfig } from '@umijs/max';
import { message as alertMessage, notification } from 'antd';
// import { RequestConfig } from './request';

// 错误处理方案： 错误类型
enum ErrorCode {
    SILENT = '500',
    WARN_MESSAGE = '400',
    ERROR_MESSAGE = '300',
    NOTIFICATION = '250',
    REDIRECT = '100',
}
// 与后端约定的响应数据格式
interface ResponseStructure {
    success: boolean;
    data: any;
    code: string;
    message?: string;
}

// 请求时配置
export const requestConfig: RequestConfig = {
    timeout: 1000,
    Headers: '',
    errorConfig: {
        // 错误抛出
        //触发条件，只有当response.success == false时，才会执行错误抛出
        errorThrower: (res: ResponseStructure) => {
            const { success, data, code, message } = res;
            if (!success) {
                const error: any = new Error(message);
                error.name = 'BizError';
                error.info = { code, message, data };
                throw error; // 抛出自制的错误
            }
        },
        // 错误接收及处理
        errorHandler: (error: any, opts: any) => {
            if (opts?.skipErrorHandler) throw error;
            // 我们的 errorThrower 抛出的错误。
            if (error.name === 'BizError') {
                console.log("error.name", error.name);

                const errorInfo: ResponseStructure | undefined = error.info;
                if (errorInfo) {
                    const { message, code } = errorInfo;
                    switch (errorInfo.code) {
                        case ErrorCode.SILENT:
                            // do nothing
                            break;
                        case ErrorCode.WARN_MESSAGE:
                            // alertMessage.warn(message);
                            alertMessage.error(message);
                            break;
                        case ErrorCode.ERROR_MESSAGE:
                            alertMessage.error(message);
                            break;
                        case ErrorCode.NOTIFICATION:
                            notification.open({
                                description: message,
                                message: code,
                            });
                            break;
                        case ErrorCode.REDIRECT:
                            // TODO: redirect
                            break;
                        default:
                            alertMessage.error(message);
                    }
                }
            } else
                if (error.response) {
                    // Axios 的错误
                    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                    alertMessage.error(`Response status:${error.response.status}`);
                } else if (error.request) {
                    // 请求已经成功发起，但没有收到响应
                    // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
                    // 而在node.js中是 http.ClientRequest 的实例
                    alertMessage.error('None response! Please retry.');
                } else {
                    // 发送请求时出了点问题
                    alertMessage.error('Request error, please retry.');
                }
        },
    },

    requestInterceptors: [
        // 直接写一个 function，作为拦截器
        (options: any) => {
            // do something
            options.headers.token = sessionStorage.token || '';
            options.url = '/api' + options.url;
            return options
        },
    ],

    // }
    //返回处理
    responseInterceptors: [
        // 直接写一个 function，作为拦截器
        //@ts-expect-error
        (response: { data: ResponseStructure, status: number }) => {            
            // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
            if (response.status == 200) {
                return response
            }
            // do something
        },
    ]
}
