export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Optimize Your Resume for ATS",
    slug: "how-to-optimize-your-resume-for-ats",
    excerpt: "Learn the best practices to optimize your resume and pass Applicant Tracking Systems (ATS) with EasyToolify.",
    content: `
      <p>In today's competitive job market, having a great resume isn't enough - it also needs to pass through Applicant Tracking Systems (ATS) that most companies use to screen candidates. Our Resume ATS Checker tool helps you make sure your resume is ATS-friendly.</p>
      
      <h2>Why ATS Optimization Matters</h2>
      <p>ATS software scans resumes for keywords and relevant information before a human ever sees it. Here's why optimizing is crucial:</p>
      <ul>
        <li><strong>Get Noticed:</strong> 75% of resumes are rejected by ATS before reaching a recruiter.</li>
        <li><strong>Save Time:</strong> Focus on applications that have a real chance of being seen.</li>
        <li><strong>Stand Out:</strong> Show that you understand modern hiring processes.</li>
      </ul>

      <h2>How to Use EasyToolify Resume ATS Checker</h2>
      <p>Our tool is designed to be simple, fast, and completely free. Here is how you can use it:</p>
      <ol>
        <li>Prepare your resume in PDF or Word format.</li>
        <li>Go to <a href="/tools/resume-ats-checker">EasyToolify Resume ATS Checker</a>.</li>
        <li>Upload your resume and let our tool analyze it.</li>
        <li>Review the suggestions and optimize your resume accordingly.</li>
        <li>Download your optimized resume and start applying!</li>
      </ol>

      <h2>Key ATS Optimization Tips</h2>
      <p>Always use standard fonts, avoid tables and images, and include relevant keywords from the job description. Never lie on your resume, but make sure your skills and experience are clearly highlighted.</p>
    `,
    date: "2024-04-25",
    author: "EasyToolify Team",
    category: "Tutorials",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
  },
  {
    id: "2",
    title: "Top 10 Essential Online Tools for Content Creators",
    slug: "top-10-essential-online-tools-for-content-creators",
    excerpt: "Discover the must-have free online tools that will save you time and improve your content quality.",
    content: `
      <p>In the digital age, content creators need a variety of tools to stay ahead. From image compression to SEO optimization, having the right toolkit can make a huge difference.</p>
      
      <h2>1. Image Compressor</h2>
      <p>Large image files can slow down your website and consume storage. Using an <a href="/tools/image-compressor">Image Compressor</a> ensures your images are web-ready without losing quality.</p>

      <h2>2. Meta Tag Generator</h2>
      <p>SEO is crucial for being discovered. A <a href="/tools/meta-tag-generator">Meta Tag Generator</a> helps you create the perfect titles and descriptions for search engines.</p>

      <h2>3. Word Counter</h2>
      <p>Whether you're writing a blog post or a social media caption, keeping track of your word count is essential for engagement.</p>

      <h2>4. QR Code Generator</h2>
      <p>QR codes are back! Use them to link to your portfolio, social media, or latest product.</p>
    `,
    date: "2024-04-28",
    author: "EasyToolify Team",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
  },
  {
    id: "3",
    title: "Mastering PDF Management: 5 Essential PDF Tools",
    slug: "mastering-pdf-management-5-essential-pdf-tools",
    excerpt: "Handling PDFs doesn't have to be hard. Learn how to merge, split, and compress PDFs like a pro.",
    content: `
      <p>PDFs are the standard for professional documents, but they can be notoriously difficult to edit or manage without expensive software. EasyToolify provides a suite of PDF tools to make your life easier.</p>
      
      <h2>1. Merge PDF</h2>
      <p>Need to combine several reports into one? Our <a href="/tools/merge-pdf">Merge PDF</a> tool lets you upload multiple files and combine them in seconds.</p>

      <h2>2. Compress PDF</h2>
      <p>Large PDF files can be a pain to email. Use <a href="/tools/compress-pdf">Compress PDF</a> to reduce the file size while keeping the text sharp and readable.</p>

      <h2>3. PDF to Word</h2>
      <p>Need to edit the content of a PDF? Convert it back to a Word document using our high-fidelity <a href="/tools/pdf-to-word">PDF to Word</a> converter.</p>

      <h2>4. Unlock PDF</h2>
      <p>Forgot the password to your own document? Or need to remove restrictions from a secured PDF? Our <a href="/tools/unlock-pdf">Unlock PDF</a> tool is here to help.</p>

      <h2>5. PDF Sign</h2>
      <p>No need to print, sign, and scan anymore. Add your digital signature directly to any PDF document with our <a href="/tools/sign-pdf">Sign PDF</a> tool.</p>
    `,
    date: "2024-04-29",
    author: "EasyToolify Team",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
  },
];
