
export type NumberSystem = "decimal" | "binary" | "octal" | "hexadecimal";

export const isValidNumber = (value: string, system: NumberSystem): boolean => {
  if (!value.trim()) return false;
  
  const cleanValue = value.trim().toUpperCase();
  
  switch (system) {
    case "decimal":
      return /^[0-9]+$/.test(cleanValue);
    case "binary":
      return /^[01]+$/.test(cleanValue);
    case "octal":
      return /^[0-7]+$/.test(cleanValue);
    case "hexadecimal":
      return /^[0-9A-F]+$/.test(cleanValue);
    default:
      return false;
  }
};

export const convertNumber = (value: string, fromSystem: NumberSystem, toSystem: NumberSystem): string => {
  if (!value.trim() || !isValidNumber(value, fromSystem)) {
    return "";
  }

  const cleanValue = value.trim().toUpperCase();
  
  // First convert to decimal
  let decimalValue: number;
  
  switch (fromSystem) {
    case "decimal":
      decimalValue = parseInt(cleanValue, 10);
      break;
    case "binary":
      decimalValue = parseInt(cleanValue, 2);
      break;
    case "octal":
      decimalValue = parseInt(cleanValue, 8);
      break;
    case "hexadecimal":
      decimalValue = parseInt(cleanValue, 16);
      break;
    default:
      return "";
  }
  
  // Then convert from decimal to target system
  switch (toSystem) {
    case "decimal":
      return decimalValue.toString(10);
    case "binary":
      return decimalValue.toString(2);
    case "octal":
      return decimalValue.toString(8);
    case "hexadecimal":
      return decimalValue.toString(16).toUpperCase();
    default:
      return "";
  }
};

export const getNumberSystemName = (system: NumberSystem): string => {
  switch (system) {
    case "decimal":
      return "decimal";
    case "binary":
      return "binary";
    case "octal":
      return "octal";
    case "hexadecimal":
      return "hexadecimal";
    default:
      return "";
  }
};
