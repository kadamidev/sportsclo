export function formatAmount(val) {
  const split = val.toString().split(".")

  if (split.length === 1) {
    return `$${split[0]}.00`
  }

  if (split[1].length === 2) {
    return `$${split.join(".")}`
  }

  if (split[1].length === 1) {
    return `$${split.join(".")}0`
  }
}
