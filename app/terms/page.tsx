import { ArrowLeft, FileText, Shield, AlertTriangle, Scale, Globe } from "lucide-react"
import Link from "next/link"

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using CampuScope.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center">
            <FileText className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="font-bold mb-2">Agreement</h3>
            <p className="text-muted-foreground text-sm">By using our service, you agree to these terms in full.</p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center">
            <Shield className="h-12 w-12 text-indigo-500 mb-4" />
            <h3 className="font-bold mb-2">Protection</h3>
            <p className="text-muted-foreground text-sm">
              These terms protect both you and us, establishing responsibilities.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center">
            <Scale className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="font-bold mb-2">Fair Use</h3>
            <p className="text-muted-foreground text-sm">Guidelines for appropriate use of our platform.</p>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              By accessing or using CampuScope, you agree to be bound by these Terms of Service and all applicable laws
              and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing
              this site.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">2. Use License</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Permission is granted to temporarily access the materials on CampuScope's website for personal,
              non-commercial use only. This is the grant of a license, not a transfer of title, and under this license
              you may not:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on CampuScope's website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated
              by CampuScope at any time.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">3. User Accounts</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              When you create an account with us, you guarantee that the information you provide is accurate, complete,
              and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate
              termination of your account on the service.
            </p>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your account and password, including but not
              limited to the restriction of access to your computer and/or account. You agree to accept responsibility
              for any and all activities or actions that occur under your account and/or password.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">4. User Content</h2>
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Content Guidelines</h3>
                <p className="text-muted-foreground mb-4">
                  Our service allows you to post, link, store, share and otherwise make available certain information,
                  text, graphics, videos, or other material. You are responsible for the content you post on CampuScope.
                </p>
                <p className="text-muted-foreground">
                  By posting content on CampuScope, you warrant and represent that:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-2">
                  <li>
                    The content is yours or you have the right to use it and grant us the rights and license as provided
                    in these Terms
                  </li>
                  <li>
                    The content does not violate the privacy rights, publicity rights, copyrights, contract rights or
                    any other rights of any person or entity
                  </li>
                  <li>
                    The content does not contain material that is false, intentionally misleading, defamatory, obscene,
                    harassing, threatening, or otherwise unlawful
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">5. Prohibited Activities</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You may not access or use the service for any purpose other than that for which we make the service
              available. The service may not be used in connection with any commercial endeavors except those that are
              specifically endorsed or approved by us.
            </p>
            <p className="text-muted-foreground">As a user of the service, you agree not to:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                Systematically retrieve data or other content from the service to create or compile, directly or
                indirectly, a collection, compilation, database, or directory
              </li>
              <li>
                Make any unauthorized use of the service, including collecting usernames and/or email addresses of users
                by electronic or other means
              </li>
              <li>Use the service to advertise or offer to sell goods and services</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the service</li>
              <li>Engage in unauthorized framing of or linking to the service</li>
              <li>
                Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account
                information
              </li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct</li>
              <li>Engage in any automated use of the system, such as using scripts to send comments or messages</li>
              <li>
                Interfere with, disrupt, or create an undue burden on the service or the networks or services connected
                to the service
              </li>
              <li>Attempt to impersonate another user or person or use the username of another user</li>
              <li>Use any information obtained from the service in order to harass, abuse, or harm another person</li>
              <li>
                Use the service as part of any effort to compete with us or otherwise use the service and/or the content
                for any revenue-generating endeavor or commercial enterprise
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">6. Intellectual Property</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The service and its original content (excluding content provided by users), features, and functionality
              are and will remain the exclusive property of CampuScope and its licensors. The service is protected by
              copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and
              trade dress may not be used in connection with any product or service without the prior written consent of
              CampuScope.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">7. Disclaimer of Warranties</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The service is provided on an "AS IS" and "AS AVAILABLE" basis. CampuScope expressly disclaims all
              warranties of any kind, whether express or implied, including but not limited to the implied warranties of
              merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p className="text-muted-foreground">CampuScope makes no warranty that:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>The service will meet your requirements</li>
              <li>The service will be uninterrupted, timely, secure, or error-free</li>
              <li>The results that may be obtained from the use of the service will be accurate or reliable</li>
              <li>
                The quality of any products, services, information, or other material purchased or obtained by you
                through the service will meet your expectations
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">8. Limitation of Liability</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              In no event shall CampuScope, nor its directors, employees, partners, agents, suppliers, or affiliates, be
              liable for any indirect, incidental, special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Your access to or use of or inability to access or use the service</li>
              <li>Any conduct or content of any third party on the service</li>
              <li>Any content obtained from the service</li>
              <li>Unauthorized access, use or alteration of your transmissions or content</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">9. Governing Law</h2>
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start">
              <Globe className="h-6 w-6 text-indigo-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Jurisdiction</h3>
                <p className="text-muted-foreground">
                  These Terms shall be governed and construed in accordance with the laws of the United States, without
                  regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms
                  will not be considered a waiver of those rights.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">10. Changes to Terms</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material we will provide at least 30 days' notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="text-muted-foreground">
              By continuing to access or use our service after any revisions become effective, you agree to be bound by
              the revised terms. If you do not agree to the new terms, you are no longer authorized to use the service.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">11. Contact Us</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">If you have any questions about these Terms, please contact us:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>By email: terms@campuscope.com</li>
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
