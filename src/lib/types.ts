/**
 * Auto-generated TypeScript types from GraphQL schema
 * DO NOT EDIT MANUALLY - This file is auto-generated
 * Run 'npm run codegen' to regenerate
 */

// ============================================
// Enums
// ============================================

/**
 * Type of action performed
 */
export enum AuditAction {
  ALERT_ACKNOWLEDGED = 'ALERT_ACKNOWLEDGED',
  ALERT_CREATED = 'ALERT_CREATED',
  ALERT_RESOLVED = 'ALERT_RESOLVED',
  CREATED = 'CREATED',
  DELETED = 'DELETED',
  FILE_DELETED = 'FILE_DELETED',
  FILE_DOWNLOADED = 'FILE_DOWNLOADED',
  FILE_METADATA_UPDATED = 'FILE_METADATA_UPDATED',
  FILE_UPLOADED = 'FILE_UPLOADED',
  INVENTORY_CREATED = 'INVENTORY_CREATED',
  INVENTORY_DELETED = 'INVENTORY_DELETED',
  INVENTORY_LOW_STOCK = 'INVENTORY_LOW_STOCK',
  INVENTORY_RESTOCKED = 'INVENTORY_RESTOCKED',
  INVENTORY_UPDATED = 'INVENTORY_UPDATED',
  INVOICE_CREATED = 'INVOICE_CREATED',
  INVOICE_DELETED = 'INVOICE_DELETED',
  INVOICE_SENT = 'INVOICE_SENT',
  INVOICE_UPDATED = 'INVOICE_UPDATED',
  LOGIN = 'LOGIN',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  MESSAGE_DELETED = 'MESSAGE_DELETED',
  MESSAGE_READ = 'MESSAGE_READ',
  MESSAGE_SENT = 'MESSAGE_SENT',
  NOTIFICATION_DELETED = 'NOTIFICATION_DELETED',
  NOTIFICATION_READ = 'NOTIFICATION_READ',
  NOTIFICATION_SENT = 'NOTIFICATION_SENT',
  NOTIFICATION_UPDATED = 'NOTIFICATION_UPDATED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  PRODUCT_CREATED = 'PRODUCT_CREATED',
  PRODUCT_DELETED = 'PRODUCT_DELETED',
  PRODUCT_UPDATED = 'PRODUCT_UPDATED',
  READ = 'READ',
  REGISTER = 'REGISTER',
  SALE_CREATED = 'SALE_CREATED',
  SALE_DELETED = 'SALE_DELETED',
  SALE_REFUNDED = 'SALE_REFUNDED',
  SALE_UPDATED = 'SALE_UPDATED',
  STORE_CREATED = 'STORE_CREATED',
  STORE_DELETED = 'STORE_DELETED',
  STORE_UPDATED = 'STORE_UPDATED',
  STORE_VIEWED = 'STORE_VIEWED',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  UPDATED = 'UPDATED',
  USER_CREATED = 'USER_CREATED',
  USER_DELETED = 'USER_DELETED',
  USER_PERMISSIONS_CHANGED = 'USER_PERMISSIONS_CHANGED',
  USER_ROLE_CHANGED = 'USER_ROLE_CHANGED',
  USER_UPDATED = 'USER_UPDATED'
}

/**
 * Resource type affected by the action
 */
export enum AuditResource {
  ALERT = 'ALERT',
  AUTH = 'AUTH',
  CHAT = 'CHAT',
  FILE = 'FILE',
  INVENTORY = 'INVENTORY',
  INVOICE = 'INVOICE',
  NOTIFICATION = 'NOTIFICATION',
  PRODUCT = 'PRODUCT',
  REPORT = 'REPORT',
  SALES = 'SALES',
  STORE = 'STORE',
  SYSTEM = 'SYSTEM',
  USER = 'USER'
}

export enum MessageType {
  FILE = 'FILE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT'
}

export enum NotificationStatus {
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  READ = 'READ',
  SENT = 'SENT'
}

export enum NotificationType {
  ERROR = 'ERROR',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING'
}

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CARD = 'CARD',
  CASH = 'CASH',
  CREDIT = 'CREDIT',
  MOBILE = 'MOBILE'
}

/**
 * Product status in the system
 */
export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  DISCONTINUED = 'DISCONTINUED',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK'
}

/**
 * Product unit of measurement
 */
export enum ProductUnit {
  BOX = 'BOX',
  DOZEN = 'DOZEN',
  GRAM = 'GRAM',
  KG = 'KG',
  LITER = 'LITER',
  METER = 'METER',
  PACK = 'PACK',
  PIECE = 'PIECE'
}

