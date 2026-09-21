import { LoaderCircle } from "lucide-react"

const Loading = () => {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="animate-spin text-primary"><LoaderCircle /></div>
    </main>
  )
}

export default Loading
