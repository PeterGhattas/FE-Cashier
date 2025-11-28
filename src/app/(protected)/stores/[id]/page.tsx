import { StoreProfile } from "@/components/stores/store-profile"

interface StorePageProps {
  params: Promise<{ id: string }>
}

export default async function StorePage({ params }: StorePageProps) {
  const { id } = await params

  return <StoreProfile storeId={id} />
}