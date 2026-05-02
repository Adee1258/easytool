import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ToolFaqsProps {
  toolName: string
}

// Tool-specific FAQs for better SEO
const toolFAQs: Record<string, { q: string; a: string }[]> = {
  "Merge PDF": [
    { q: "How do I merge PDF files online for free?", a: "Upload your PDF files to EasyTool's Merge PDF tool, arrange them in the desired order, and click 'Merge PDFs'. Your combined PDF will download instantly — no signup required." },
    { q: "Is there a limit to how many PDFs I can merge?", a: "No, you can merge as many PDF files as you need. EasyTool's PDF merger handles multiple files with no restrictions." },
    { q: "Will merging PDFs reduce quality?", a: "No. EasyTool merges PDFs without any quality loss. The output PDF maintains the original resolution and formatting of all input files." },
    { q: "Is my data safe when merging PDFs?", a: "Yes, 100% safe. All PDF merging happens in your browser — your files are never uploaded to any server." },
  ],
  "Compress PDF": [
    { q: "How much can I reduce PDF file size?", a: "EasyTool can reduce PDF file size by up to 80% depending on the content. PDFs with many images compress the most." },
    { q: "Will compressing a PDF reduce its quality?", a: "Our medium compression setting balances size and quality. You can choose low compression for maximum quality or high compression for smallest file size." },
    { q: "What is the maximum PDF size I can compress?", a: "EasyTool processes PDFs entirely in your browser, so there's no server-side size limit. Very large files may take longer depending on your device." },
    { q: "Can I compress a password-protected PDF?", a: "You'll need to unlock the PDF first using our Unlock PDF tool, then compress it." },
  ],
  "Image Compressor": [
    { q: "How do I compress an image without losing quality?", a: "Upload your image to EasyTool, set quality to 80-90%, and click Compress. This reduces file size significantly while keeping the image looking sharp." },
    { q: "What image formats can I compress?", a: "EasyTool supports JPG, JPEG, PNG, and WebP image compression." },
    { q: "How much can I reduce image file size?", a: "Typically 50-90% reduction depending on the original image. A 5MB photo can often be compressed to under 500KB." },
    { q: "Is image compression free?", a: "Yes, completely free. No signup, no watermark, no limits on EasyTool." },
  ],
  "Word Counter": [
    { q: "How do I count words in a text?", a: "Simply paste or type your text into EasyTool's Word Counter. It instantly shows word count, character count, sentence count, and estimated reading time." },
    { q: "Does the word counter count characters with spaces?", a: "Yes, EasyTool shows both characters with spaces and characters without spaces separately." },
    { q: "Can I use the word counter for essays and assignments?", a: "Absolutely. EasyTool's word counter is perfect for essays, blog posts, social media captions, and any writing that has a word limit." },
    { q: "Is the word counter accurate?", a: "Yes, EasyTool uses precise word counting algorithms that handle multiple spaces, line breaks, and special characters correctly." },
  ],
  "EMI Calculator": [
    { q: "How is EMI calculated?", a: "EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is principal, R is monthly interest rate, and N is number of months. EasyTool calculates this instantly." },
    { q: "Can I calculate home loan EMI?", a: "Yes, enter your home loan amount, interest rate, and tenure in EasyTool's EMI calculator to get your exact monthly payment." },
    { q: "What is a good EMI to salary ratio?", a: "Financial experts recommend keeping total EMIs below 40-50% of your monthly take-home salary." },
    { q: "Does EasyTool show the full amortization schedule?", a: "Yes, EasyTool's EMI calculator shows the complete payment schedule with principal and interest breakdown for each month." },
  ],
  "BMI Calculator": [
    { q: "What is a normal BMI range?", a: "BMI 18.5–24.9 is normal/healthy weight. Below 18.5 is underweight, 25–29.9 is overweight, and 30+ is obese." },
    { q: "How is BMI calculated?", a: "BMI = weight (kg) ÷ height² (m²). EasyTool calculates your BMI instantly in both metric and imperial units." },
    { q: "Is BMI accurate for everyone?", a: "BMI is a general screening tool. It may not be accurate for athletes (high muscle mass), elderly, or pregnant women. Consult a doctor for medical advice." },
    { q: "What is a healthy BMI for adults?", a: "For most adults, a BMI between 18.5 and 24.9 is considered healthy. Asian populations may use slightly different thresholds." },
  ],
  "QR Code Generator": [
    { q: "How do I create a QR code for free?", a: "Enter your URL, text, or data in EasyTool's QR Code Generator and click Generate. Download your QR code as PNG instantly — no signup needed." },
    { q: "Can I create a QR code for WiFi?", a: "Yes, EasyTool supports QR codes for URLs, plain text, email, phone numbers, and WiFi credentials." },
    { q: "Are QR codes generated by EasyTool permanent?", a: "Yes, static QR codes generated by EasyTool are permanent and never expire. They work as long as the destination URL is active." },
    { q: "What size should a QR code be for printing?", a: "For print, use at least 2×2 cm (0.8×0.8 inch). EasyTool generates high-resolution QR codes suitable for both digital and print use." },
  ],
  "Password Generator": [
    { q: "How do I generate a strong password?", a: "Use EasyTool's Password Generator with length 16+, including uppercase, lowercase, numbers, and symbols. Click Generate for an instant strong password." },
    { q: "Are generated passwords stored anywhere?", a: "No. Passwords are generated entirely in your browser and never sent to any server. 100% private." },
    { q: "What makes a password strong?", a: "A strong password is at least 12 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols." },
    { q: "How often should I change my passwords?", a: "Security experts recommend changing passwords every 3-6 months, or immediately if you suspect a breach. Use a unique password for each account." },
  ],
}

function getDefaultFAQs(toolName: string) {
  return [
    { q: `Is ${toolName} free to use?`, a: `Yes, EasyTool's ${toolName} is 100% free. No hidden charges, no subscription, no usage limits.` },
    { q: `Do I need to create an account to use ${toolName}?`, a: `No account needed. EasyTool gives you instant access to ${toolName} without any signup or registration.` },
    { q: `Is my data safe when using ${toolName}?`, a: `Absolutely. EasyTool processes everything in your browser. Your files and data never leave your device — 100% private and secure.` },
    { q: `Will there be a watermark on my output?`, a: `Never. EasyTool never adds watermarks to your output. You get clean, professional results every time.` },
    { q: `Does ${toolName} work on mobile?`, a: `Yes, EasyTool is fully responsive and works perfectly on smartphones, tablets, and desktop computers.` },
    { q: `How fast is ${toolName}?`, a: `Very fast. Since processing happens in your browser, results are typically instant or within a few seconds depending on file size.` },
  ]
}

export default function ToolFaqs({ toolName }: ToolFaqsProps) {
  const faqs = toolFAQs[toolName] || getDefaultFAQs(toolName)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h2 className="text-xl font-black mb-6">
        Frequently Asked Questions about {toolName}
      </h2>

      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border border-border/60 rounded-xl px-4 data-[state=open]:border-primary/30 data-[state=open]:bg-primary/3 transition-all"
          >
            <AccordionTrigger className="text-left font-semibold text-sm py-4 hover:no-underline hover:text-primary">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* JSON-LD for FAQ rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  )
}
