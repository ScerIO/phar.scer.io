export default function readFileAsync(file: File): Promise<string|ArrayBuffer> {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsArrayBuffer(file)
  })
}
