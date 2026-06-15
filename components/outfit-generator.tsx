'use client'

import { useState } from 'react'
import { ArrowRight, Loader2, Sparkles, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SUGGESTIONS = [
  'A flowing emerald silk evening gown with gold embroidery',
  'Minimalist oversized beige trench coat with wide-leg trousers',
  'Avant-garde structured blazer in midnight blue velvet',
  'Bohemian linen summer dress with hand-painted florals',
]

export function OutfitGenerator() {
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    if (!description.trim() || isLoading) return
    setIsLoading(true)
    setError(null)
    setImage(null)

    try {
      const res = await fetch('/api/generate-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setImage(data.image)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="create" className="w-full">
      {/* Input card */}
      <div className="mx-auto max-w-2xl">
        <div className="glow-ring glass rounded-2xl p-2">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                handleGenerate()
              }
            }}
            placeholder="Describe your dream outfit in detail — fabrics, colors, mood, occasion..."
            rows={4}
            className="w-full resize-none rounded-lg bg-transparent px-4 py-3 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
            aria-label="Outfit description"
          />
          <div className="flex items-center justify-between gap-3 px-2 pb-1">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Press ⌘ + Enter to generate
            </span>
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !description.trim()}
              size="lg"
              className="btn-gold-glow bg-gold-orange ml-auto gap-2 border-0 font-semibold text-background hover:opacity-95"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Designing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Generate My Outfit
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setDescription(s)}
              disabled={isLoading}
              className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="mx-auto mt-12 max-w-md">
        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-center text-sm text-foreground"
          >
            {error}
          </p>
        )}

        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-2 border-dashed border-primary/40 bg-card/40">
          {isLoading ? (
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <div className="animate-shimmer absolute inset-0" aria-hidden="true" />
              <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
              <p className="text-sm">Stitching your look together...</p>
            </div>
          ) : image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image || '/placeholder.svg'}
              alt={`AI-generated outfit: ${description}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center text-muted-foreground">
              <span className="bg-purple-gold flex h-12 w-12 items-center justify-center rounded-xl text-background shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                <ImageIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm text-balance">
                Your masterpiece will appear here ✨
              </p>
            </div>
          )}
        </div>

        {image && !isLoading && (
          <a
            href={image}
            download="dream-outfit.png"
            className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Download look
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  )
}
