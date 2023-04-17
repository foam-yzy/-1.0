// 运行时配置
import Logo from './images/logo.svg';
import { requestConfig } from './utils/format';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<any> {
  return {
    name: '@umijs/max',
    avatar: '',
  };
}

export const layout = () => {
  return {
    title: 'XX牧场管理平台',
    logo: Logo,
    menu: {
      locale: false,
    },
    collapsedButtonRender: false,
    collapsed: false,
    token: {
      header: {
        colorBgHeader: 'rgba(2, 22, 41, 1)',
        colorHeaderTitle: 'rgba(255, 255, 255, 1)',
        heightLayoutHeader: 48,
        // colorTextRightActionsItem: 'rgba(2, 22, 41, 1)',
      },
      sider: {
        colorBgMenuItemSelected: 'rgba(232, 248, 242, 1)',
        colorMenuBackground: 'rgba(255, 255, 255, 1)',
        colorTextMenuSelected: 'rgba(33, 180, 124, 1)',
      },
    },
    siderWidth: 160,
    layout: 'mix',
    logout() {
      console.log('退出登录');
    },
  };
};

export const request = requestConfig;
