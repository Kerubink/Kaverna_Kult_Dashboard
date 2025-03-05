import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/pages/login/components/login-form"
import { Outlet } from "react-router-dom"

export default function LoginPage() {
  return (
    <div className="flex relative min-h-svh bg-[url('/banner.jpg')] bg-cover text-white flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="w-full h-full absolute z-10 bg-black/80 backdrop-blur-sm"></div>
      <div className="flex w-full max-w-sm relative z-50 flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6  items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Kaverna Analytics
        </a>
        <Outlet/>
      </div>
    </div>
  )
}
