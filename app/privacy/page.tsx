import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            At CampuScope, we prioritize your privacy and are committed to protecting your personal information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center">
            <Shield className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="font-bold mb-2">Privacy First</h3>
            <p className="text-muted-foreground text-sm">
              Your privacy is our priority. We design our systems with privacy at the core.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center">
            <Eye className="h-12 w-12 text-indigo-500 mb-4" />
            <h3 className="font-bold mb-2">Transparency</h3>
            <p className="text-muted-foreground text-sm">We're clear about what data we collect and how we use it.</p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center">
            <Lock className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="font-bold mb-2">Secure by Design</h3>
            <p className="text-muted-foreground text-sm">
              We implement strong security measures to protect your information.
            </p>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">1. Anonymous Reviews</h2>
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start">
              <UserCheck className="h-6 w-6 text-purple-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Your Identity is Protected</h3>
                <p className="text-muted-foreground mb-4">
                  All reviews on CampuScope are anonymous by default. We do not display your name, email, or any
                  identifying information alongside your reviews.
                </p>
                <p className="text-muted-foreground">
                  We use an anonymous avatar system that generates random avatars for each review, ensuring your
                  identity remains private while still allowing users to follow review patterns.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">2. Information We Collect</h2>
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start">
              <Database className="h-6 w-6 text-indigo-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Limited Data Collection</h3>
                <p className="text-muted-foreground mb-4">
                  We collect only the minimum information necessary to provide our services:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Account information (email and password) for authentication purposes</li>
                  <li>Basic profile information that you choose to provide</li>
                  <li>Review content and ratings that you submit</li>
                  <li>Usage data to improve our services</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We do not collect unnecessary personal information, and we do not track your browsing habits outside
                  of our platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">4. Data Security</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The security of your data is important to us, but remember that no method of transmission over the
              Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
              means to protect your personal information, we cannot guarantee its absolute security.
            </p>
            <p className="text-muted-foreground">We implement several security measures to protect your information:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>All passwords are encrypted and never stored in plain text</li>
              <li>We use secure HTTPS connections for all data transfers</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information by our staff</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">5. Your Data Rights</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">You have the following rights regarding your data:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>The right to access the personal information we hold about you</li>
              <li>The right to request correction of your personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to request restriction of processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to object to processing of your personal information</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise any of these rights, please contact us using the information provided at the end of this
              policy.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">6. Cookies and Tracking</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to track activity on our service and hold certain
              information. Cookies are files with a small amount of data which may include an anonymous unique
              identifier.
            </p>
            <p className="text-muted-foreground">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>To maintain your authenticated session</li>
              <li>To remember your preferences and settings</li>
              <li>To analyze how you use our service to improve it</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">7. Changes to This Privacy Policy</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
            </p>
            <p className="text-muted-foreground">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
              are effective when they are posted on this page.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">8. Contact Us</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>By email: privacy@campuscope.com</li>
              <li>By visiting the contact page on our website</li>
            </ul>
          </div>
        </section>

        <div className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          <p>Last updated: April 28, 2025</p>
        </div>
      </div>
    </div>
  )
}
