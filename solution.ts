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

//! Problem 3

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  getDetails(): string {
    return `'Name: ${this.name}, Age: ${this.age}'`;
  }
}

//! Problem 4

type TBook = {
  title: string;
  rating: number;
};
const filterByRating = (value: TBook[]): TBook[] => {
  return value.filter((book) => book.rating >= 4.0);
};

//! Problem 5

type TUser = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};
const filterActiveUsers = (value: TUser[]): TUser[] => {
  return value.filter((user) => user.isActive);
};

//! Problem 6

interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}

const printBookDetails = (book: Book): void => {
  const { title, author, publishedYear, isAvailable } = book;
  console.log(
    `Title: ${title}, Author: ${author}, Published: ${publishedYear}, Available: ${
      isAvailable ? "Yes" : "No"
    }`
  );
};

//! Problem 7

const getUniqueValues = <T extends string | number, U extends string | number>(
  firstArray: T[],
  secondArray: U[]
): (T | U)[] => {
  const uniqueValues: (T | U)[] = [];

  const valueExists = (value: T | U): boolean => {
    for (let i = 0; i < uniqueValues.length; i++) {
      if (uniqueValues[i] === value) return true;
    }
    return false;
  };

  for (let i = 0; i < firstArray.length; i++) {
    if (!valueExists(firstArray[i])) {
      uniqueValues.push(firstArray[i]);
    }
  }

  for (let i = 0; i < secondArray.length; i++) {
    if (!valueExists(secondArray[i])) {
      uniqueValues.push(secondArray[i]);
    }
  }

  return uniqueValues;
};

//! Problem 8

type TProduct = {
  name: string;
  price: number;
  quantity: number;
  discount?: number;
};
const calculateTotalPrice = (products: TProduct[]): number => {
  if (!products.length) {
    return 0;
  }
  return products.reduce((total, product) => {
    const basePrice = product.price * product.quantity;

    const finalPrice = product.discount
      ? basePrice - (basePrice * product.discount) / 100
      : basePrice;
    return total + finalPrice;
  }, 0);
};
