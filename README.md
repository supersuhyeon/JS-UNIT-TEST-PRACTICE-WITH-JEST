## UNIT TEST with JEST

### Test code features

0. Code written once must be maintained forever (cleancode)
1. Do not test internal implementation details (test with only API from the user's point of view)
2. Increase reusability
3. Strict separation from distributed code
4. Documentation through test code (Anyone should understand at a glance)

### Structure of test

0. BeforeEach,BeforeAll,AfterEach,AfterAll - will be executed before/after tesing
1. Given(arrage) - prepare the data
2. When(act) - execute the data
3. Then(assert) - check the result value

```js
const ProductService = require("../ProductService copy");
const StubProductClient = require("./StubProductClient");

describe("ProductService - Stub", () => {
  let productService;

  //it is executed before testing
  beforeEach(() => {
    //Given (prepare the data)
    productService = new ProductService(new StubProductClient());
  });

  it("should filter out only available items", async () => {
    //When (execute the data)
    const items = await productService.fetchAvailableItems();
    //Then (check the result value)
    expect(items.length).toBe(1);
    expect(items).toEqual([{ item: "milk", available: true }]);
  });
});
```

### Principles of Good Testing

- **FIRST**<br>

0. Fast - Make your test code run fast<br>
   ex) Reduce network dependency by using fetch, axios ...etc. It's better to use mock or stub <br>
1. Isolated - Verification with minimal units<br>
2. Repeatable - Keeps the same result each time a test is executed<br>
3. Self-vaildating - Validate the results through expect, toBe, toEqual...etc assert library from JEST<br>
4. Timely - Write test code in a timely manner(like before refactoring or before deploying to users) <br>

### Scope of testing (what to test)

- **RIGHT-BICEP**<br>

0. RIGHT - Check if all requirements are working properly<br>
1. Boundary conditions - Test for all cases
   ex) Wrong formatted input, Null, undefined, special characters, wrong email type, small numbers, large numbers, duplicates, order not as expected...etc<br>
