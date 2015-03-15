function Annotation1() {
  console.log("Annotation1")
}
function Annotation2() {}


@Annotation1
@Annotation2({module: "EAPP"})
class MyClass() {}
