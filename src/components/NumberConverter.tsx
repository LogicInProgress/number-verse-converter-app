
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

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">Input Number</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number-system">Number System</Label>
              <Select value={inputSystem} onValueChange={(value: NumberSystem) => setInputSystem(value)}>
                <SelectTrigger className="w-full">
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
            
            <div className="space-y-2">
              <Label htmlFor="number-input">Enter Number</Label>
              <Input
                id="number-input"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={`Enter ${getNumberSystemName(inputSystem)} number...`}
                className={`transition-colors ${
                  !isValid ? "border-red-500 focus:border-red-500" : "border-gray-300"
                }`}
              />
              {!isValid && (
                <p className="text-sm text-red-500">
                  Invalid {getNumberSystemName(inputSystem)} number
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {inputValue.trim() && isValid && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ConversionResult
            title="Decimal"
            subtitle="Base 10"
            value={conversions.decimal}
            isSource={inputSystem === "decimal"}
            color="blue"
          />
          <ConversionResult
            title="Binary"
            subtitle="Base 2"
            value={conversions.binary}
            isSource={inputSystem === "binary"}
            color="green"
          />
          <ConversionResult
            title="Octal"
            subtitle="Base 8"
            value={conversions.octal}
            isSource={inputSystem === "octal"}
            color="orange"
          />
          <ConversionResult
            title="Hexadecimal"
            subtitle="Base 16"
            value={conversions.hexadecimal}
            isSource={inputSystem === "hexadecimal"}
            color="purple"
          />
        </div>
      )}
    </div>
  );
};

export default NumberConverter;
