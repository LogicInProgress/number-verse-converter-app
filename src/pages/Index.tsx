
import NumberConverter from "@/components/NumberConverter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Number System <span className="text-blue-600 font-medium"> Converter</span>
          </h1>
          <p className="text-lg text-gray-600 mb-4 max-w-3xl mx-auto">
            Convert numbers between binary, decimal, octal, and hexadecimal systems instantly
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Binary to Decimal</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Decimal to Binary</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Hexadecimal Converter</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Octal Converter</span>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </header>
        
        <main>
          <NumberConverter />
          
          <!-- <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Why Use Our Number System Converter?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">Instant Conversion</h3>
                <p className="text-gray-600">
                  Convert between binary (base 2), decimal (base 10), octal (base 8), and hexadecimal (base 16) 
                  number systems in real-time as you type.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-green-600 mb-3">Step-by-Step Explanations</h3>
                <p className="text-gray-600">
                  Understand how number system conversion works with detailed mathematical explanations 
                  and visual step-by-step breakdowns.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-orange-600 mb-3">Copy to Clipboard</h3>
                <p className="text-gray-600">
                  Easily copy converted values to your clipboard with a single click. Perfect for 
                  programming and development work.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Free & No Registration</h3>
                <p className="text-gray-600">
                  Completely free to use with no registration required. Works in all modern browsers 
                  and is mobile-friendly.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Understanding Number Systems
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Binary (Base 2)</h3>
                <p className="text-gray-600">
                  Uses only digits 0 and 1. Fundamental to computer systems and digital electronics. 
                  Each position represents a power of 2.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-2">Decimal (Base 10)</h3>
                <p className="text-gray-600">
                  The standard number system we use daily. Uses digits 0-9, with each position 
                  representing a power of 10.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-2">Octal (Base 8)</h3>
                <p className="text-gray-600">
                  Uses digits 0-7. Commonly used in computing as a shorthand for binary, 
                  since each octal digit represents exactly 3 binary digits.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">Hexadecimal (Base 16)</h3>
                <p className="text-gray-600">
                  Uses digits 0-9 and letters A-F. Widely used in programming and web development 
                  for colors, memory addresses, and compact binary representation.
                </p>
              </div>
            </div>
          </section> -->
        </main>
      </div>
    </div>
  );
};

export default Index;
