import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileArchiveIcon as FileZip } from "lucide-react"

export default function ShopifyAssets() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001A45] to-[#002855] text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Inter']">QoreAi Shopify Assets</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-['Inter']">
            Ready-to-use assets for your Shopify store at Qoreai.co
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <Card className="bg-white/5 backdrop-blur border-none overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-['Inter']">Complete Logo Package</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex justify-center items-center h-64 bg-[#003DA5] rounded-lg mb-6">
                <Image src="/logo-primary.png" alt="QoreAi Logo - Primary" width={400} height={200} />
              </div>
              <div className="text-center">
                <p className="text-gray-300 mb-6 font-['Inter']">
                  Download all logo variations, favicons, and brand assets in a single ZIP file for your Shopify store.
                </p>
                <Button className="bg-[#FFC72C] hover:bg-[#E6B428] text-[#002855] font-['Rubik'] font-semibold">
                  <FileZip className="mr-2 h-4 w-4" /> Download ZIP Package
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur border-none overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-['Inter']">Shopify Implementation Guide</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 font-['Inter']">1. Upload Logo</h3>
                  <p className="text-gray-300 font-['Inter']">
                    Go to Online Store → Themes → Customize → Header section → Logo
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 font-['Inter']">2. Set Favicon</h3>
                  <p className="text-gray-300 font-['Inter']">
                    Go to Online Store → Themes → Customize → Theme Settings → Favicon
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 font-['Inter']">3. Update Colors</h3>
                  <p className="text-gray-300 font-['Inter']">
                    Go to Online Store → Themes → Customize → Theme Settings → Colors
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 font-['Inter']">4. Set Typography</h3>
                  <p className="text-gray-300 font-['Inter']">
                    Go to Online Store → Themes → Customize → Theme Settings → Typography
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white/5 backdrop-blur rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 font-['Inter']">Individual Assets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Primary Logo", file: "logo-primary.png" },
              { name: "Dark Logo", file: "logo-dark.png" },
              { name: "Icon Only", file: "logo-icon.png" },
              { name: "Favicon", file: "favicon.ico" },
              { name: "Apple Touch Icon", file: "apple-touch-icon.png" },
              { name: "Social Media Banner", file: "social-banner.png" },
              { name: "Email Header", file: "email-header.png" },
              { name: "Footer Logo", file: "footer-logo.png" },
            ].map((asset, index) => (
              <Card key={index} className="bg-white/10 border-none">
                <CardContent className="p-4">
                  <div className="flex justify-center items-center h-32 bg-[#003DA5]/50 rounded-lg mb-4">
                    <div className="text-center p-4">
                      <p className="font-bold font-['Inter']">{asset.name}</p>
                      <p className="text-xs text-gray-300 font-mono">{asset.file}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#FFC72C] text-[#FFC72C] hover:bg-[#FFC72C]/10"
                  >
                    <Download className="mr-2 h-3 w-3" /> Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
