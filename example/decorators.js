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
