import MemeGenerator from "@/components/MemeGenerator/MemeGenerator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Create Your Perfect Meme</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a meme template, add your custom text, adjust the position, color, and size, then download your
            creation in seconds!
          </p>
        </div>
        <MemeGenerator />
      </div>
    </main>
  )
}

