/**
 * File utility functions for handling local and Cloudinary files
 */

export type StorageType = "local" | "cloudinary"
export type ResourceType = "image" | "video" | "raw" | "auto"

export interface FileMetadata {
  _id: string
  filename: string
  originalName: string
  mimetype: string
  size: number
  url?: string | null
  path?: string | null
  secureUrl?: string | null
  cloudinaryPublicId?: string | null
  storageType?: string | null
  resourceType?: string | null
  format?: string | null
  width?: number | null
  height?: number | null
}

/**
 * Determines if a file is stored in Cloudinary
 */
export function isCloudinaryFile(file: FileMetadata): boolean {
  return (
    file.storageType === "cloudinary" ||
    !!file.cloudinaryPublicId ||
    !!file.secureUrl
  )
}

/**
 * Determines if a file is stored locally
 */
export function isLocalFile(file: FileMetadata): boolean {
  return !isCloudinaryFile(file)
}

/**
 * Converts a local file path to a URL
 * Handles both absolute paths and relative paths
 */
function convertLocalPathToUrl(path: string): string {
  // If it's already a URL, return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  // If it's an absolute Windows or Unix path, extract the filename
  // and construct a URL to the backend
  const isAbsolutePath = path.includes('\\') || path.startsWith('/')

  if (isAbsolutePath) {
    // Extract filename from path (works for both Windows and Unix paths)
    const filename = path.split(/[/\\]/).pop() || path

    // Get backend URL from GraphQL URL
    const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql'
    const backendUrl = graphqlUrl.replace('/graphql', '')

    // Return URL to backend uploads endpoint
    return `${backendUrl}/uploads/${filename}`
  }

  // If it's already a relative path, assume it's correct
  return path
}

/**
 * Gets the appropriate URL for a file based on storage type
 * Priority: secureUrl > url > path
 */
export function getFileUrl(file: FileMetadata): string {
  // For Cloudinary files, prefer secureUrl
  if (isCloudinaryFile(file)) {
    return file.secureUrl || file.url || file.path || ""
  }

  // For local files, convert path to URL
  const localPath = file.path || file.url || ""
  return localPath ? convertLocalPathToUrl(localPath) : ""
}

/**
 * Determines if a file is an image based on mimetype or resourceType
 */
export function isImageFile(file: FileMetadata): boolean {
  return (
    file.mimetype?.startsWith("image/") ||
    file.resourceType === "image"
  )
}

/**
 * Determines if a file is a video
 */
export function isVideoFile(file: FileMetadata): boolean {
  return (
    file.mimetype?.startsWith("video/") ||
    file.resourceType === "video"
  )
}

/**
 * Determines if a file is audio
 */
export function isAudioFile(file: FileMetadata): boolean {
  return file.mimetype?.startsWith("audio/")
}

/**
 * Gets the file extension from filename or format
 */
export function getFileExtension(file: FileMetadata): string {
  if (file.format) {
    return file.format.toLowerCase()
  }

  const filename = file.originalName || file.filename
  const parts = filename.split(".")
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ""
}

/**
 * Generates a Cloudinary transformation URL
 * @param file - File metadata
 * @param transformations - Cloudinary transformations (e.g., "w_300,h_300,c_fill")
 */
export function getCloudinaryTransformUrl(
  file: FileMetadata,
  transformations: string
): string | null {
  if (!isCloudinaryFile(file) || !file.secureUrl) {
    return null
  }

  // Cloudinary URLs have format: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/...
  const urlParts = file.secureUrl.split("/upload/")
  if (urlParts.length !== 2) {
    return file.secureUrl
  }

  return `${urlParts[0]}/upload/${transformations}/${urlParts[1]}`
}

/**
 * Gets optimized image dimensions for Next.js Image component
 */
export function getImageDimensions(file: FileMetadata): {
  width: number
  height: number
} | null {
  if (!isImageFile(file)) {
    return null
  }

  if (file.width && file.height) {
    return {
      width: file.width,
      height: file.height,
    }
  }

  // Return default dimensions if not available
  return {
    width: 800,
    height: 600,
  }
}

/**
 * Formats file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`
}

/**
 * Gets a color class based on file type for badges
 */
export function getFileTypeColor(mimetype: string): string {
  if (mimetype.startsWith("image/"))
    return "bg-blue-500/10 text-blue-500 border-blue-500/20"
  if (mimetype.startsWith("video/"))
    return "bg-purple-500/10 text-purple-500 border-purple-500/20"
  if (mimetype.startsWith("audio/"))
    return "bg-pink-500/10 text-pink-500 border-pink-500/20"
  if (mimetype.includes("pdf"))
    return "bg-red-500/10 text-red-500 border-red-500/20"
  if (mimetype.includes("document") || mimetype.includes("word"))
    return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
  if (mimetype.includes("sheet") || mimetype.includes("excel"))
    return "bg-green-500/10 text-green-500 border-green-500/20"

  return "bg-gray-500/10 text-gray-500 border-gray-500/20"
}

/**
 * Checks if the file can be previewed in the browser
 */
export function isPreviewable(file: FileMetadata): boolean {
  return (
    isImageFile(file) ||
    isVideoFile(file) ||
    isAudioFile(file) ||
    file.mimetype?.includes("pdf")
  )
}