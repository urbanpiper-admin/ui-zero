export default function generateClassNames(passedClassName, addedClassName) {
  return passedClassName
    ? `${addedClassName} ${passedClassName}`
    : addedClassName;
}