2. Inverse relationship - Check the result by applying the inverse relationship <br>
3. Cross-check - Check that the results are correct using other means <br>
4. Error conditions - Make sure you handle all error cases and unfortunate paths. (ex.Network error, out of memory, when database doens't work, etc.) <br>
5. Performance characteristics - Performance confirmation is confirmed with accurate figures through tests <br>

### Conditions of the test

- **CORRECT** <br>

0. Conformity - Compliance with specific format (ex. phone number, email, ID, file extension)<br>
1. Ordering - Check the order condition (ex. when the order of students must come in by ID)<br>
2. Range - A range of numbers (less than or greater than the limited range)<br>
3. Reference - Consideration of external dependencies. (ex. when ~, a specific action must be performed.)<br>
4. Existence - Consider when the value does not exist. (ex. null, undefined, '',0) <br>
5. Cardinality - Verification according to the 0-1-n rule <br>
6. Time - Consider all time variables <br>

### How to test through JEST

0. Exports the function to be tested as a module

```js
function add(a, b) {
  return a + b;
}
module.exports = add;
```

1. Then create a file for testing and import and test the module you just exported.

```js
test("test description", () => {
  expect(1).toBe(1);
});
// or use 'it'
it("test description", () => {
  expect(1).toBe(1);
});

// or If you have several of the same tests, you can group them together with describe - it to improve readability.

describe("divides", () => {
  let cal;
  beforeEach(() => {
    cal = new Calculator();
  });

  it("0/0 === NaN", () => {
    cal.divide(0);
    expect(cal.value).toBe(NaN);
  });

  it("4/4 === 1", () => {
    cal.set(4);
    cal.divide(4);
    expect(cal.value).toBe(1);
  });
});
```

```js
const add = require("../add.js");
test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
});
```

2. If you enter the example below in package.json, you are ready to test.

```js
{
  "scripts": {
    "test": "jest"
  }
}
```

3. Run **npm run test** in terminal. <br>

### Mocking Method - jest.fn

Jest provides the jest.fn() function to create mock functions.
Using this, you can run the internal function like a real one.

- mockReturnValue(value) : Specify return value

```js
// Make a variable a mock function
const mockFn = jest.fn();

// mocks are empty functions so their return values are 'undefined'
mockFn(); // undefined
mockFn(1); // undefined
mockFn([1, 2], { a: "b" }); // undefined

//but if you use mockReturnValue(value), you can specify return value
mockFn.mockReturnValue("I am a mock!"); // I am a mock!
```

```js
const mock = jest.fn();

mock.mockReturnValue(42);
mock(); // 42

mock.mockReturnValue(63);
mock(); // 63
```

- mockImplemetation(value) : impromptu implementation of the function

```js
const mockFn = jest.fn();

// Create a mock function that works.
mockFn.mockImplementation((name) => `I am ${name}!`);

console.log(mockFn("suhyeon")); // I am suhyeon!
```

- mockResolvedValue(value) / mockRejectedValue(value) : Receive resolve/reject values ​​from asynchronous functions.

```js
test("async resolve test", async () => {
  const asyncMock = jest.fn().mockResolvedValue(43);

  await asyncMock(); // 43
});

test("async reject test", async () => {
  const asyncMock = jest.fn().mockRejectedValue(new Error("Async error"));

  await asyncMock(); // throws "Async error"
});
```

What makes fake functions really useful when writing tests is that the fake functions remember everything about how they were called.

```js
test("mock Test", () => {
  const mockFn = jest.fn();
  mockFn.mockImplementation((name) => `I am ${name}`);

  mockFn("a");
  mockFn(["b", "c"]);

  expect(mockFn).toBeCalledTimes(2);
  expect(mockFn).toBeCalledWith("a");
  expect(mockFn).toBeCalledWith(["b", "c"]);
});
```

### Mocking Method - jest.mock

- jest.fn() : Used when mocking each one individually<br>
- jest.mock() : Used to mock a group at once<br>

```js
jest.mock("../UserClient"); // ../UserClient mocks the object exported from UserClient and all internal elements as a group.

const UserService = require("../UserService");
const UserClient = require("../UserClient"); // Now, all elements taken out of ../UserClient are mocked.

describe("UserService", () => {
  const login = jest.fn(async (id, password) => {
    return "success";
  });
  UserClient.mockImplementation(() => {
    return {
      //Create a new function in the mocked UserClient module, covering the existing login object with the above login.
      login: login,
    };
  });
  let userService;

  beforeEach(() => {
    userService = new UserService(new UserClient());
  });

  it("calls login() on UserClient when tries to login", async () => {
    await userService.login("abc", "abc");
    expect(login.mock.calls.length).toBe(1);
  });
});
```

### Mocking Method - jest.spyOn

```js
jest.spyOn(object, methodName);
```

jest.spyOn is useful when you need to find out whether the corresponding function was called or not and how it was called.

```js
test("spyOn Test", () => {
  // regular object
  const calculator = {
    add: (a, b) => a + b, // object method
  };

  // put SpyOn method on calculator.add()
  const spyFn = jest.spyOn(calculator, "add");

  // execute object method
  const result = calculator.add(2, 3);

  expect(spyFn).toBeCalledTimes(1); // called at once
  expect(spyFn).toBeCalledWith(2, 3); //called with argument 2,3
  expect(result).toBe(5); // return value should be 5 -> true
});
```

In the example above, the jest.spyOn() function is used to spy the add function of the calculator object.
Therefore, after calling the add function, the number of calls and the number of parameters passed can be counted. (spying)

### Useful matcher

```js
expect('test target').Matcher(Conditions the test subject must pass);
```

0. toBe() : Compare primitive data
1. toEqual() : Shallow comparison when testing objects or arrays
2. toStrictEqual() : Deep comparison when testing objects or arrays
3. toBeFalsy(), toBeTruthy() : a matcher that judges a boolean value.
4. toBeClose() : Used instead of toBe when testing decimal points
5. toMatch() : toMatch() is used when testing using regular expressions
6. toContain() : a matcher used to test whether a specific element exists in an array
7. toThrow() : a matcher to test whether a specific error occurs when a certain operation is performed
8. toHaveBeenCalledTimes(expected: number) : Check how many times a function has been called
9. toHaveBeenCalledWith() : When a function is called, check what arguments it is called with
10. toHaveBeenCalled() : Check if the function has been called
11. toHaveLength() : Check the length of an array

### Referece links

[JEST OFFICIAL DOCS](https://jestjs.io/docs/getting-started)<br>
[JEST BLOG BY INPA](https://inpa.tistory.com/entry/JEST-%F0%9F%93%9A-jest-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC)<br>
[JSET MOCKING BY INPA](https://inpa.tistory.com/entry/JEST-%F0%9F%93%9A-%EB%AA%A8%ED%82%B9-mocking-jestfn-jestspyOn?category=914656)<br>
[JEST MATCHER](https://runebook.dev/ko/docs/jest/expect)<br>
[HOW TO JEST SPYOn()](https://www.daleseo.com/jest-fn-spy-on/)
