export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
          <div className="rounded-full bg-card px-3 py-2 text-sm font-semibold text-primary shadow-sm">
            M
          </div>
        </div>

        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}