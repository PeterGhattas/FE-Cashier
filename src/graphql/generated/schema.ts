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

export type Mutation = {
  __typename?: 'Mutation';
  assignStoresToSalesRep: UserType;
  createAudit: AuditType;
  createUser: UserType;
  login: AuthResponse;
  logout: LogoutResponse;
  register: AuthResponse;
  registerDeviceToken: UserType;
  removeStoresFromSalesRep: UserType;
  removeUser: UserType;
  unregisterDeviceToken: UserType;
  updateUser: UserType;
};


export type MutationAssignStoresToSalesRepArgs = {
  salesRepId: Scalars['String']['input'];
  storeIds: Array<Scalars['String']['input']>;
};


export type MutationCreateAuditArgs = {
  createAuditInput: CreateAuditInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationLogoutArgs = {
  logoutInput?: InputMaybe<LogoutInput>;
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


export type MutationUnregisterDeviceTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  audits: AuditListResponse;
  auditsByAction: Array<AuditType>;
  auditsByUserId: Array<AuditType>;
  me: UserType;
  salesRepsByStore: Array<UserType>;
  storeOwnerByStore?: Maybe<UserType>;
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


export type QuerySalesRepsByStoreArgs = {
  storeId: Scalars['String']['input'];
};


export type QueryStoreOwnerByStoreArgs = {
  storeId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersByRoleArgs = {
  role: Scalars['String']['input'];
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
