export function convertImageFromBase64toFile(base64Image: string): File {
  const parts = base64Image.split(';base64,');
  const imageType = parts[0].split(':')[1];
  const decodedData = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }
  const blobUrl = new Blob([uInt8Array], { type: imageType });

  const file = new File([blobUrl], 'fileName', {
    type: 'image/png',
  });
  Object.assign(file, {
    url: URL.createObjectURL(file),
  });
  return file;
}
