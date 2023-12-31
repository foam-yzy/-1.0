import { defineConfig } from '@umijs/max';

export default defineConfig({
  //@ts-ignore
  mock: false,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  proxy: {
    '/api': {
      target: 'http://10.8.21.120:8098',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '驾驶舱',
      path: '/home',
      component: './Home',
    },
    {
      name: '业务管理',
      path: '/BusinessManage',
      // component: './Access',
      routes: [
        {
          name: '图纸选点',
          path: '/BusinessManage/Client/index',
          component: './BusinessManage/Client',
        },
        {
          name: '牲畜档案',
          path: '/BusinessManage/Livestock/index',
          component: './BusinessManage/Livestock',
        },
        {
          // name: '牲畜',
          path: '/BusinessManage/Livestock/components/CheckHoops',
          component: './BusinessManage/Livestock/components/CheckHoops',
        },
        {
          // name: '抵押解押',
          path: '/BusinessManage/Livestock/components/MortgageAndRelease',
          component: './BusinessManage/Livestock/components/MortgageAndRelease',
        },
        {
          name: '设备管理',
          path: '/BusinessManage/Device/index',
          component: './BusinessManage/Device',
        },
        {
          name: '监管考核',
          path: '/BusinessManage/assessment/index',
          component: './BusinessManage/Assessment',
        },
      ],
    },
    {
      name: '系统管理',
      path: '/SystemManage',
      // component: './Access',
      routes: [
        {
          name: '账号管理',
          path: '/SystemManage/accountManage/index',
          component: './SystemManage/AccountManage',
        },
        {
          name: '角色管理',
          path: '/SystemManage/roleManage/index',
          component: './SystemManage/RoleManage',
        }
      ],
    },
  ],
  npmClient: 'yarn',
});
