export namespace OutOrder {
  export interface ResOutOrderItem {
    areaId: number | null
    cityId: number | null
    consignee: string
    consigneeTel: string
    createId: number | null
    createName: string | null
    createTime: string
    deliveryAddress: string
    id: string
    orderComment: string
    orderNo: string
    outOrderItemList: null
    outOrderNo: string
    parentOrderNo: null
    provinceId: number
    status: string
    statusName: string
    trackingCompany: null
    trackingNo: null
    updateId: number | null
    updateName: string | null
    updateTime: string
    warehouseId: number
    warehouseName: string
  }

  export interface OutOrderDetail {
    outOrderItemList: ResOutOrderItem[]
    areaId: number | null
    cityId: number | null
    consignee: string
    consigneeTel: string
    createId: number | null
    createName: string | null
    createTime: string
    deliveryAddress: string
    id: string
    orderComment: string
    orderNo: string
    outOrderNo: string
    parentOrderNo: string
    provinceId: number
    status: string
    statusName: string
    trackingCompany: null
    trackingNo: null
    updateId: number | null
    updateName: string | null
    updateTime: string
    warehouseId: number
    warehouseName: string
  }
  export interface OutDeliverTaskListItem {
    consignee: string
    consigneeTel: string
    createId: number
    createName: string
    createTime: string
    deliverCount: number
    deliverTime: string
    deliverUser: string
    deliverUserId: number
    deliveryAddress: string
    id: string
    orderComment: string
    outOrderId: number
    outOrderNo: string
    status: string
    statusName: string
    taskNo: string
    trackingCompany: string
    trackingNo: string
    updateId: number
    updateName: string
    updateTime: string
    warehouseId: number
    warehouseName: string | null
  }
  export interface OutPickingTaskListItem {
    createId: number | null
    createName: string | null
    createTime: string
    id: string
    outPickingItemList: null
    pickingCount: number
    pickingTime: string
    pickingUser: string
    pickingUserId: number
    status: string
    statusName: string
    storeareaId: number
    storehouseId: number
    storeshelfId: number
    storeshelfName: string
    taskNo: string
    updateId: number
    updateName: string
    updateTime: string
    warehouseId: number
    warehouseName: string
  }
  export interface OrderDetail {
    outDeliverTaskList: OutDeliverTaskListItem[]
    outOrder: OutOrderDetail
    outPickingTaskList: OutPickingTaskListItem[]
  }
}

export namespace OutPickingTask {
  export interface ResOutPickingTaskItem {
    createTime: string
    id: string
    outPickingItemList: null
    pickingCount: number
    pickingTime: string
    pickingUser: string
    pickingUserId: number
    status: string
    statusName: string
    storeareaId: number
    storehouseId: number
    storeshelfId: number
    storeshelfName: string | null
    taskNo: string
    updateId: number
    updateName: string
    updateTime: string
    warehouseId: number
    warehouseName: string
  }
  export interface PinkingDetailItem {
    barcode: string
    createName: string | null
    createTime: string
    goodsId: number
    goodsName: string
    id: string
    outPickingId: number
    pickingCount: number
    status: string
    statusName: string
    storeareaId: number
    storehouseId: number
    storehouseName: string
    storeshelfId: number
    updateId: number
    updateName: string
    updateTime: string
    volume: string
    warehouseId: number
    warehouseName: string
    weight: string
  }
  export interface ResOutPickingDetail {
    outPickingItemList: PinkingDetailItem[]
    id: string
    pickingCount: number
    pickingTime: string
    pickingUser: string
    pickingUserId: number
    status: string
    statusName: string
    storeareaId: number
    storehouseId: number
    storeshelfId: number
    storeshelfName: string | null
    taskNo: string
    updateId: number
    updateName: string
    updateTime: string
    warehouseId: number
    warehouseName: string
  }
}

export namespace OutDeliverTask {
  export interface ResOutDeliverTaskItem {
    consignee: string
    consigneeTel: string
    createId: number
    createName: string
    createTime: string
    deliverCount: number
    deliverTime: string
    deliverUser: string
    deliverUserId: number
    deliveryAddress: string
    id: string
    orderComment: string
    outOrderId: number
    outOrderNo: string
    status: string
    statusName: string
    taskNo: string
    trackingCompany: string
    trackingNo: string
    updateId: number
    updateName: string
    updateTime: string
    warehouseId: number
    warehouseName: string
  }
}
