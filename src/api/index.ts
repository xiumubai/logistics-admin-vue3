/*
 * @Author: 朽木白
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
  getUserByKeyword,
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

export {
  getInOrderInfoList,
  getFindKeyWordList,
  getDetailList,
  findNodesList,
} from './inbound/inOrder'
export { getInApproveTaskList } from './inbound/inApproveTask'
export { getInReceivingTaskList } from './inbound/inReceivingTask'

export { getStatics } from './statics'
export { findByParentId, findByDictCode } from './base/dict'
export {
  getShipperList,
  deleteShipperById,
  addShipper,
  updateShipper,
} from './base/shipper'

export { getGoodsNodeList, getGoodsTypeList } from './base/goodsType'
export {
  getGoodsInfoList,
  deleteGoodsById,
  updateStatus,
  addGoodInfo,
  updateGoodInfo,
  findGoodsTypeIdList,
  getProductList,
} from './base/goodsInfo'

export { getConfig } from './base/wareConfig'
export {
  getWarehouseInfoList,
  deleteWarehouseInfoById,
  addWarehouseInfo,
  updateWarehouseInfo,
  findWarehouseInfoAll,
} from './ware/warehouseInfo'

export {
  getStoreareaInfoList,
  deleteStoreareaInfoById,
  addStoreareaInfo,
  updateStoreareaInfo,
} from './ware/storeareaInfo'

export {
  getStorehouseInfoList,
  deleteStorehouseInfoById,
  addStorehouseInfo,
  updateStorehouseInfo,
} from './ware/storehouseInfo'

export {
  getStoreshelfInfoList,
  deleteStoreshelfInfoById,
  addStoreshelfInfo,
  updateStoreshelfInfo,
} from './ware/storeshelfInfo'

export { getWareConfig, updateWareConfig } from './config/wareConfig'

export { getOutOrderList, getOutOrderDetail } from './outbound/orderList'

export {
  getOutPickingTaskList,
  getOutPickingTaskDetail,
} from './outbound/outPickingTask'

export { getOutDeliverTaskList } from './outbound/outDeliverTask'

export {
  getInventoryInfoList,
  getInvLogList,
  updateInventory,
  findByStorehouseId,
} from './inventory/inventoryInfo'

export {
  getInvCountingList,
  getInvCountingDetail,
  removeInvCounting,
  saveInvCounting,
  updateInvCounting,
} from './inventory/invCounting'

export {
  getInvCountingTaskList,
  assignInvCountingTask,
  updateInvCountingTask,
} from './inventory/invCountingtask'

export {
  getInvMoveList,
  delInventoryById,
  getInventoryInfoById,
  getInfoById,
  findByKeyWord,
} from './inventory/invMove'

export { getInvMoveTaskList, showMoveInfoById } from './inventory/invMoveTask'
