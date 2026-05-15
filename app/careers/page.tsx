import { getNavLinks, getSystemConfig } from "@/app/actions/cms"
import CareersPage from "./careers-page"

export const dynamic = "force-dynamic"

export default async function Careers() {
  const [navLinks, config] = await Promise.all([
    getNavLinks(),
    getSystemConfig()
  ])

  return <CareersPage navLinks={navLinks} config={config} />
}
