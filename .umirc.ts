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
      target: 'http://10.8.20.120:8098',
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
    {
      name: '业务管理',
      path: '/BusinessManage',
      // component: './Access',
      routes: [
        {
          name: '监管考核',
          path: '/BusinessManage/assessment/index',
          component: './BusinessManage/Assessment',
        },
        {
          name: '设备管理',
          path: '/BusinessManage/Device/index',
          component: './BusinessManage/Device',
        },
      ],
    },
  ],
  npmClient: 'yarn',
});
