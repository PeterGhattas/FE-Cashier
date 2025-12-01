export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

/** Type of action performed */
export enum AuditAction {
  AlertAcknowledged = 'ALERT_ACKNOWLEDGED',
  AlertCreated = 'ALERT_CREATED',
  AlertResolved = 'ALERT_RESOLVED',
  Created = 'CREATED',
  Deleted = 'DELETED',
  FileDeleted = 'FILE_DELETED',
  FileDownloaded = 'FILE_DOWNLOADED',
  FileMetadataUpdated = 'FILE_METADATA_UPDATED',
  FileUploaded = 'FILE_UPLOADED',
  InventoryCreated = 'INVENTORY_CREATED',
  InventoryDeleted = 'INVENTORY_DELETED',
  InventoryLowStock = 'INVENTORY_LOW_STOCK',
  InventoryRestocked = 'INVENTORY_RESTOCKED',
  InventoryUpdated = 'INVENTORY_UPDATED',
  InvoiceCreated = 'INVOICE_CREATED',
  InvoiceDeleted = 'INVOICE_DELETED',
  InvoiceSent = 'INVOICE_SENT',
  InvoiceUpdated = 'INVOICE_UPDATED',
  Login = 'LOGIN',
  LoginFailed = 'LOGIN_FAILED',
  Logout = 'LOGOUT',
  MessageDeleted = 'MESSAGE_DELETED',
  MessageRead = 'MESSAGE_READ',
  MessageSent = 'MESSAGE_SENT',
  NotificationDeleted = 'NOTIFICATION_DELETED',
  NotificationRead = 'NOTIFICATION_READ',
  NotificationSent = 'NOTIFICATION_SENT',
  NotificationUpdated = 'NOTIFICATION_UPDATED',
  PasswordChanged = 'PASSWORD_CHANGED',
  PermissionDenied = 'PERMISSION_DENIED',
  ProductCreated = 'PRODUCT_CREATED',
  ProductDeleted = 'PRODUCT_DELETED',
  ProductUpdated = 'PRODUCT_UPDATED',
  Read = 'READ',
  Register = 'REGISTER',
  SaleCreated = 'SALE_CREATED',
  SaleDeleted = 'SALE_DELETED',
  SaleRefunded = 'SALE_REFUNDED',
  SaleUpdated = 'SALE_UPDATED',
  StoreCreated = 'STORE_CREATED',
  StoreDeleted = 'STORE_DELETED',
  StoreUpdated = 'STORE_UPDATED',
  StoreViewed = 'STORE_VIEWED',
  UnauthorizedAccess = 'UNAUTHORIZED_ACCESS',
  Updated = 'UPDATED',
  UserCreated = 'USER_CREATED',
  UserDeleted = 'USER_DELETED',
  UserPermissionsChanged = 'USER_PERMISSIONS_CHANGED',
  UserRoleChanged = 'USER_ROLE_CHANGED',
  UserUpdated = 'USER_UPDATED'
}

