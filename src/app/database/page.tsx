import { redirect } from 'next/navigation'

export default function DatabaseRootPage() {
  // Redirect to weapons by default
  redirect('/database/weapons')
}
