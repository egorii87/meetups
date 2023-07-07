export function convertImageFromFiletoBase64(image: File) {
  const fr = new FileReader();
  fr.readAsDataURL(image);
  fr.addEventListener('load', () => {
    const res = fr.result;
    if (typeof res === 'string') {
      return res;
    }
  });
}
