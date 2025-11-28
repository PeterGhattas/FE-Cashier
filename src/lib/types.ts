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

/**
 * User role in the system
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  SALES_REP = 'SALES_REP',
  STORE_OWNER = 'STORE_OWNER'
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

export interface LogoutResponse {
  message: string
  success: boolean
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
