export default function readFileAsync(file: File): Promise<string|ArrayBuffer> {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onerror = function() {
      reject(reader.error)
    }
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.readAsArrayBuffer(file)
  })
}
