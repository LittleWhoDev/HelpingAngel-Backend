export type Contract = [boolean, string?][]

export const ensures = (c: Contract) =>
  c.forEach((clause) => {
    if (clause[0] === false) throw Error(clause[1])
  })
