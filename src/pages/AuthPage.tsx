

export default function AuthPage() {
  return (
    <div className="p-4 flex h-screen justify-center">
      <form className="flex flex-col gap-4 mt-12 w-1/4">
        <div className="text-4xl font-medium text-white text-center">Log in to Netman</div>
        <input type="email" placeholder="Input email" className="input w-full" />
        <input type="password" placeholder="Input password" className="input w-full" />
        <a href="" className="btn btn-primary">Log in</a>
      </form>
    </div>
  )
}
