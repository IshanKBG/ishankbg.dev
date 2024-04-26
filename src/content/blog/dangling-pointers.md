---
title: "Dangling pointers: The bane of every C/C++ programmer's existence?"
description: This post will break down dangling pointers in C/C++. We'll explain what they are, why they happen, and how languages like Rust avoid them altogether.
pubDate: 2024-04-26
tags: 
  - C
  - C++
  - Rust
  - Memory Management
  - Dangling Pointers
  - Security
isDraft: false
---

While learning or using C/C++, you've likely encountered dangling pointers. This post will break down dangling pointers in C/C++. We'll explain what they are, why they happen, and how languages like Rust avoid them altogether.

### What are Dangling Pointers?
 A pointer pointing to a memory location that has been freed is called a dangling pointer. This can lead to unexpected behaviour in the program, like crashes or data corruption, and can also serve as a source of serious security vulnerabilities. A prominent example is the infamous  [Heartbleed]([https://en.wikipedia.org/wiki/Heartbleed](https://en.wikipedia.org/wiki/Heartbleed)) bug (2014) in the OpenSSL cryptographic library. This bug was caused, in part, by dangling pointers. A memory deallocation error left pointers referencing freed memory, allowing attackers to access sensitive data like encryption keys. This vulnerability impacted a vast number of websites and servers, highlighting the dangers of dangling pointers. Dangling pointers can also be exploited in combination with other vulnerabilities, such as integer overflows. An integer overflow can lead to memory being allocated outside the intended bounds. If a pointer is then used to access this invalid memory, it becomes a dangling pointer, potentially allowing attackers to overwrite critical dat or execute malicious code.

### What causes dangling points?

#### Memory Deallocation

When a memory pointed by a pointer is deallocated then it becomes a dangling pointers.
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
struct Student {
  int id;
  char name[20];
};

struct Student* getStudentData() {
 struct Student *student = (struct Student*)malloc(sizeof(struct Student));
  student->id = 12345;
  strcpy(student->name, "John Doe");
  return student;
}

void printStudent(struct Student *student) {
  if (student != NULL) {
    printf("Student ID: %d\n", student->id);
    printf("Student Name: %s\n", student->name);
  } else {
    printf("Error: Invalid student pointer\n");
  }
}

int main() {
  struct Student *studentPtr = getStudentData();
  printStudent(studentPtr);
  free(studentPtr);
  printStudent(studentPtr);
  return 0;
}

``` 
In the above example we create a student struct on the heap and then print its information. Crucially, we forget to update the pointer after deallocating the memory. Trying to access the student information through this pointer afterwards becomes dangerous - it's a dangling pointer! This can lead to crashes or unpredictable behaviour because the memory is no longer valid.
####  Out-Of-Scope Variables
When a variable goes out of scope the pointer pointing to that variable becomes a dangling pointer. 
```c
#include <stdio.h>
int main()
{
	int* ptr;
	{
		int a = 10;
		ptr = &a;
	}
	printf("%d", *ptr);
	return 0;
}


```
 In the above example we attempts to print the value of a variable `a` after it goes out of scope. Initially, a pointer `ptr` is assigned the address of `a`. However, when the code block ends, `a` is no longer valid memory. Despite this, `ptr` still points to that freed memory, creating a dangling pointer. Dereferencing this pointer (using `*ptr`) leads to undefined behavior, which could cause a crash or unexpected results.
### Rust to the Rescue!
Rust, a modern systems programming language, takes a different approach to memory management. Rust's compiler guarantees that references will never be dangling references, i.e, if you have a reference to some data, the compiler will ensure that the data will not go out of scope before the reference to the data does.
All thanks to Rust's most unique feature called **ownership** that enables Rust to make memory safety guarantees without needing a garbage collector or manual memory management with `malloc` and `free`.
Ownership has three important rules to keep in mind - 
- Each value has an owner
- There can only be one owner at a time
- When the owner goes out of scope, value will be dropped using [`drop`](https://doc.rust-lang.org/std/ops/trait.Drop.html#tymethod.drop)
Here is an example to how it tackles the issue of dangling pointers
```rust
fn main() {
    let reference_to_nothing = dangle();
}
fn dangle() -> &String {
    let s = String::from("hello");
    &s
}
```
This will result in a compiler error
```bash
$ cargo run
   Compiling ownership v0.1.0 (file:///projects/ownership)
error[E0106]: missing lifetime specifier
 --> src/main.rs:5:16
  |
5 | fn dangle() -> &String {
  |                ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but there is no value for it to be borrowed from
help: consider using the `'static` lifetime
  |
5 | fn dangle() -> &'static String {
  |                 +++++++

For more information about this error, try `rustc --explain E0106`.
error: could not compile `ownership` due to previous error

```

We are returning a reference to the `String`. But here, `s` goes out of scope, and is dropped. Its memory goes away. Thus it creates a dangling reference here. To solve the above error by removing the reference all together and returning the `String` directly.
```rust
fn no_dangle() -> String {
    let s = String::from("hello");
    s
}
```
Now it will be compiled successfully. This feature can prevent countless memory bugs caused by dangling pointers. By enforcing these checks directly within the compiler, it helps catch errors early in the development process. I'd rather grapple with compiler errors upfront than encounter bugs reported by users or, worse yet, have them go undetected entirely.
If you want to learn more about ownership then checkout this [link](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html).
