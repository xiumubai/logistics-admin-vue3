/*
 * @Author: 朽木白
 * @Date: 2023-05-22 09:31:16
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-05-31 09:52:14
 * @Description: 接口
 * @docs: http://139.198.152.148:8110/doc.html#/home
 */

export { login, getUserInfo, logout } from './user'
export {
  getAclUserList,
  addAclUser,
  updateAclUser,
  deleteAclUserById,
  batchAclUser,
  getUserRolesList,
  assignUserRoles,
} from './acl/account'

export { getRoleList, deleteRole, addRole, updateRole } from './acl/role'

export {
  getRolePermission,
  assignRolePermission,
  getPermissionList,
  deletePermission,
  addPermission,
  updatePermission,
} from './acl/permission'

export { getStatics } from './statics'
export { findByParentId, findByProvince } from './base/dict'
export {
  getShipperList,
  deleteShipperById,
  addShipper,
  updateShipper,
} from './base/shipper'

export { getGoodsNodeList, getGoodsTypeList } from './base/goodsType'
