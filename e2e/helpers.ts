export const checkIfObjectKeyExist = (
  obj: Record<string, any>,
  key: string
) => {
  if (!obj.hasOwnProperty(key)) throw new Error(`No ${key} found in object`)
}
