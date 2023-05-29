/**
 * @description 📚 路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

export const dynamicRoutes: RouteRecordRaw[] = [
  // 基础数据模块
  {
    path: '/base',
    component: Layout,
    redirect: '/base/dict/list',
    name: 'Base',
    meta: {
      title: '基础数据',
      icon: 'Menu',
    },
    children: [
      {
        path: '/base/dict/list',
        name: 'Dict',
        component: () => import('@/views/base/dict/index.vue'),
        meta: { title: '数据字典', icon: 'Grid' },
      },
      {
        path: '/base/shipperInfo/list',
        name: 'ShipperInfo',
        component: () => import('@/views/base/shipperInfo/index.vue'),
        meta: { title: '货主管理', icon: 'Grid' },
      },
      {
        path: '/base/goodsType/list',
        name: 'GoodsType',
        component: () => import('@/views/base/goodsType/index.vue'),
        meta: { title: '货品分类', icon: 'Grid' },
      },
      {
        path: '/base/goodsInfo/list',
        name: 'GoodsInfo',
        component: () => import('@/views/base/goodsInfo/index.vue'),
        meta: { title: '货品管理', icon: 'Grid' },
      },
    ],
  },

  // 储位管理
  {
    path: '/ware',
    component: Layout,
    redirect: '/ware/warehouseInfo/list',
    name: 'Ware',
    meta: {
      title: '储位管理',
      icon: 'Menu',
    },
    children: [
      {
        path: '/ware/warehouseInfo/list',
        name: 'WarehouseInfo',
        component: () => import('@/views/ware/warehouseInfo/index.vue'),
        meta: { title: '仓库管理', icon: 'Grid' },
      },
      {
        path: '/ware/storeareaInfo/list',
        name: 'StoreareaInfo',
        component: () => import('@/views/ware/storeareaInfo/index.vue'),
        meta: { title: '库区管理', icon: 'Grid' },
      },
      {
        path: '/ware/storeshelfInfo/list',
        name: 'StoreshelfInfo',
        component: () => import('@/views/ware/storeshelfInfo/index.vue'),
        meta: { title: '货架管理', icon: 'Grid' },
      },
      {
        path: '/ware/storehouseInfo/list',
        name: 'StorehouseInfo',
        component: () => import('@/views/ware/storehouseInfo/index.vue'),
        meta: { title: '库位管理', icon: 'Grid' },
      },
    ],
  },

  {
    path: '/inbound',
    component: Layout,
    redirect: '/inbound/inOrder/list',
    name: 'Inbound',
    meta: {
      title: '入库管理',
      icon: 'Menu',
    },
    children: [
      {
        path: '/inbound/inOrder/list',
        name: 'InOrder',
        component: () => import('@/views/inbound/inOrder/index.vue'),
        meta: { title: '入库预约', icon: 'Grid' },
      },
      {
        path: '/inbound/inApproveTask/list',
        name: 'InApproveTask',
        component: () => import('@/views/inbound/inApproveTask/index.vue'),
        meta: { title: '入库审批', icon: 'Grid' },
      },
      {
        path: '/inbound/inReceivingTask/list',
        name: 'InReceivingTask',
        component: () => import('@/views/inbound/inReceivingTask/index.vue'),
        meta: { title: '收货任务', icon: 'Grid' },
      },
      {
        path: '/inbound/inPutawayTask/list',
        name: 'InPutawayTask',
        component: () => import('@/views/inbound/inPutawayTask/index.vue'),
        meta: { title: '上架任务', icon: 'Grid' },
      },
      {
        path: '/inbound/inOrder/show/:id',
        name: 'InOrderShow',
        component: () => import('@/views/inbound/inOrder/index.vue'),
        meta: {
          title: '入库单详情',
          noCache: true,
          isHide: true,
          icon: 'Grid',
        },
      },
    ],
  },

  // 库内管理
  {
    path: '/inventory',
    component: Layout,
    redirect: '/inventoryInfo/list',
    name: 'Inventory',
    meta: {
      title: '库内管理',
      icon: 'Menu',
    },
    children: [
      {
        path: 'inventoryInfo/list',
        name: 'InventoryInfo',
        component: () => import('@/views/inventory/inventoryInfo/index.vue'),
        meta: { title: '实时库存', icon: 'Grid' },
      },
      {
        path: 'invCounting/list',
        name: 'InvCounting',
        component: () => import('@/views/inventory/invCounting/index.vue'),
        meta: { title: '库内盘点', icon: 'Grid' },
      },
      {
        path: 'invCountingTask/list',
        name: 'InvCountingTask',
        component: () => import('@/views/inventory/invCountingTask/index.vue'),
        meta: { title: '盘点任务', icon: 'Grid' },
      },
      {
        path: 'invCounting/show/:id',
        name: 'InvCountingShow',
        component: () => import('@/views/inventory/invCounting/index.vue'),
        meta: {
          title: '盘点单详情',
          noCache: true,
          isHide: true,
          icon: 'Grid',
        },
      },

      {
        path: 'invMove/list',
        name: 'InvMove',
        component: () => import('@/views/inventory/invMove/index.vue'),
        meta: { title: '移库管理', icon: 'Grid' },
      },
      {
        path: 'invMoveTask/list',
        name: 'InvMoveTask',
        component: () => import('@/views/inventory/invMoveTask/index.vue'),
        meta: { title: '移库任务', icon: 'Grid' },
      },
      {
        path: 'invMove/show/:id',
        name: 'InvMoveShow',
        component: () => import('@/views/inventory/invMove/show.vue'),
        meta: { title: '移库详情', noCache: true, isHide: true, icon: 'Grid' },
      },
    ],
  },

  // 出库管理
  {
    path: '/outbound',
    component: Layout,
    redirect: '/outbound/inOrder/list',
    name: 'Outbound',
    meta: {
      title: '出库管理',
      icon: 'Menu',
    },
    children: [
      {
        path: '/outbound/outOrder/list',
        name: 'OutOrder',
        component: () => import('@/views/outbound/outOrder/index.vue'),
        meta: { title: '出库单管理', icon: 'Grid' },
      },
      {
        path: '/outbound/outOrder/show/:id',
        name: 'OutOrderShow',
        component: () => import('@/views/outbound/outOrder/index.vue'),
        meta: {
          title: '出库单详情',
          noCache: true,
          isHide: true,
          icon: 'Grid',
        },
      },
      {
        path: '/outbound/outPickingTask/list',
        name: 'OutPickingTask',
        component: () => import('@/views/outbound/outPickingTask/index.vue'),
        meta: { title: '拣货任务', icon: 'Grid' },
      },
      {
        path: '/outbound/outDeliverTask/list',
        name: 'OutDeliverTask',
        component: () => import('@/views/outbound/outDeliverTask/index.vue'),
        meta: { title: '发货任务', icon: 'Grid' },
      },
    ],
  },

  {
    path: '/config',
    component: Layout,
    redirect: '/config/wareConfig/list',
    name: 'Config',
    meta: {
      title: '配置管理',
      icon: 'Menu',
    },
    children: [
      {
        path: '/config/wareConfig/list',
        name: 'WareConfig',
        component: () => import('@/views/config/wareConfig/index.vue.vue'),
        meta: { title: '配置列表', icon: 'Menu' },
      },
    ],
  },
  // 权限管理
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user',
    meta: {
      title: '权限管理',
      icon: 'Setting',
    },
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'UserFilled',
        },
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'Avatar',
        },
      },
      {
        name: 'Permission',
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Menu',
        },
      },
    ],
  },
]
