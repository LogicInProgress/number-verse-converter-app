
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { convertNumber, isValidNumber, getNumberSystemName } from "@/utils/numberConversions";
import ConversionResult from "./ConversionResult";

type NumberSystem = "decimal" | "binary" | "octal" | "hexadecimal";

const NumberConverter = () => {
  const [inputSystem, setInputSystem] = useState<NumberSystem>("decimal");
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [conversions, setConversions] = useState({
    decimal: "",
    binary: "",
    octal: "",
    hexadecimal: ""
  });

  useEffect(() => {
    if (!inputValue.trim()) {
      setConversions({
        decimal: "",
        binary: "",
        octal: "",
        hexadecimal: ""
      });
      setIsValid(true);
      return;
    }

    const valid = isValidNumber(inputValue, inputSystem);
    setIsValid(valid);

    if (valid) {
      const results = {
        decimal: convertNumber(inputValue, inputSystem, "decimal"),
        binary: convertNumber(inputValue, inputSystem, "binary"),
        octal: convertNumber(inputValue, inputSystem, "octal"),
        hexadecimal: convertNumber(inputValue, inputSystem, "hexadecimal")
      };
      setConversions(results);
    } else {
      setConversions({
        decimal: "",
        binary: "",
        octal: "",
        hexadecimal: ""
      });
    }
  }, [inputValue, inputSystem]);

  const handleInputChange = (value: string) => {
    setInputValue(value.toUpperCase());
  };

  const allConversionResults = [
    {
      title: "Decimal",
      subtitle: "Base 10",
      value: conversions.decimal,
      isSource: inputSystem === "decimal",
      color: "blue" as const
    },
    {
      title: "Binary",
      subtitle: "Base 2",
      value: conversions.binary,
      isSource: inputSystem === "binary",
      color: "green" as const
    },
    {
      title: "Octal",
      subtitle: "Base 8",
      value: conversions.octal,
      isSource: inputSystem === "octal",
      color: "orange" as const
    },
    {
      title: "Hexadecimal",
      subtitle: "Base 16",
      value: conversions.hexadecimal,
      isSource: inputSystem === "hexadecimal",
      color: "purple" as const
    }
  ];

  // Filter out the selected input system from the results
  const conversionResults = allConversionResults.filter(result => !result.isSource);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Input Section */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
          <CardTitle className="text-2xl text-gray-800 font-light">Convert Number System</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Enter a number in any base and see its equivalent in all other bases</p>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="number-system" className="text-sm font-medium text-gray-700">
                Source Number System
              </Label>
              <Select value={inputSystem} onValueChange={(value: NumberSystem) => setInputSystem(value)}>
                <SelectTrigger className="w-full h-12 bg-white border-2 focus:border-blue-500 transition-colors">
                  <SelectValue placeholder="Select number system" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="decimal">Decimal (Base 10)</SelectItem>
                  <SelectItem value="binary">Binary (Base 2)</SelectItem>
                  <SelectItem value="octal">Octal (Base 8)</SelectItem>
                  <SelectItem value="hexadecimal">Hexadecimal (Base 16)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="number-input" className="text-sm font-medium text-gray-700">
                Enter Number
              </Label>
              <Input
                id="number-input"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={`Enter ${getNumberSystemName(inputSystem)} number...`}
                className={`h-12 bg-white border-2 transition-colors font-mono text-lg ${
                  !isValid ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                }`}
              />
              {!isValid && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  Invalid {getNumberSystemName(inputSystem)} number
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {inputValue.trim() && isValid && (
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
            <CardTitle className="text-xl text-gray-800 font-light">Conversion Results</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Your number converted to other number systems</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {conversionResults.map((result, index) => (
                <div key={result.title} className="p-6 hover:bg-gray-50/50 transition-colors">
                  <ConversionResult
                    title={result.title}
                    subtitle={result.subtitle}
                    value={result.value}
                    isSource={result.isSource}
                    color={result.color}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NumberConverter;
