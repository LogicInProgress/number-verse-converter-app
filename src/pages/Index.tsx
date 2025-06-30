
import NumberConverter from "@/components/NumberConverter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Number System Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert numbers between decimal, binary, octal, and hexadecimal systems with ease
          </p>
        </div>
        
        <NumberConverter />
      </div>
    </div>
  );
};

export default Index;
