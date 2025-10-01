export function potongText(text, panjang) {
  if (text.length <= panjang) return text;
  return text.substring(0, panjang) + "..";
}

export function stripHtml(html) {
  if (!html || typeof html !== 'string') return '';
  
  // Hapus script & style
  let text = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
                 .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '');
  
  // Ganti <br>, <p>, <div> jadi newline biar rapih
  text = text.replace(/<(br|p|div)\s*\/?>/gi, '');
  
  // Hapus semua tag HTML
  text = text.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Bersihkan spasi ganda / newline berlebih
  return text.replace(/\n{2,}/g, '\n').trim();
}
