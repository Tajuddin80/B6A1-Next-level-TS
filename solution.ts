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

//! Problem 2

const getLength = (value: string | unknown[]): number => {
  const result =
    typeof value === "string"
      ? value.length
      : Array.isArray(value)
      ? value.length
      : 0;
  return result;
};