export type AuditFilterInput = {
  action?: InputMaybe<AuditAction>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  resource?: InputMaybe<AuditResource>;
  resourceId?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type AuditListResponse = {
  __typename?: 'AuditListResponse';
  audits: Array<AuditType>;
  page: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

/** Resource type affected by the action */
export enum AuditResource {
  Alert = 'ALERT',
  Auth = 'AUTH',
  Chat = 'CHAT',
  File = 'FILE',
  Inventory = 'INVENTORY',
  Invoice = 'INVOICE',
  Notification = 'NOTIFICATION',
  Product = 'PRODUCT',
  Report = 'REPORT',
  Sales = 'SALES',
  Store = 'STORE',
  System = 'SYSTEM',
  User = 'USER'
}

export type AuditType = {
  __typename?: 'AuditType';
  _id: Scalars['ID']['output'];
  action: AuditAction;
  createdAt: Scalars['DateTime']['output'];
  details: Scalars['JSON']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  ipAddress?: Maybe<Scalars['String']['output']>;
  resource: AuditResource;
  resourceId?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userAgent?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  user: UserType;
};

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  file?: Maybe<FileType>;
  fileId?: Maybe<Scalars['ID']['output']>;
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  receiverId: Scalars['ID']['output'];
  senderId: Scalars['ID']['output'];
  type: MessageType;
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateAuditInput = {
  action: AuditAction;
  details?: InputMaybe<Scalars['JSON']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  ipAddress?: InputMaybe<Scalars['String']['input']>;
  resource: AuditResource;
  resourceId?: InputMaybe<Scalars['String']['input']>;
  success?: InputMaybe<Scalars['Boolean']['input']>;
  userAgent?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProductInput = {
  allowBackorder?: InputMaybe<Scalars['Boolean']['input']>;
  barcode?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  cost: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  minStockLevel?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
  reorderPoint?: InputMaybe<Scalars['Int']['input']>;
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
  sku: Scalars['String']['input'];
  status?: InputMaybe<ProductStatus>;
  storeId: Scalars['ID']['input'];
  supplier?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  taxable?: InputMaybe<Scalars['Boolean']['input']>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
  unit?: InputMaybe<ProductUnit>;
};

export type CreateSaleInput = {
  amountPaid: Scalars['Float']['input'];
  customerEmail?: InputMaybe<Scalars['String']['input']>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  customerPhone?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  items: Array<SaleItemInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentMethod: PaymentMethod;
  storeId: Scalars['String']['input'];
};

export type CreateStockMovementInput = {
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  referenceId?: InputMaybe<Scalars['String']['input']>;
  referenceType?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['ID']['input'];
  type: StockMovementTypeEnum;
  unitCost?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateStoreInput = {
  address: Scalars['String']['input'];
  autoGenerateInvoiceNumbers?: InputMaybe<Scalars['Boolean']['input']>;
  businessHours?: InputMaybe<Scalars['JSON']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  defaultLowStockThreshold?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  enableInventoryTracking?: InputMaybe<Scalars['Boolean']['input']>;
  enableLowStockAlerts?: InputMaybe<Scalars['Boolean']['input']>;
  enableTax?: InputMaybe<Scalars['Boolean']['input']>;
  invoicePrefix?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  phoneNumber: Scalars['String']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<StoreStatus>;
  subscriptionPlan?: InputMaybe<Scalars['String']['input']>;
  taxId?: InputMaybe<Scalars['String']['input']>;
  taxName?: InputMaybe<Scalars['String']['input']>;
  taxRate?: InputMaybe<Scalars['Float']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  assignedStores?: InputMaybe<Array<Scalars['ID']['input']>>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  permissions?: InputMaybe<Array<Scalars['String']['input']>>;
  phoneNumber: Scalars['String']['input'];
  role: UserRole;
  storeId?: InputMaybe<Scalars['ID']['input']>;
  username: Scalars['String']['input'];
};

export type FileType = {
  __typename?: 'FileType';
  _id: Scalars['ID']['output'];
  cloudinaryPublicId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  filename: Scalars['String']['output'];
  format?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  mimetype: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  path?: Maybe<Scalars['String']['output']>;
  resourceType?: Maybe<Scalars['String']['output']>;
  secureUrl?: Maybe<Scalars['String']['output']>;
  size: Scalars['Int']['output'];
  storageType: StorageType;
  updatedAt: Scalars['DateTime']['output'];
  uploadedBy: UserType;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type LoginInput = {
  deviceToken?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LogoutInput = {
  deviceToken?: InputMaybe<Scalars['String']['input']>;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum MessageType {
  File = 'FILE',
  Image = 'IMAGE',
  Text = 'TEXT'
}

export type Mutation = {
  __typename?: 'Mutation';
  acknowledgeStockAlert: StockAlertType;
  activateStore: StoreType;
  assignStoresToSalesRep: UserType;
  createAudit: AuditType;
  createProduct: ProductType;
  createSale: Sale;
  createStockMovement: StockMovementType;
  createStore: StoreType;
  createUser: UserType;
  deleteAllMessages: Scalars['Int']['output'];
  deleteFile: Scalars['Boolean']['output'];
  deleteMessage: Scalars['Boolean']['output'];
  deleteNotification: Scalars['Boolean']['output'];
  deleteProduct: ProductType;
  deleteStore: StoreType;
  getNextInvoiceNumber: Scalars['String']['output'];
  login: AuthResponse;
  logout: LogoutResponse;
  markAllMessagesAsRead: Scalars['Int']['output'];
  markAllNotificationsAsRead: Scalars['Int']['output'];
  markMessageAsRead: Chat;
  markNotificationAsRead: Notification;
  refundSale: Sale;
  register: AuthResponse;
  registerDeviceToken: UserType;
  removeStoresFromSalesRep: UserType;
  removeUser: UserType;
  resolveStockAlert: StockAlertType;
  restockProduct: ProductType;
  sendMessage: Chat;
  sendNotification: Notification;
  setOffline: Presence;
  setOnline: Presence;
  setTyping: TypingStatus;
  subscribeToTopic: Scalars['Boolean']['output'];
  suspendStore: StoreType;
  unregisterDeviceToken: UserType;
  unsubscribeFromTopic: Scalars['Boolean']['output'];
  updateBusinessHours: StoreType;
  updateFileDescription: FileType;
  updateNotification: Notification;
  updateProduct: ProductType;
  updateSaleStatus: Sale;
  updateStore: StoreType;
  updateUser: UserType;
  updateUserStatus: Presence;
  uploadFile: FileType;
  uploadMultipleFiles: Array<FileType>;
};


export type MutationAcknowledgeStockAlertArgs = {
  alertId: Scalars['String']['input'];
};


export type MutationActivateStoreArgs = {
  id: Scalars['String']['input'];
};


export type MutationAssignStoresToSalesRepArgs = {
  salesRepId: Scalars['String']['input'];
  storeIds: Array<Scalars['String']['input']>;
};


export type MutationCreateAuditArgs = {
  createAuditInput: CreateAuditInput;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};


export type MutationCreateSaleArgs = {
  input: CreateSaleInput;
};


export type MutationCreateStockMovementArgs = {
  input: CreateStockMovementInput;
};


export type MutationCreateStoreArgs = {
  createStoreInput: CreateStoreInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteAllMessagesArgs = {
  otherUserId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteFileArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteStoreArgs = {
  id: Scalars['String']['input'];
};


export type MutationGetNextInvoiceNumberArgs = {
  storeId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationLogoutArgs = {
  logoutInput?: InputMaybe<LogoutInput>;
};


export type MutationMarkAllMessagesAsReadArgs = {
  otherUserId: Scalars['String']['input'];
};


export type MutationMarkMessageAsReadArgs = {
  id: Scalars['String']['input'];
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['String']['input'];
};


export type MutationRefundSaleArgs = {
  input: RefundSaleInput;
};


export type MutationRegisterArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRegisterDeviceTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRemoveStoresFromSalesRepArgs = {
  salesRepId: Scalars['String']['input'];
  storeIds: Array<Scalars['String']['input']>;
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationResolveStockAlertArgs = {
  alertId: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRestockProductArgs = {
  id: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationSendNotificationArgs = {
  input: SendNotificationInput;
};


export type MutationSetTypingArgs = {
  input: TypingIndicatorInput;
};


export type MutationSubscribeToTopicArgs = {
  token: Scalars['String']['input'];
  topic: Scalars['String']['input'];
};


export type MutationSuspendStoreArgs = {
  id: Scalars['String']['input'];
};


export type MutationUnregisterDeviceTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationUnsubscribeFromTopicArgs = {
  token: Scalars['String']['input'];
  topic: Scalars['String']['input'];
};


export type MutationUpdateBusinessHoursArgs = {
  businessHours: Scalars['JSON']['input'];
  storeId: Scalars['String']['input'];
};


export type MutationUpdateFileDescriptionArgs = {
  description: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationUpdateNotificationArgs = {
  id: Scalars['String']['input'];
  input: UpdateNotificationInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['String']['input'];
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateSaleStatusArgs = {
  input: UpdateSaleStatusInput;
};


export type MutationUpdateStoreArgs = {
  id: Scalars['String']['input'];
  updateStoreInput: UpdateStoreInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateUserStatusArgs = {
  input: UpdateStatusInput;
};


export type MutationUploadFileArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
};


export type MutationUploadMultipleFilesArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  files: Array<Scalars['Upload']['input']>;
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['ID']['output'];
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  fcmToken?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  isRead: Scalars['Boolean']['output'];
  messageId?: Maybe<Scalars['String']['output']>;
  status: NotificationStatus;
  title: Scalars['String']['output'];
  topic?: Maybe<Scalars['String']['output']>;
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['ID']['output']>;
};

export enum NotificationStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Read = 'READ',
  Sent = 'SENT'
}

export enum NotificationType {
  Error = 'ERROR',
  Info = 'INFO',
  Success = 'SUCCESS',
  Warning = 'WARNING'
}

export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Card = 'CARD',
  Cash = 'CASH',
  Credit = 'CREDIT',
  Mobile = 'MOBILE'
}

export type Presence = {
  __typename?: 'Presence';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  lastActivity?: Maybe<Scalars['DateTime']['output']>;
  lastSeen: Scalars['DateTime']['output'];
  status: UserStatus;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

/** Product status in the system */
export enum ProductStatus {
  Active = 'ACTIVE',
  Discontinued = 'DISCONTINUED',
  Inactive = 'INACTIVE',
  OutOfStock = 'OUT_OF_STOCK'
}

export type ProductType = {
  __typename?: 'ProductType';
  _id: Scalars['ID']['output'];
  allowBackorder: Scalars['Boolean']['output'];
  barcode?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  cost: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<FileType>;
  images: Array<Scalars['String']['output']>;
  lastSoldAt?: Maybe<Scalars['DateTime']['output']>;
  metadata: Scalars['JSON']['output'];
  minStockLevel: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  quantity: Scalars['Int']['output'];
  reorderPoint: Scalars['Int']['output'];
  reorderQuantity: Scalars['Int']['output'];
  revenue: Scalars['Float']['output'];
  sku: Scalars['String']['output'];
  status: ProductStatus;
  storeId: Scalars['ID']['output'];
  supplier?: Maybe<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  taxable: Scalars['Boolean']['output'];
  totalSold: Scalars['Int']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: ProductUnit;
  updatedAt: Scalars['DateTime']['output'];
};

/** Product unit of measurement */
export enum ProductUnit {
  Box = 'BOX',
  Dozen = 'DOZEN',
  Gram = 'GRAM',
  Kg = 'KG',
  Liter = 'LITER',
  Meter = 'METER',
  Pack = 'PACK',
  Piece = 'PIECE'
}

export type Query = {
  __typename?: 'Query';
  allFiles: Array<FileType>;
  audits: AuditListResponse;
  auditsByAction: Array<AuditType>;
  auditsByUserId: Array<AuditType>;
  file: FileType;
  getAllNotifications: Array<Notification>;
  getMessage: Chat;
  getMyMessages: Array<Chat>;
  getMyNotifications: Array<Notification>;
  getMyPresence?: Maybe<Presence>;
  getMySales: Array<Sale>;
  getNotification: Notification;
  getOnlineUsers: Array<Presence>;
  getSale: Sale;
  getSaleByInvoiceNumber: Sale;
  getSales: Array<Sale>;
  getSalesReport: SalesReport;
  getStoreSalesStats: StoreSalesStats;
  getTodaySales: Array<Sale>;
  getTopSellingProducts: Array<TopSellingProduct>;
  getUnreadMessageCount: Scalars['Int']['output'];
  getUnreadNotificationCount: Scalars['Int']['output'];
  getUserPresence?: Maybe<Presence>;
  getUsersPresence: Array<Presence>;
  lowStockProducts: Array<ProductType>;
  me: UserType;
  myAssignedStores: Array<StoreType>;
  myFiles: Array<FileType>;
  myLowStockProducts: Array<ProductType>;
  myOutOfStockProducts: Array<ProductType>;
  myProducts: Array<ProductType>;
  myProductsByCategory: Array<ProductType>;
  mySearchProductByCode?: Maybe<ProductType>;
  mySearchProducts: Array<ProductType>;
  myStockAlerts: Array<StockAlertType>;
  myStore?: Maybe<StoreType>;
  myTopSellingProducts: Array<ProductType>;
  outOfStockProducts: Array<ProductType>;
  product: ProductType;
  productStatistics: Scalars['JSON']['output'];
  productStockMovements: Array<StockMovementType>;
  products: Array<ProductType>;
  productsByCategory: Array<ProductType>;
  productsByStore: Array<ProductType>;
  salesRepsByStore: Array<UserType>;
  searchProductByCode?: Maybe<ProductType>;
  searchProducts: Array<ProductType>;
  searchStores: Array<StoreType>;
  stockAlerts: Array<StockAlertType>;
  stockMovements: Array<StockMovementType>;
  stockSummary: Scalars['JSON']['output'];
  store: StoreType;
  storeOwnerByStore?: Maybe<UserType>;
  storeStatistics: Scalars['JSON']['output'];
  storeStockAlerts: Array<StockAlertType>;
  storeStockMovements: Array<StockMovementType>;
  stores: Array<StoreType>;
  storesByStatus: Array<StoreType>;
  topSellingProducts: Array<ProductType>;
  user: UserType;
  users: Array<UserType>;
  usersByRole: Array<UserType>;
};


export type QueryAuditsArgs = {
  filter?: InputMaybe<AuditFilterInput>;
};


export type QueryAuditsByActionArgs = {
  action: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryAuditsByUserIdArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['String']['input'];
};


export type QueryFileArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAllNotificationsArgs = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<NotificationStatus>;
  type?: InputMaybe<NotificationType>;
};


export type QueryGetMessageArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetMyMessagesArgs = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  otherUserId?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetMyNotificationsArgs = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<NotificationStatus>;
  type?: InputMaybe<NotificationType>;
};


export type QueryGetNotificationArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSaleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetSaleByInvoiceNumberArgs = {
  invoiceNumber: Scalars['String']['input'];
};


export type QueryGetSalesArgs = {
  customerPhone?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SaleStatus>;
  storeId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSalesReportArgs = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  storeId: Scalars['ID']['input'];
};


export type QueryGetStoreSalesStatsArgs = {
  storeId: Scalars['ID']['input'];
};


export type QueryGetTodaySalesArgs = {
  storeId: Scalars['ID']['input'];
};


export type QueryGetTopSellingProductsArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['ID']['input'];
};


export type QueryGetUserPresenceArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUsersPresenceArgs = {
  userIds: Array<Scalars['String']['input']>;
};


export type QueryLowStockProductsArgs = {
  storeId: Scalars['String']['input'];
};


export type QueryMyProductsByCategoryArgs = {
  category: Scalars['String']['input'];
};


export type QueryMySearchProductByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryMySearchProductsArgs = {
  searchTerm: Scalars['String']['input'];
};


export type QueryMyTopSellingProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOutOfStockProductsArgs = {
  storeId: Scalars['String']['input'];
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductStatisticsArgs = {
  storeId: Scalars['String']['input'];
};


export type QueryProductStockMovementsArgs = {
  productId: Scalars['String']['input'];
};


export type QueryProductsByCategoryArgs = {
  category: Scalars['String']['input'];
  storeId: Scalars['String']['input'];
};


export type QueryProductsByStoreArgs = {
  storeId: Scalars['String']['input'];
};


export type QuerySalesRepsByStoreArgs = {
  storeId: Scalars['String']['input'];
};


export type QuerySearchProductByCodeArgs = {
  code: Scalars['String']['input'];
  storeId: Scalars['String']['input'];
};


export type QuerySearchProductsArgs = {
  name: Scalars['String']['input'];
  storeId: Scalars['String']['input'];
};


export type QuerySearchStoresArgs = {
  name: Scalars['String']['input'];
};


export type QueryStockSummaryArgs = {
  storeId: Scalars['String']['input'];
};


export type QueryStoreArgs = {
  id: Scalars['String']['input'];
};


export type QueryStoreOwnerByStoreArgs = {
  storeId: Scalars['String']['input'];
};


export type QueryStoreStatisticsArgs = {
  storeId: Scalars['String']['input'];
};


export type QueryStoreStockAlertsArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['String']['input'];
};


export type QueryStoreStockMovementsArgs = {
  storeId: Scalars['String']['input'];
};


export type QueryStoresByStatusArgs = {
  status: Scalars['String']['input'];
};


export type QueryTopSellingProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  storeId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersByRoleArgs = {
  role: Scalars['String']['input'];
};

export type RefundSaleInput = {
  reason: Scalars['String']['input'];
  saleId: Scalars['String']['input'];
};

export type Sale = {
  __typename?: 'Sale';
  _id: Scalars['ID']['output'];
  amountPaid: Scalars['Float']['output'];
  change: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  customerEmail?: Maybe<Scalars['String']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  customerPhone?: Maybe<Scalars['String']['output']>;
  discount: Scalars['Float']['output'];
  invoiceNumber: Scalars['String']['output'];
  items: Array<SaleItem>;
  notes?: Maybe<Scalars['String']['output']>;
  paymentMethod: PaymentMethod;
  profit: Scalars['Float']['output'];
  refundReason?: Maybe<Scalars['String']['output']>;
  refundedAt?: Maybe<Scalars['DateTime']['output']>;
  refundedBy?: Maybe<Scalars['ID']['output']>;
  refundedFromSaleId?: Maybe<Scalars['ID']['output']>;
  status: SaleStatus;
  storeId: Scalars['ID']['output'];
  subtotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalCost: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type SaleItem = {
  __typename?: 'SaleItem';
  discount: Scalars['Float']['output'];
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  sku: Scalars['String']['output'];
  subtotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  unitCost: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
};

export type SaleItemInput = {
  discount?: InputMaybe<Scalars['Float']['input']>;
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  unitPrice: Scalars['Float']['input'];
};

export enum SaleStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED'
}

export type SalesReport = {
  __typename?: 'SalesReport';
  averageSaleAmount: Scalars['Float']['output'];
  cancelledSales: Scalars['Int']['output'];
  completedSales: Scalars['Int']['output'];
  endDate: Scalars['String']['output'];
  refundedSales: Scalars['Int']['output'];
  startDate: Scalars['String']['output'];
  storeId: Scalars['String']['output'];
  totalCost: Scalars['Float']['output'];
  totalDiscount: Scalars['Float']['output'];
  totalProfit: Scalars['Float']['output'];
  totalRevenue: Scalars['Float']['output'];
  totalSales: Scalars['Int']['output'];
  totalTax: Scalars['Float']['output'];
};

export type SendMessageInput = {
  fileId?: InputMaybe<Scalars['ID']['input']>;
  message: Scalars['String']['input'];
  receiverId: Scalars['String']['input'];
  type?: InputMaybe<MessageType>;
};

export type SendNotificationInput = {
  body: Scalars['String']['input'];
  data?: InputMaybe<Scalars['String']['input']>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  fcmTokens?: InputMaybe<Array<Scalars['String']['input']>>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  topic?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<NotificationType>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Status of stock alert */
export enum StockAlertStatusEnum {
  Acknowledged = 'ACKNOWLEDGED',
  Ignored = 'IGNORED',
  Pending = 'PENDING',
  Resolved = 'RESOLVED'
}

export type StockAlertType = {
  __typename?: 'StockAlertType';
  _id: Scalars['ID']['output'];
  acknowledgedAt?: Maybe<Scalars['DateTime']['output']>;
  acknowledgedBy?: Maybe<Scalars['ID']['output']>;
  assignedTo: Array<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentQuantity: Scalars['Int']['output'];
  metadata: Scalars['JSON']['output'];
  minStockLevel: Scalars['Int']['output'];
  notificationSent: Scalars['Boolean']['output'];
  notificationSentAt?: Maybe<Scalars['DateTime']['output']>;
  productId: Scalars['ID']['output'];
  resolutionNotes?: Maybe<Scalars['String']['output']>;
  resolvedAt?: Maybe<Scalars['DateTime']['output']>;
  resolvedBy?: Maybe<Scalars['ID']['output']>;
  status: StockAlertStatusEnum;
  storeId: Scalars['ID']['output'];
  type: StockAlertTypeEnum;
  updatedAt: Scalars['DateTime']['output'];
};

/** Type of stock alert */
export enum StockAlertTypeEnum {
  Critical = 'CRITICAL',
  LowStock = 'LOW_STOCK',
  OutOfStock = 'OUT_OF_STOCK'
}

/** Status of stock movement */
export enum StockMovementStatusEnum {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING'
}

export type StockMovementType = {
  __typename?: 'StockMovementType';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  metadata: Scalars['JSON']['output'];
  newQuantity: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  previousQuantity: Scalars['Int']['output'];
  productId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  referenceId?: Maybe<Scalars['String']['output']>;
  referenceType?: Maybe<Scalars['String']['output']>;
  status: StockMovementStatusEnum;
  storeId: Scalars['ID']['output'];
  totalCost: Scalars['Float']['output'];
  type: StockMovementTypeEnum;
  unitCost: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

/** Type of stock movement */
export enum StockMovementTypeEnum {
  Adjustment = 'ADJUSTMENT',
  Damage = 'DAMAGE',
  InitialStock = 'INITIAL_STOCK',
  Manual = 'MANUAL',
  Restock = 'RESTOCK',
  Return = 'RETURN',
  Sale = 'SALE',
  Transfer = 'TRANSFER'
}

/** File storage type */
export enum StorageType {
  Cloudinary = 'CLOUDINARY',
  Local = 'LOCAL'
}

export type StoreSalesStats = {
  __typename?: 'StoreSalesStats';
  lowStockProductsCount: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  storeName: Scalars['String']['output'];
  thisMonthRevenue: Scalars['Float']['output'];
  thisMonthSales: Scalars['Int']['output'];
  thisWeekRevenue: Scalars['Float']['output'];
  thisWeekSales: Scalars['Int']['output'];
  todayRevenue: Scalars['Float']['output'];
  todaySales: Scalars['Int']['output'];
};

/** Store status in the system */
export enum StoreStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED'
}

export type StoreType = {
  __typename?: 'StoreType';
  _id: Scalars['ID']['output'];
  address: Scalars['String']['output'];
  autoGenerateInvoiceNumbers: Scalars['Boolean']['output'];
  businessHours: Scalars['JSON']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  defaultLowStockThreshold: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  enableInventoryTracking: Scalars['Boolean']['output'];
  enableLowStockAlerts: Scalars['Boolean']['output'];
  enableTax: Scalars['Boolean']['output'];
  invoicePrefix: Scalars['String']['output'];
  language: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  metadata: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
  nextInvoiceNumber: Scalars['Float']['output'];
  ownerId: Scalars['ID']['output'];
  phoneNumber: Scalars['String']['output'];
  registrationNumber?: Maybe<Scalars['String']['output']>;
  status: StoreStatus;
  subscriptionExpiresAt?: Maybe<Scalars['DateTime']['output']>;
  subscriptionPlan: Scalars['String']['output'];
  taxId?: Maybe<Scalars['String']['output']>;
  taxName: Scalars['String']['output'];
  taxRate: Scalars['Float']['output'];
  timezone?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageReceived: Chat;
  unreadMessageCountChanged: UnreadMessageCount;
  userStatusChanged: Presence;
  userTyping: TypingStatus;
};


export type SubscriptionMessageReceivedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionUnreadMessageCountChangedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionUserTypingArgs = {
  userId: Scalars['String']['input'];
};

export type TopSellingProduct = {
  __typename?: 'TopSellingProduct';
  productId: Scalars['String']['output'];
  productName: Scalars['String']['output'];
  salesCount: Scalars['Int']['output'];
  sku: Scalars['String']['output'];
  totalQuantitySold: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
};

export type TypingIndicatorInput = {
  chatWithUserId: Scalars['String']['input'];
  isTyping: Scalars['Boolean']['input'];
};

export type TypingStatus = {
  __typename?: 'TypingStatus';
  chatWithUserId: Scalars['ID']['output'];
  isTyping: Scalars['Boolean']['output'];
  userId: Scalars['ID']['output'];
};

export type UnreadMessageCount = {
  __typename?: 'UnreadMessageCount';
  count: Scalars['Int']['output'];
  userId: Scalars['ID']['output'];
};

export type UpdateNotificationInput = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<NotificationStatus>;
};

export type UpdateProductInput = {
  allowBackorder?: InputMaybe<Scalars['Boolean']['input']>;
  barcode?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  cost?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  minStockLevel?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  reorderPoint?: InputMaybe<Scalars['Int']['input']>;
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatus>;
  supplier?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  taxable?: InputMaybe<Scalars['Boolean']['input']>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
  unit?: InputMaybe<ProductUnit>;
};

export type UpdateSaleStatusInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  saleId: Scalars['String']['input'];
  status: SaleStatus;
};

export type UpdateStatusInput = {
  status: UserStatus;
};

export type UpdateStoreInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  autoGenerateInvoiceNumbers?: InputMaybe<Scalars['Boolean']['input']>;
  businessHours?: InputMaybe<Scalars['JSON']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  defaultLowStockThreshold?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  enableInventoryTracking?: InputMaybe<Scalars['Boolean']['input']>;
  enableLowStockAlerts?: InputMaybe<Scalars['Boolean']['input']>;
  enableTax?: InputMaybe<Scalars['Boolean']['input']>;
  invoicePrefix?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nextInvoiceNumber?: InputMaybe<Scalars['Float']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<StoreStatus>;
  subscriptionPlan?: InputMaybe<Scalars['String']['input']>;
  taxId?: InputMaybe<Scalars['String']['input']>;
  taxName?: InputMaybe<Scalars['String']['input']>;
  taxRate?: InputMaybe<Scalars['Float']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  assignedStores?: InputMaybe<Array<Scalars['ID']['input']>>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  permissions?: InputMaybe<Array<Scalars['String']['input']>>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  storeId?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** User role in the system */
export enum UserRole {
  Admin = 'ADMIN',
  SalesRep = 'SALES_REP',
  StoreOwner = 'STORE_OWNER'
}

export enum UserStatus {
  Away = 'AWAY',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type UserType = {
  __typename?: 'UserType';
  _id: Scalars['ID']['output'];
  address?: Maybe<Scalars['String']['output']>;
  assignedStores: Array<Scalars['ID']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deviceTokens: Array<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  permissions: Array<Scalars['String']['output']>;
  phoneNumber: Scalars['String']['output'];
  role: UserRole;
  storeId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};
