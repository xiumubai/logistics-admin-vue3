/*
 * @Description:入库类型
 * @Autor: codeBo
 * @Date: 2023-06-01 15:06:06
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-06-02 16:58:50
 */

export interface inApproveTaskList {
  id: number
  createId: number
  createName: string
  updateId: number
  updateName: string
  createTime: string
  updateTime: string
  param: Record<string, unknown>
  taskNo: string
  inOrderId: number
  inOrderNo: string
  shipperOrderNo: string
  shipperId: number
  shipperName: string
  warehouseId: number
  driver: string
  driverPhone: string
  expectCount: number
  approveUser: string
  approveUserId: number
  approveTime: string
  status: string
  remarks: string
  statusName: string
}
export interface OrderItem {
  id: number
  createId: number
  createName: string
  updateId: number
  updateName: string
  createTime: string
  updateTime: string
  param: Record<string, unknown>
  inOrderId: number
  goodsId: number
  goodsForm: null
  unitId: number
  baseUnitId: number
  expectCount: number
  actualCount: number
  unqualifiedCount: number
  putawayCount: number
  price: number
  baseCount: number
  totalPrice: number
  produceDate: null
  dueDate: null
  weight: string
  volume: string
  warehouseId: number
  storeareaId: number
  storeshelfId: number
  storehouseId: number
  status: null
  goodsInfo: {
    id: null
    createId: null
    createName: null
    updateId: null
    updateName: null
    createTime: null
    updateTime: null
    param: Record<string, unknown>
    name: null
    code: string
    barcode: null
    goodsTypeId: null
    brandName: null
    saleAttr: null
    inspectTypeId: null
    temperatureTypeId: null
    volume: null
    weight: null
    unitId: null
    baseUnitId: null
    baseCount: null
    status: null
    skuId: null
    goodsTypeName: null
    inspectTypeName: null
    temperatureTypeName: null
    unitName: null
    baseUnitName: null
    inventoryInfoList: null
  }
  unitName: string
  baseUnitName: string
}
export interface InOrder {
  inOrderItemList: OrderItem
  id: number
  createId: number
  createName: string
  updateId: number
  updateName: string
  createTime: string
  updateTime: string
  param: Record<string, unknown>
  inOrderNo: string
  shipperOrderNo: string
  shipperId: number
  shipperName: string
  warehouseId: number
  warehouseName: string
  driver: string
  driverPhone: string
  estimatedArrivalTime: string
  expectCount: number
  status: string
  statusName: string
}
export interface InOrderPutawayRecord {
  id: number
  createId: number
  createName: string
  updateId: number
  updateName: string
  createTime: string
  updateTime: string
  param: Record<string, unknown>
  taskNo: string
  inOrderId: number
  inOrderNo: string
  shipperOrderNo: string
  shipperId: number
  shipperName: string
  warehouseId: number
  putawayTime: string
  putawayUserId: number
  putawayUser: string
  expectCount: number
  actualCount: number
  unqualifiedCount: number
  putawayCount: number
  remarks: string
  status: string
  statusName: string
}
export interface InOrderReceivingRecord {
  id: number
  createId: number
  createName: string
  updateId: number
  updateName: string
  createTime: string
  updateTime: string
  param: Record<string, unknown>
  taskNo: string
  inOrderId: number
  inOrderNo: string
  shipperOrderNo: string
  shipperId: number
  shipperName: string
  warehouseId: number
  estimatedArrivalTime: string
  driver: string
  driverPhone: string
  receivingUserId: number
  receivingUser: string
  expectCount: number
  actualCount: number
  receivingTime: string
  remarks: string
  status: string
  statusName: string
}

export namespace InOrderInfo {
  export interface detail {
    inApproveTaskList: inApproveTaskList[]
    inOrder: InOrder
    inPutawayTaskList: InOrderPutawayRecord[]
    inReceivingTaskList: InOrderReceivingRecord[]
  }
  export interface inOrderItem {
    id: number
    createId: number
    createName: string
    updateId: number
    updateName: string
    createTime: string
    updateTime: string
    param: Record<string, unknown>
    inOrderNo: string
    shipperOrderNo: string
    shipperId: number
    shipperName: string
    estimatedArrivalTime: string
    warehouseId: number
    driver: string
    driverPhone: string
    expectCount: number
    status: string
    inOrderItemList: string
    statusName: string
    warehouseName: string
  }
  export interface ReqPage {
    pageNum: number
    pageSize: number
    no: string
    warehouseId: string
  }
  export interface Warehouse {
    id: number
    createId: number | null
    createName: string | null
    updateId: number
    updateName: string
    createTime: string
    updateTime: string
    param: Record<string, unknown>
    name: string
    type: number
    provinceId: number
    cityId: number
    areaId: number
    address: string
    builtArea: number
    manageId: number
    manageName: string
    managePhone: string
    storeareaCount: number
    storeshelfCount: number
    storehouseCount: number
    status: number
    provinceName: string | null
    cityName: string | null
    areaName: string | null
    distance: number | null
  }
}
