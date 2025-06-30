
import NumberConverter from "@/components/NumberConverter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-3xl font-light text-gray-900 mb-6 tracking-tight">
            Number System
            <span className="text-blue-600 font-medium"> Converter</span>
          </h1>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>
        
        <NumberConverter />
      </div>
    </div>
  );
};

export default Index;
