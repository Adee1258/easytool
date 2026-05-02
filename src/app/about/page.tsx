import { Hammer, ShieldCheck, Zap, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          About <span className="text-primary">EasyToolify</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We are on a mission to provide the world's most accessible, fast, and secure online tools for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            EasyToolify was born out of a simple observation: the internet is full of tools, but many are cluttered with ads, 
            require signups, or compromise user privacy. We wanted to build something better.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Founded in 2026, we've grown from a small collection of text utilities to a comprehensive suite of 48+ tools, 
            including high-speed video downloaders and advanced PDF managers.
          </p>
        </div>
        <div className="bg-primary/5 rounded-3xl p-8 flex items-center justify-center">
          <Hammer className="h-32 w-32 text-primary opacity-20" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
        <div className="text-center space-y-3">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h3 className="font-bold text-xl">Privacy First</h3>
          <p className="text-sm text-muted-foreground">Most tools process data in your browser. We never see your files.</p>
        </div>
        <div className="text-center space-y-3">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
            <Zap className="h-8 w-8" />
          </div>
          <h3 className="font-bold text-xl">High Speed</h3>
          <p className="text-sm text-muted-foreground">Optimized for performance. No more waiting for slow conversions.</p>
        </div>
        <div className="text-center space-y-3">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
            <Globe className="h-8 w-8" />
          </div>
          <h3 className="font-bold text-xl">100% Free</h3>
          <p className="text-sm text-muted-foreground">No subscriptions, no hidden fees. All tools are free for everyone.</p>
        </div>
      </div>

      <div className="bg-muted/30 rounded-3xl p-8 border text-center">
        <h2 className="text-2xl font-bold mb-4">Want to get in touch?</h2>
        <p className="text-muted-foreground mb-6">
          We love hearing from our users. Whether you have a feature request or just want to say hi, 
          we're all ears.
        </p>
        <a href="/contact">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:scale-105 transition-all">
            Contact Us
          </button>
        </a>
      </div>
    </div>
  )
}
