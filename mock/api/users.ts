import Mock from 'mockjs';
import { doCustomTimes, resultSuccess, resultError, resultPageSuccess } from '../_util';
import type { UserTokenAccountParams } from '../../src/api/users/types';

const { Random } = Mock;

const menus = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: '/layouts/BaseLayout/BaseLayout.vue',
    redirect: '/dashboard/console',
    meta: { icon: 'ant-design:dashboard-outlined' },
    children: [
      {
        path: '/dashboard/console',
        name: '主控台',
        component: '/views/dashboard/console/index.vue',
        meta: { icon: 'mdi:console' }
      },
    ]
  },
  {
    path: '/component',
    name: '组件示例',
    component: '/layouts/BaseLayout/BaseLayout.vue',
    redirect: '/component/button',
    meta: { icon: 'bxs:component' },
    children: [
      {
        path: '/component/button',
        name: '按钮组件',
        component: '/views/component/button/index.vue',
        meta: { icon: 'material-symbols:buttons-alt-outline-rounded' }
      },
      {
        path: '/component/form',
        name: '表单组件',
        component: '/views/component/form/index.vue',
        meta: { icon: 'ant-design:form-outlined' }
      },
      {
        path: '/component/table',
        name: '表格组件',
        meta: { icon: 'material-symbols:table' },
        children: [
          {
            path: '/component/table/basic',
            name: '基础表格',
            component: '/views/component/table/basic/index.vue',
          }
        ]
      },
    ]
  },
  {
    path: '/map',
    name: '地图',
    component: '/layouts/BaseLayout/BaseLayout.vue',
    redirect: '/map/amap',
    meta: { icon: 'ep:map-location' },
    children: [
      {
        path: '/map/amap',
        name: '高德地图',
        component: '/views/map/amap/index.vue',
        meta: { icon: 'ant-design:environment-outlined' }
      },
      {
        path: '/map/tmap',
        name: '腾讯地图',
        component: '/views/map/tmap/index.vue',
        meta: { icon: 'ant-design:environment-outlined' }
      },
    ]
  },
  {
    path: '/system',
    name: '系统管理',
    component: '/layouts/BaseLayout/BaseLayout.vue',
    redirect: '/system/users',
    meta: { icon: 'ant-design:setting-outlined' },
    children: [
      {
        path: '/system/users',
        name: '用户管理',
        component: '/views/system/users/index.vue',
        meta: { icon: 'ant-design:user-outlined', roles: ['admin'] }
      },
      {
        path: '/system/roles',
        name: '角色管理',
        component: '/views/system/roles/index.vue',
        meta: { icon: 'ant-design:team-outlined', roles: ['admin'] }
      },
    ]
  }
];

function userTableList(pageSize) {
  const result: any[] = [];
  doCustomTimes(pageSize, () => {
    result.push({
      id: '@integer(10,999999)',
      address: '@county(true)',
      name: '@cname()',
      avatar: Random.image(
        '400x400',
        Random.color(),
        Random.color(),
        Random.first()
      ),
      phone: /^1[3-9]\d{9}$/,
      'roleName|1': Mock.Random.pick(['超级管理员', '管理员', '普通角色', '通用角色']),
      createTime: '@datetime',
      'no|100000-10000000': 100000,
      'status|1': [true, false],
    });
  });
  return result;
}

export default [
  {
    url: '/api/user/account/token',
    method: 'GET',
    response: ({ query }: { query: UserTokenAccountParams }) => {
      const { username, password } = query;
      if (username !== 'admin' || password !== '123456') {
        return resultError('账号或密码错误', {
          code: 400,
        });
      }

      return resultSuccess({
        userId: Random.id(),
        userName: Random.cname(),
        token: Random.string(32),
      });
    }
  },
  {
    url: '/api/user/info',
    method: 'GET',
    response: () => {
      return resultSuccess({
        userId: Random.id(),
        userName: Random.cname(),
        avatar: Random.image('100x100', '#50B347', '#FFF', 'png', 'avatar'),
        roles: ['admin'],
        roleName: '管理员',
        menus: menus,
        token: Random.string(32),
        organizeId: Random.id(),
        organizeName: Random.ctitle(),
      });
    },
  },
  {
    url: '/api/user/page',
    method: 'GET',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      const list = userTableList(100);

      return resultPageSuccess(Number(page), Number(pageSize), list);
    }
  }
];
