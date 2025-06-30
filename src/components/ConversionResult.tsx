
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ConversionResultProps {
  title: string;
  subtitle: string;
  value: string;
  isSource: boolean;
  color: "blue" | "green" | "orange" | "purple";
}

const ConversionResult = ({ title, subtitle, value, isSource, color }: ConversionResultProps) => {
  const { toast } = useToast();

  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    purple: "from-purple-500 to-purple-600"
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "Copied!",
        description: `${title} value copied to clipboard`,
      });
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg ${
      isSource ? "ring-2 ring-blue-500 bg-blue-50/50" : "bg-white/80"
    } backdrop-blur-sm`}>
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${colorClasses[color]}`} />
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          {isSource && (
            <Badge variant="secondary" className="text-xs">
              Input
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-2">
            <p className="text-xl font-mono font-bold text-gray-800 break-all">
              {value || "—"}
            </p>
          </div>
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionResult;
