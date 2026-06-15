import { Sparkles } from 'lucide-react'

export function Navbar() {
  return (
    <header className="glass sticky top-0 z-50 w-full border-x-0 border-t-0 border-b border-white/10 bg-background/40">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <span className="bg-gold-orange flex h-8 w-8 items-center justify-center rounded-full text-background shadow-[0_0_18px_rgba(212,175,55,0.5)]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-gold-gradient font-serif text-lg tracking-tight sm:text-xl">
            Dream It, Wear It
          </span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-muted-foreground sm:flex">
          <a href="#create" className="transition-colors hover:text-foreground">
            Create
          </a>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-foreground"
          >
            How it works
          </a>
        </div>
      </nav>
    </header>
  )
}
