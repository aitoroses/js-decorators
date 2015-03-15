# JS Decorators

A tiny compiler that brings python style decorators to javascript.

## Use

```js
import Compiler from '../lib/compiler';

var compiler = new Compiler();

var result = compiler.compile(source);
```

## Example

```js

// decorators.js

function addAnnotation(decorable, annotation) {
  decorable.annotations = decorable.annotations || [];
  decorable.annotations.push(annotation);
  return decorable;
}

class Annotation1 {}

class Annotation2 {
  constructor(config) {
    this.config = config;
  }
}

export function Decorator1(config, decorable) {
  console.log(["Decorator1", config, decorable])
  decorable = addAnnotation(decorable, new Annotation1(config))
  return decorable;
}
export function Decorator2(config, decorable) {
  console.log(["Decorator2", config, decorable])
  decorable = addAnnotation(decorable, new Annotation2(config))
  return decorable;
}
```

```js

// index.js

import {Decorator1, Decorator2} from './decorators';

@Decorator1
@Decorator2({module: "MY_MODULE"})
class MyClass {
  constructor() {
    console.log("Instantiate my class");
  }
}

MyClass.annotations[0].name == Annotation2 // => true
```
