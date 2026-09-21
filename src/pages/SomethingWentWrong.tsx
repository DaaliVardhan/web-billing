const SomethingWentWrong = () => {
  return (
    <main className="flex flex-col h-screen w-screen items-center justify-center">
      <div className="text-3xl text-primary">Oops Something went wrong</div>
      <p>
        Back to{" "}
        <a href="/" className="text-primary underline">
          Home
        </a>
      </p>
    </main>
  )
}

export default SomethingWentWrong