export enum SaleStatus {
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  REFUNDED = 'REFUNDED'
}

/**
 * Status of stock alert
 */
export enum StockAlertStatusEnum {
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  IGNORED = 'IGNORED',
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED'
}

/**
 * Type of stock alert
 */
export enum StockAlertTypeEnum {
  CRITICAL = 'CRITICAL',
  LOW_STOCK = 'LOW_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK'
}

/**
 * Status of stock movement
 */
export enum StockMovementStatusEnum {
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING'
}

/**
 * Type of stock movement
 */
export enum StockMovementTypeEnum {
  ADJUSTMENT = 'ADJUSTMENT',
  DAMAGE = 'DAMAGE',
  INITIAL_STOCK = 'INITIAL_STOCK',
  MANUAL = 'MANUAL',
  RESTOCK = 'RESTOCK',
  RETURN = 'RETURN',
  SALE = 'SALE',
  TRANSFER = 'TRANSFER'
}

/**
 * File storage type
 */
export enum StorageType {
  CLOUDINARY = 'CLOUDINARY',
  LOCAL = 'LOCAL'
}

/**
 * Store status in the system
 */
export enum StoreStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED'
}

/**
 * User role in the system
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  SALES_REP = 'SALES_REP',
  STORE_OWNER = 'STORE_OWNER'
}

export enum UserStatus {
  AWAY = 'AWAY',
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE'
}

// ============================================
// Input Types
// ============================================

export interface AuditFilterInput {
  action?: AuditAction | null
  endDate?: string | null
  page?: number | null
  pageSize?: number | null
  resource?: AuditResource | null
  resourceId?: string | null
  startDate?: string | null
  userId?: string | null
}

export interface CreateAuditInput {
  action: AuditAction
  details?: any | null
  errorMessage?: string | null
  ipAddress?: string | null
  resource: AuditResource
  resourceId?: string | null
  success?: boolean | null
  userAgent?: string | null
  userId?: string | null
  username?: string | null
}

export interface CreateProductInput {
  allowBackorder?: boolean | null
  barcode?: string | null
  brand?: string | null
  category?: string | null
  cost: number
  description?: string | null
  image?: string | null
  images?: string[] | null
  metadata?: any | null
  minStockLevel?: number | null
  name: string
  price: number
  quantity?: number | null
  reorderPoint?: number | null
  reorderQuantity?: number | null
  sku: string
  status?: ProductStatus | null
  storeId: string
  supplier?: string | null
  tags?: string[] | null
  taxable?: boolean | null
  trackInventory?: boolean | null
  unit?: ProductUnit | null
}

export interface CreateSaleInput {
  amountPaid: number
  customerEmail?: string | null
  customerName?: string | null
  customerPhone?: string | null
  discount?: number | null
  items: SaleItemInput[]
  notes?: string | null
  paymentMethod: PaymentMethod
  storeId: string
}

export interface CreateStockMovementInput {
  metadata?: any | null
  notes?: string | null
  productId: string
  quantity: number
  reason?: string | null
  referenceId?: string | null
  referenceType?: string | null
  storeId: string
  type: StockMovementTypeEnum
  unitCost?: number | null
}

export interface CreateStoreInput {
  address: string
  autoGenerateInvoiceNumbers?: boolean | null
  businessHours?: any | null
  city: string
  country: string
  currency?: string | null
  defaultLowStockThreshold?: number | null
  description?: string | null
  email?: string | null
  enableInventoryTracking?: boolean | null
  enableLowStockAlerts?: boolean | null
  enableTax?: boolean | null
  invoicePrefix?: string | null
  language?: string | null
  logo?: string | null
  metadata?: any | null
  name: string
  ownerId: string
  phoneNumber: string
  registrationNumber?: string | null
  status?: StoreStatus | null
  subscriptionPlan?: string | null
  taxId?: string | null
  taxName?: string | null
  taxRate?: number | null
  timezone?: string | null
}

export interface CreateUserInput {
  address?: string | null
  assignedStores?: string[] | null
  avatar?: string | null
  email: string
  fullName: string
  password: string
  permissions?: string[] | null
  phoneNumber: string
  role: UserRole
  storeId?: string | null
  username: string
}

export interface LoginInput {
  deviceToken?: string | null
  password: string
  username: string
}

export interface LogoutInput {
  deviceToken?: string | null
}

export interface RefundSaleInput {
  reason: string
  saleId: string
}

export interface SaleItemInput {
  discount?: number | null
  productId: string
  quantity: number
  unitPrice: number
}

export interface SendMessageInput {
  fileId?: string | null
  message: string
  receiverId: string
  type?: MessageType | null
}

export interface SendNotificationInput {
  body: string
  data?: string | null
  fcmToken?: string | null
  fcmTokens?: string[] | null
  imageUrl?: string | null
  title: string
  topic?: string | null
  type?: NotificationType | null
  userId?: string | null
}

export interface TypingIndicatorInput {
  chatWithUserId: string
  isTyping: boolean
}

export interface UpdateNotificationInput {
  isRead?: boolean | null
  status?: NotificationStatus | null
}

export interface UpdateProductInput {
  allowBackorder?: boolean | null
  barcode?: string | null
  brand?: string | null
  category?: string | null
  cost?: number | null
  description?: string | null
  image?: string | null
  images?: string[] | null
  metadata?: any | null
  minStockLevel?: number | null
  name?: string | null
  price?: number | null
  quantity?: number | null
  reorderPoint?: number | null
  reorderQuantity?: number | null
  sku?: string | null
  status?: ProductStatus | null
  supplier?: string | null
  tags?: string[] | null
  taxable?: boolean | null
  trackInventory?: boolean | null
  unit?: ProductUnit | null
}

export interface UpdateSaleStatusInput {
  notes?: string | null
  saleId: string
  status: SaleStatus
}

export interface UpdateStatusInput {
  status: UserStatus
}

export interface UpdateStoreInput {
  address?: string | null
  autoGenerateInvoiceNumbers?: boolean | null
  businessHours?: any | null
  city?: string | null
  country?: string | null
  currency?: string | null
  defaultLowStockThreshold?: number | null
  description?: string | null
  email?: string | null
  enableInventoryTracking?: boolean | null
  enableLowStockAlerts?: boolean | null
  enableTax?: boolean | null
  invoicePrefix?: string | null
  language?: string | null
  logo?: string | null
  metadata?: any | null
  name?: string | null
  nextInvoiceNumber?: number | null
  ownerId?: string | null
  phoneNumber?: string | null
  registrationNumber?: string | null
  status?: StoreStatus | null
  subscriptionPlan?: string | null
  taxId?: string | null
  taxName?: string | null
  taxRate?: number | null
  timezone?: string | null
}

export interface UpdateUserInput {
  address?: string | null
  assignedStores?: string[] | null
  avatar?: string | null
  email?: string | null
  fullName?: string | null
  isActive?: boolean | null
  permissions?: string[] | null
  phoneNumber?: string | null
  role?: UserRole | null
  storeId?: string | null
  username?: string | null
}

// ============================================
// Object Types
// ============================================

export interface AuditListResponse {
  audits: AuditType[]
  page: number
  pageSize: number
  total: number
}

export interface AuditType {
  _id: string
  action: AuditAction
  createdAt: string
  details: any
  errorMessage?: string | null
  ipAddress?: string | null
  resource: AuditResource
  resourceId?: string | null
  success: boolean
  updatedAt: string
  userAgent?: string | null
  userId?: string | null
  username?: string | null
}

export interface AuthResponse {
  accessToken: string
  user: UserType
}

export interface Chat {
  _id: string
  createdAt: string
  file?: FileType | null
  fileId?: string | null
  isRead: boolean
  message: string
  receiverId: string
  senderId: string
  type: MessageType
  updatedAt: string
}

export interface FileType {
  _id: string
  cloudinaryPublicId?: string | null
  createdAt: string
  description?: string | null
  filename: string
  format?: string | null
  height?: number | null
  mimetype: string
  originalName: string
  path?: string | null
  resourceType?: string | null
  secureUrl?: string | null
  size: number
  storageType: StorageType
  updatedAt: string
  uploadedBy: UserType
  url?: string | null
  width?: number | null
}

export interface LogoutResponse {
  message: string
  success: boolean
}

export interface Notification {
  _id: string
  body: string
  createdAt: string
  data?: any | null
  errorMessage?: string | null
  fcmToken?: string | null
  imageUrl?: string | null
  isRead: boolean
  messageId?: string | null
  status: NotificationStatus
  title: string
  topic?: string | null
  type: NotificationType
  updatedAt: string
  userId?: string | null
}

export interface Presence {
  _id: string
  createdAt: string
  lastActivity?: string | null
  lastSeen: string
  status: UserStatus
  updatedAt: string
  userId: string
}

export interface ProductType {
  _id: string
  allowBackorder: boolean
  barcode?: string | null
  brand?: string | null
  category?: string | null
  cost: number
  createdAt: string
  description?: string | null
  image?: string | null
  images: string[]
  lastSoldAt?: string | null
  metadata: any
  minStockLevel: number
  name: string
  price: number
  quantity: number
  reorderPoint: number
  reorderQuantity: number
  revenue: number
  sku: string
  status: ProductStatus
  storeId: string
  supplier?: string | null
  tags: string[]
  taxable: boolean
  totalSold: number
  trackInventory: boolean
  unit: ProductUnit
  updatedAt: string
}

export interface Sale {
  _id: string
  amountPaid: number
  change: number
  createdAt: string
  customerEmail?: string | null
  customerName?: string | null
  customerPhone?: string | null
  discount: number
  invoiceNumber: string
  items: SaleItem[]
  notes?: string | null
  paymentMethod: PaymentMethod
  profit: number
  refundReason?: string | null
  refundedAt?: string | null
  refundedBy?: string | null
  refundedFromSaleId?: string | null
  status: SaleStatus
  storeId: string
  subtotal: number
  tax: number
  total: number
  totalCost: number
  updatedAt: string
  userId: string
  username: string
}

export interface SaleItem {
  discount: number
  productId: string
  productName: string
  quantity: number
  sku: string
  subtotal: number
  tax: number
  total: number
  unitCost: number
  unitPrice: number
}

export interface SalesReport {
  averageSaleAmount: number
  cancelledSales: number
  completedSales: number
  endDate: string
  refundedSales: number
  startDate: string
  storeId: string
  totalCost: number
  totalDiscount: number
  totalProfit: number
  totalRevenue: number
  totalSales: number
  totalTax: number
}

export interface StockAlertType {
  _id: string
  acknowledgedAt?: string | null
  acknowledgedBy?: string | null
  assignedTo: string[]
  createdAt: string
  currentQuantity: number
  metadata: any
  minStockLevel: number
  notificationSent: boolean
  notificationSentAt?: string | null
  productId: string
  resolutionNotes?: string | null
  resolvedAt?: string | null
  resolvedBy?: string | null
  status: StockAlertStatusEnum
  storeId: string
  type: StockAlertTypeEnum
  updatedAt: string
}

export interface StockMovementType {
  _id: string
  createdAt: string
  metadata: any
  newQuantity: number
  notes?: string | null
  previousQuantity: number
  productId: string
  quantity: number
  reason?: string | null
  referenceId?: string | null
  referenceType?: string | null
  status: StockMovementStatusEnum
  storeId: string
  totalCost: number
  type: StockMovementTypeEnum
  unitCost: number
  updatedAt: string
  userId: string
  username: string
}

export interface StoreSalesStats {
  lowStockProductsCount: number
  storeId: string
  storeName: string
  thisMonthRevenue: number
  thisMonthSales: number
  thisWeekRevenue: number
  thisWeekSales: number
  todayRevenue: number
  todaySales: number
}

export interface StoreType {
  _id: string
  address: string
  autoGenerateInvoiceNumbers: boolean
  businessHours: any
  city: string
  country: string
  createdAt: string
  currency: string
  defaultLowStockThreshold: number
  description?: string | null
  email?: string | null
  enableInventoryTracking: boolean
  enableLowStockAlerts: boolean
  enableTax: boolean
  invoicePrefix: string
  language: string
  logo?: string | null
  metadata: any
  name: string
  nextInvoiceNumber: number
  ownerId: string
  phoneNumber: string
  registrationNumber?: string | null
  status: StoreStatus
  subscriptionExpiresAt?: string | null
  subscriptionPlan: string
  taxId?: string | null
  taxName: string
  taxRate: number
  timezone?: string | null
  updatedAt: string
}

export interface TopSellingProduct {
  productId: string
  productName: string
  salesCount: number
  sku: string
  totalQuantitySold: number
  totalRevenue: number
}

export interface TypingStatus {
  chatWithUserId: string
  isTyping: boolean
  userId: string
}

export interface UnreadMessageCount {
  count: number
  userId: string
}

export interface UserType {
  _id: string
  address?: string | null
  assignedStores: string[]
  avatar?: string | null
  createdAt: string
  deviceTokens: string[]
  email: string
  fullName: string
  isActive: boolean
  lastLogin?: string | null
  permissions: string[]
  phoneNumber: string
  role: UserRole
  storeId?: string | null
  updatedAt: string
  username: string
}
