## 1. What are some differences between interfaces and types in TypeScript?

Interface মূলত এমন একটি কাঠামো বা নকশা, যার মাধ্যমে বলা হয় একটি অবজেক্টের মধ্যে কী কী প্রপার্টি থাকবে এবং সেগুলোর টাইপ কী হবে। এর ব্যবহার খুব সহজ।
Interface সাধারণত অবজেক্ট, ক্লাস এবং ফাংশনের গঠন বোঝাতে ব্যবহার করা হয়।

Interface-এর সবচেয়ে বড় সুবিধা হলো, একই নামের Interface বারবার ঘোষণা করলে TypeScript সেগুলোকে একত্র করে দেয়। একে interface merging বলা হয়।

Type দিয়ে শুধু অবজেক্ট নয়, বরং primitive (string, number), union, intersection, function type, tuple—সবকিছুই তৈরি করা যায়। একবার একটি Type নির্ধারণ করে দিলে একই নামে আরেকটি type বানানো যাবে না।

একটি গুরুত্বপূর্ণ পার্থক্য হলো:
Interface ব্যবহারে extend করা সহজ। Type দিয়েও extend করা যায়, কিন্তু syntax আলাদা এবং সব ক্ষেত্রে নয়।

interface দিয়ে অবজেক্ট নির্ধারণ:

interface User {
name: string;
age: number;
}

// extend করা
interface Employee extends User {
salary: number;
}

type দিয়ে extend করা:

type User = {
name: string;
age: number;
};

type Employee = User & {
salary: number;
};

দুটো একই কাজ করে, কিন্তু interface কোড পড়তে একটু বেশি পরিষ্কার মনে হয়।

## 2. What is the use of the keyof keyword in TypeScript? Provide an example.

keyof কোনো অবজেক্ট টাইপের সব property নামকে আলাদা টাইপ হিসেবে বের করে আনে। সাধারণভাবে কীভাবে ব্যবহার হয়:

যদি আপনি একটি অবজেক্টের নাম দেন Person, তাহলে keyof Person মানে Person অবজেক্টে যে যে key আছে, সেই key গুলির name নিয়ে একটি union টাইপ তৈরি হবে।
এর ফলে এমন function বানানো যায় যেগুলো ভুল key নিলে কম্পাইল টাইমেই error দেখাবে। এতে কোড মজবুত হয় এবং run-time bug কমে।

উদাহরণ:

type Person = {
name: string;
age: number;
address: string;
};

type K = keyof Person;
// K হলো "name" | "age" | "address"

একটি function যেন অবজেক্টের বাইরে কোনো key কাউকে নিতে না পারে, সেটা keyof দিয়ে নিশ্চিত করা যায়:

function printValue(obj: Person, key: keyof Person) {
console.log(obj[key]);
}

যদি কেউ ভুল করে "phone" দেয়, TypeScript তখনই জানিয়ে দেবে এটি অবজেক্টে নেই।

## 3. Explain the difference between any, unknown, and never types in TypeScript.

any হলো এমন একটি টাইপ যেখানে একদম কোনো নিয়ম বা বাঁধা নেই। আপনি চাইলে সংখ্যা, লেখা, boolean, object—যা ইচ্ছা দিতে পারেন। কোনো চেক হবে না। কিন্তু এটি খুব অনিরাপদ, কারণ ভুল হলে কোড ভেঙে যেতে পারে, আর TypeScript ধরতেও পারবে না।

unknown হলো any-এর মতোই সবকিছু গ্রহণ করতে পারে, কিন্তু পরে ব্যবহার করতে গেলে আগে টাইপ চেক করতে হয়। ফলে ভুল হওয়ার সম্ভাবনা কমে যায়। unknown ব্যবহার করলে TypeScript আপনাকে বাধ্য করে সেফ কোড লিখতে।

never হলো এমন একটি টাইপ যা কখনোই কোনো মান ধারণ করতে পারে না। দুটি জায়গায় এটি ব্যবহৃত হয়:
১=> এমন ফাংশন যা কখনোই return করে না (যেমন: error ছোড়ে, বা infinite loop)
২=> এমন union টাইপ যা যুক্ত হলে আর কোনো মান থাকে না (যেমন: string & number)

উদাহরণগুলো:

any ==>

let a: any = "hello";
a = 25;
a = false;

unknown ==>

let b: unknown = "hi";

if (typeof b === "string") {
console.log(b.toUpperCase());
}

never ==>

function alwaysFail(msg: string): never {
throw new Error(msg);
}

## 4. What is the use of enums in TypeScript? Provide an example of a numeric and string enum.

enum হলো এমন একটি উপায় যা দিয়ে কিছু নির্দিষ্ট মানকে অর্থবহ নাম দেওয়া যায়। এতে কোড পড়া সহজ হয় এবং magic number বা অদ্ভুত string ব্যবহার করতে হয় না।

numeric enum ==>
যদি কিছু status থাকে যেগুলিকে সংখ্যা দিয়ে চিহ্নিত করতে চান, তাহলে enum ভালো।

enum Status {
Pending, // 0
Shipped, // 1
Delivered // 2
}

let s: Status = Status.Shipped;

string enum ==>
যদি status গুলো মানুষ পড়তে পারে এমন string দিয়ে রাখতে চান, তাহলে string enum ব্যবহার করা হয়।

enum Role {
Admin = "admin",
User = "user",
Guest = "guest"
}

const r: Role = Role.Admin;

enum-এর বড় সুবিধা হলো কোড জুড়ে একই নাম ব্যবহার করলে বানান ভুল বা mismatch হওয়ার সুযোগ থাকে না।

## 5. Provide an example of using union and intersection types in TypeScript.

Union type মানে দুটি বা তার বেশি টাইপের যে কোনো একটি হবে।
এটি তখন কাজে লাগে, যখন চাই কোনো ভ্যারিয়েবল কখনো string আবার কখনো number হবে।

Union type ==>

let id: string | number;

id = "120";
id = 120;

Intersection টাইপ মানে দুটি টাইপকে মিলিয়ে এমন একটি টাইপ তৈরি করা, যেখানে উভয়েরই প্রপার্টি থাকবে।

Intersection type ==>

type Person = { name: string };
type Employee = { employeeId: number };

type Staff = Person & Employee;

//Staff এর মধ্যে name এবং employeeId দুটোই থাকবে

intersection তখন ব্যবহার হয়, যখন দুটি আলাদা টাইপের বৈশিষ্ট্য একত্র করে একটি বড় টাইপ বানাতে হয়।
