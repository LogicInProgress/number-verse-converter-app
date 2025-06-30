
import { Copy, ArrowRight } from "lucide-react";
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
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500"
  };

  const textColorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    orange: "text-orange-600",
    purple: "text-purple-600"
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
    <div className="flex items-center justify-between group">
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${colorClasses[color]}`} />
          <div>
            <h3 className={`font-semibold ${textColorClasses[color]}`}>{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        
        {!isSource && (
          <ArrowRight className="w-4 h-4 text-gray-400 ml-4" />
        )}
      </div>

      <div className="flex items-center space-x-3">
        <div className="text-right">
          <p className="text-lg font-mono font-bold text-gray-800 break-all">
            {value || "—"}
          </p>
        </div>
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Copy className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConversionResult;
