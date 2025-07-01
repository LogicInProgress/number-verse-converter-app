
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
        </main>
      </div>
    </div>
  );
};

export default Index;
