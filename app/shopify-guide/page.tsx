import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShopifyGuide() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#0A3D62] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Image
            src="/logo-transparent.png"
            alt="QoreAi Modern Logo"
            width={300}
            height={150}
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-bold">QoreAi Logo Implementation Guide</h1>
          <p className="mt-4 max-w-2xl mx-auto">
            How to upload and implement your new QoreAi logo on your Shopify store
          </p>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0A3D62] mb-4">Logo Package Contents</h2>
            <p className="mb-6 text-[#4A4A4A]">Your QoreAi logo package includes the following files:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#4A4A4A]">
              <li>
                <strong>qoreai-logo-transparent.png</strong> - Main logo with transparent background
              </li>
              <li>
                <strong>qoreai-logo-transparent.svg</strong> - Vector version for highest quality
              </li>
              <li>
                <strong>qoreai-logo-dark.png</strong> - Logo optimized for dark backgrounds
              </li>
              <li>
                <strong>qoreai-logo-light.png</strong> - Logo optimized for light backgrounds
              </li>
              <li>
                <strong>qoreai-icon.png</strong> - Just the "Q" icon for favicon and small applications
              </li>
              <li>
                <strong>qoreai-brand-guidelines.pdf</strong> - Complete brand guidelines
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0A3D62] mb-4">Uploading to Shopify</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Step 1: Access Your Shopify Admin</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#4A4A4A]">
                    Log in to your Shopify admin panel at{" "}
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">https://qoreai.myshopify.com/admin</span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Navigate to Theme Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#4A4A4A]">
                    Go to <strong>Online Store</strong> → <strong>Themes</strong> → <strong>Customize</strong> on your
                    active theme
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 3: Update Logo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#4A4A4A] mb-4">
                    In the theme editor, find the <strong>Header</strong> section and look for the logo upload option.
                    Click on <strong>Select Image</strong> and upload your <strong>qoreai-logo-transparent.png</strong>{" "}
                    file.
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-[#4A4A4A]">
                      <strong>Pro Tip:</strong> For best results, use the transparent PNG version on most Shopify
                      themes. The SVG version may not be supported by all themes.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 4: Update Favicon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#4A4A4A]">
                    In the theme editor, go to <strong>Theme Settings</strong> → <strong>Favicon</strong> and upload the{" "}
                    <strong>qoreai-icon.png</strong> file.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 5: Save Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#4A4A4A]">
                    Click <strong>Save</strong> to apply your new logo to your Shopify store.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0A3D62] mb-4">Best Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Maintain Clear Space</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#4A4A4A]">
                    Always maintain adequate clear space around the logo to ensure visibility and impact.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Size Appropriately</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#4A4A4A]">
                    Don't make the logo too small. Ensure it's clearly visible on all devices.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Use Correct Version</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#4A4A4A]">
                    Use the dark version on light backgrounds and the light version on dark backgrounds.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Don't Distort</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#4A4A4A]">Never stretch, compress, or otherwise distort the logo proportions.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <div className="bg-[#ECECEC] p-6 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-[#0A3D62] mb-4">Need Help?</h2>
              <p className="text-[#4A4A4A] mb-6">
                If you need assistance implementing your new logo or have questions about your brand identity, our team
                is here to help.
              </p>
              <Button className="bg-[#0A3D62] hover:bg-[#1B4F72] text-white">Contact Support</Button>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[#0A3D62] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} QoreAi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
