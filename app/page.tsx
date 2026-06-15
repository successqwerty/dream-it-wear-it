import { Navbar } from '@/components/navbar'
import { OutfitGenerator } from '@/components/outfit-generator'
import { PenLine, Wand2, Shirt } from 'lucide-react'

const STEPS = [
  {
    icon: PenLine,
    title: 'Describe',
    body: 'Put your vision into words — the fabric, the color, the feeling.',
  },
  {
    icon: Wand2,
    title: 'Generate',
    body: 'Our AI fashion designer interprets your prompt into a real look.',
  },
  {
    icon: Shirt,
    title: 'Wear it',
    body: 'Save your favorite designs and bring them to life.',
  },
]

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* gradient blobs background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#8b5cf6]/25 blur-[110px]" />
        <div className="animate-blob absolute right-0 top-0 h-96 w-96 rounded-full bg-[#6366f1]/25 blur-[120px] [animation-delay:3s]" />
        <div className="animate-blob absolute left-1/3 top-[420px] h-72 w-72 rounded-full bg-[#d4af37]/15 blur-[120px] [animation-delay:6s]" />
        <div className="absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_70%_55%_at_50%_-5%,rgba(212,175,55,0.15),transparent_70%)]" />
      </div>
      <Navbar />

      <section className="relative mx-auto max-w-6xl px-5 pt-20 pb-12 text-center sm:px-8 sm:pt-28">
        {/* floating fashion decorations */}
        

        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary">
          AI Fashion Designer
        </p>
        <h1 className="mx-auto max-w-3xl font-serif text-5xl leading-[1.05] font-bold tracking-tight text-balance text-foreground sm:text-6xl md:text-7xl">
          Describe Your <span className="text-gold-gradient">Dream Outfit</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-[#c4b8e0] sm:text-lg">
          Turn a few words into a stunning, wearable look. Imagine it, type it,
          and let our AI bring your style to life in seconds.
        </p>

        <div className="mt-12">
          <OutfitGenerator />
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-5 pt-12 pb-28 sm:px-8"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="glass group relative overflow-hidden rounded-2xl p-6 text-center shadow-[0_0_0_1px_rgba(212,175,55,0.06),0_0_40px_-12px_rgba(139,92,246,0.4)] transition-all hover:shadow-[0_0_0_1px_rgba(212,175,55,0.25),0_0_50px_-10px_rgba(212,175,55,0.45)]"
            >
              <span aria-hidden="true" className="animate-sparkle absolute right-4 top-4 text-sm text-primary">✦</span>
              <span aria-hidden="true" className="animate-sparkle absolute left-5 top-10 text-xs text-[#a78bfa] [animation-delay:1s]">✧</span>
              <span className="bg-purple-gold mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-background shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-xl text-foreground">
                {`${i + 1}. ${step.title}`}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm">
        <p className="text-gold-gradient font-medium">
          Dream It, Wear It — Where Imagination Meets Fashion 👗
        </p>
      </footer>
    </main>
  )
}
