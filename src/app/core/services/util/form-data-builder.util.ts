// form-data-builder.util.ts

/** dataURL -> Blob */
export function dataURLtoBlob(dataURL: string): { blob: Blob; mime?: string } {
    const [header, base64] = dataURL.split(',');
    const mime = header.match(/data:(.*?);base64/)?.[1];
    const bin = atob(base64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return { blob: new Blob([bytes], { type: mime || 'application/octet-stream' }), mime };
  }
  
  /** intenta deducir extensión de un mime */
  function extFromMime(mime?: string): string {
    if (!mime) return '';
    const map: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'application/pdf': 'pdf',
      'text/plain': 'txt',
      'application/zip': 'zip',
      'application/json': 'json',
      'audio/mpeg': 'mp3',
      'audio/wav': 'wav',
      'video/mp4': 'mp4',
    };
    return map[mime] ? `.${map[mime]}` : '';
  }
  
  /** nombre de respaldo consistente */
  function fallbackFilename(base = 'file', mime?: string) {
    return `${base}${extFromMime(mime) || ''}`;
  }
  
  type AnyInput =
    | File
    | Blob
    | FileList
    | string
    | ArrayBuffer
    | Uint8Array
    | { file?: File; src?: string; type?: string; name?: string; filename?: string; webPath?: string; uri?: string; path?: string; mimeType?: string }
    | null
    | undefined;
  
  /** función general: construye FormData desde un mapa de campos -> entradas */
  export async function buildFormData(inputs: Record<string, AnyInput | AnyInput[]>, defaultBaseName = 'file'): Promise<FormData> {
    const fd = new FormData();
    for (const [fieldName, input] of Object.entries(inputs)) {
      const files = await toFileArray(input, fieldName || defaultBaseName);
      for (const f of files) {
        fd.append(fieldName, f, f.name);
      }
    }
    return fd;
  }
  
  /** normaliza una entrada a File */
  export async function toFile(input: AnyInput, baseName = 'file'): Promise<File | null> {
    if (!input) return null;
  
    // File directo
    if (typeof File !== 'undefined' && input instanceof File) return input;
  
    // Blob -> File (sin name)
    if (typeof Blob !== 'undefined' && input instanceof Blob) {
      const mime = input.type || 'application/octet-stream';
      return new File([input], fallbackFilename(baseName, mime), { type: mime });
    }
  
    // FileList -> primer file
    if (typeof FileList !== 'undefined' && input instanceof FileList) {
      return input.length ? input.item(0)! : null;
    }
  
    // ArrayBuffer / Uint8Array
    if (input instanceof ArrayBuffer || input instanceof Uint8Array) {
      const buf = input instanceof Uint8Array ? input : new Uint8Array(input);
      const mime = 'application/octet-stream';
      return new File([buf], fallbackFilename(baseName, mime), { type: mime });
    }
  
    // string: dataURL o URL (incluye blob:)
    if (typeof input === 'string') {
      if (input.startsWith('data:')) {
        const { blob, mime } = dataURLtoBlob(input);
        return new File([blob], fallbackFilename(baseName, mime), { type: mime || 'application/octet-stream' });
      } else {
        const res = await fetch(input);
        const blob = await res.blob();
        const mime = blob.type || 'application/octet-stream';
        return new File([blob], fallbackFilename(baseName, mime), { type: mime });
      }
    }
  
    // objetos comunes (Capacitor/Ionic/etc)
    if (typeof input === 'object') {
      // prioriza si trae File adentro
      if ((input as any).file instanceof File) return (input as any).file as File;
  
      // src / uri / path / webPath -> fetch
      const src = (input as any).src || (input as any).uri || (input as any).path || (input as any).webPath;
      if (src && typeof src === 'string') {
        const res = await fetch(src);
        const blob = await res.blob();
        const mime = (input as any).type || (input as any).mimeType || blob.type || 'application/octet-stream';
        const name = (input as any).name || (input as any).filename || fallbackFilename(baseName, mime);
        return new File([blob], name, { type: mime });
      }
  
      // si solo tiene { type, name } y quizá bytes aparte (raro)
      if ((input as any).type && (input as any).name && (input as any).bytes instanceof Uint8Array) {
        const mime = (input as any).type;
        const name = (input as any).name;
        return new File([(input as any).bytes], name, { type: mime });
      }
    }
  
    console.warn('toFile: tipo no soportado', input);
    return null;
  }
  
  /** normaliza cualquier entrada (singular o lista) a File[] */
  export async function toFileArray(input: AnyInput | AnyInput[], baseName = 'file'): Promise<File[]> {
    if (!input) return [];
    if (Array.isArray(input)) {
      const out: File[] = [];
      for (let i = 0; i < input.length; i++) {
        const f = await toFile(input[i], `${baseName}_${i + 1}`);
        if (f) out.push(f);
      }
      return out;
    }
    if (typeof FileList !== 'undefined' && input instanceof FileList) {
      return Array.from(input) as File[];
    }
    const single = await toFile(input, baseName);
    return single ? [single] : [];
  }
  