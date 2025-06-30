
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, Divide } from "lucide-react";

type NumberSystem = "decimal" | "binary" | "octal" | "hexadecimal";

interface ConversionExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  fromSystem: NumberSystem;
  inputValue: string;
  conversions: {
    decimal: string;
    binary: string;
    octal: string;
    hexadecimal: string;
  };
}

const ConversionExplanationModal = ({ 
  isOpen, 
  onClose, 
  fromSystem, 
  inputValue, 
  conversions 
}: ConversionExplanationModalProps) => {
  const getBase = (system: NumberSystem): number => {
    switch (system) {
      case "decimal": return 10;
      case "binary": return 2;
      case "octal": return 8;
      case "hexadecimal": return 16;
      default: return 10;
    }
  };

  const getSystemName = (system: NumberSystem): string => {
    switch (system) {
      case "decimal": return "Decimal";
      case "binary": return "Binary";
      case "octal": return "Octal";
      case "hexadecimal": return "Hexadecimal";
      default: return "";
    }
  };

  const convertToDecimalSteps = (value: string, system: NumberSystem) => {
    if (system === "decimal") return null;
    
    const base = getBase(system);
    const digits = value.split('').reverse();
    const steps = [];
    
    for (let i = 0; i < digits.length; i++) {
      const digit = digits[i];
      const digitValue = system === "hexadecimal" ? 
        (isNaN(parseInt(digit)) ? digit.charCodeAt(0) - 55 : parseInt(digit)) : 
        parseInt(digit);
      const power = i;
      const calculation = digitValue * Math.pow(base, power);
      
      steps.push({
        digit,
        digitValue,
        power,
        calculation,
        position: digits.length - 1 - i
      });
    }
    
    return steps;
  };

  const convertFromDecimalSteps = (decimalValue: number, toSystem: NumberSystem) => {
    if (toSystem === "decimal") return null;
    
    const base = getBase(toSystem);
    const steps = [];
    let currentValue = decimalValue;
    
    while (currentValue > 0) {
      const remainder = currentValue % base;
      const quotient = Math.floor(currentValue / base);
      const remainderChar = remainder < 10 ? remainder.toString() : String.fromCharCode(remainder + 55);
      
      steps.push({
        dividend: currentValue,
        divisor: base,
        quotient,
        remainder,
        remainderChar
      });
      
      currentValue = quotient;
    }
    
    return steps.reverse();
  };

  const decimalValue = parseInt(conversions.decimal);
  const toDecimalSteps = convertToDecimalSteps(inputValue, fromSystem);
  
  const conversionTargets = [
    { system: "binary" as NumberSystem, color: "bg-green-100 text-green-800" },
    { system: "octal" as NumberSystem, color: "bg-orange-100 text-orange-800" },
    { system: "hexadecimal" as NumberSystem, color: "bg-purple-100 text-purple-800" }
  ].filter(target => target.system !== fromSystem);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-gray-800 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            How Number System Conversion Works
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Overview */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">Conversion Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">
                Converting from <Badge className="bg-blue-100 text-blue-800">{getSystemName(fromSystem)} (Base {getBase(fromSystem)})</Badge> 
                {" "}to other number systems involves two main steps:
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span>Convert to decimal (if not already decimal)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span>Convert from decimal to target system</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Convert to Decimal */}
          {toDecimalSteps && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Convert {getSystemName(fromSystem)} to Decimal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Each digit is multiplied by the base raised to its position power:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg font-mono">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-lg">{inputValue}</span>
                    <Badge className="bg-gray-200 text-gray-700">Base {getBase(fromSystem)}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {toDecimalSteps.map((step, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="w-8 text-center">{step.digit}</span>
                        <span className="text-gray-500">×</span>
                        <span>{getBase(fromSystem)}<sup>{step.power}</sup></span>
                        <span className="text-gray-500">=</span>
                        <span>{step.digitValue} × {Math.pow(getBase(fromSystem), step.power)}</span>
                        <span className="text-gray-500">=</span>
                        <span className="font-bold text-green-600">{step.calculation}</span>
                      </div>
                    ))}
                    
                    <div className="border-t pt-2 mt-3">
                      <div className="flex items-center gap-2 font-bold">
                        <span>Total:</span>
                        <span>{toDecimalSteps.map(s => s.calculation).join(' + ')}</span>
                        <span className="text-gray-500">=</span>
                        <span className="text-blue-600 text-lg">{decimalValue}</span>
                        <Badge className="bg-blue-100 text-blue-800">Base 10</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Convert to Other Systems */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Convert Decimal to Other Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                Use repeated division by the target base, collecting remainders:
              </p>
              
              {conversionTargets.map(({ system, color }) => {
                const steps = convertFromDecimalSteps(decimalValue, system);
                if (!steps) return null;
                
                return (
                  <div key={system} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className={color}>{getSystemName(system)} (Base {getBase(system)})</Badge>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="font-mono font-bold">{conversions[system]}</span>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded font-mono text-sm space-y-1">
                      {steps.reverse().map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <span className="w-12">{step.dividend}</span>
                          <Divide className="w-3 h-3 text-gray-400" />
                          <span className="w-8">{step.divisor}</span>
                          <span className="text-gray-500">=</span>
                          <span className="w-12">{step.quotient}</span>
                          <span className="text-gray-500">remainder</span>
                          <span className="font-bold text-purple-600">{step.remainderChar}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2">
                        <span className="text-gray-600">Read remainders bottom to top: </span>
                        <span className="font-bold text-lg">{conversions[system]}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConversionExplanationModal;
