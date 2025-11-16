//! Problem 1

const formatValue = (
  value: string | number | boolean
): string | number | boolean => {
  const result =
    typeof value === "string"
      ? value.toUpperCase()
      : typeof value === "number"
      ? value * 10
      : typeof value === "boolean"
      ? !value
      : "Value is not string, number or boolean type";

  return result;
};

