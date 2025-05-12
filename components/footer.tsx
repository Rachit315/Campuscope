import Link from "next/link"
import { Instagram, Twitter, Facebook, Github } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-space-grotesk">CampuScope</h3>
            <p className="text-muted-foreground">Where the real syllabus is drama.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/colleges" className="text-muted-foreground hover:text-foreground transition-colors">
                  Colleges
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-muted-foreground hover:text-foreground transition-colors">
                  Trending Reviews
                </Link>
              </li>
              <li>
                <Link href="/submit-review" className="text-muted-foreground hover:text-foreground transition-colors">
                  Submit a Review
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CampuScope. All tea, no cap.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
