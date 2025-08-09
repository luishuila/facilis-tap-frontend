import { Component, EventEmitter, Input, Output } from '@angular/core';

type FacFileKind = 'image' | 'video';
export type FacFileItem = {
  name: string;
  type: FacFileKind;
  src: string;
  file: File;
  sizeBytes: number;
  durationSec?: number;
};

type FacFileMode = 'image' | 'video' | 'both';

@Component({
  selector: 'fac-file',
  templateUrl: './fac-file.component.html',
  styleUrls: ['./fac-file.component.scss'],
  standalone: false,
})
export class FacFileComponent {
  @Input() mode: FacFileMode = 'image';
  @Input() label?: string;
  @Input() multiple = true;
  @Input() maxSizeMB = 0;           // tamaño máximo por archivo
  @Input() maxFiles = 0;            // límite de archivos (0 = sin límite)
  @Input() disabled = false;
  @Input() helperText = '';

  @Output() itemsChange = new EventEmitter<FacFileItem[]>();

  items: FacFileItem[] = [];
  isLoading = false;
  errorMsg = '';

  get computedLabel(): string {
    if (this.label) return this.label;
    if (this.mode === 'image') return 'Subir imágenes (JPG/PNG)';
    if (this.mode === 'video') return 'Subir videos';
    return 'Subir imágenes o videos (JPG/PNG/VIDEO)';
  }

  get acceptAttr(): string {
    if (this.mode === 'image') return 'image/*';
    if (this.mode === 'video') return 'video/*';
    return 'image/*,video/*';
  }

  get hintText(): string {
    if (this.mode === 'image') return 'JPG o PNG';
    if (this.mode === 'video') return 'MP4, MOV, etc.';
    return 'JPG, PNG o VIDEO';
  }

  triggerFile(input: HTMLInputElement) {
    if (!this.disabled) input.click();
  }

  async onFileSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) return;

    this.errorMsg = '';

    // Validar límite antes de cargar
    if (this.maxFiles > 0 && this.items.length >= this.maxFiles) {
      this.errorMsg = `Solo puedes subir un máximo de ${this.maxFiles} archivo(s).`;
      input.value = '';
      return;
    }

    this.isLoading = true;

    for (const file of files) {
      const mime = file.type || '';
      const isImage = mime.startsWith('image/');
      const isVideo = mime.startsWith('video/');

      if (this.mode === 'image' && !isImage) continue;
      if (this.mode === 'video' && !isVideo) continue;
      if (this.mode === 'both' && !(isImage || isVideo)) continue;

      if (this.maxSizeMB > 0 && file.size > this.maxSizeMB * 1024 * 1024) {
        this.errorMsg = `“${file.name}” supera ${this.maxSizeMB} MB.`;
        continue;
      }

      if (this.maxFiles > 0 && this.items.length >= this.maxFiles) {
        this.errorMsg = `Solo puedes subir ${this.maxFiles} archivo(s).`;
        break;
      }

      const src = URL.createObjectURL(file);
      const item: FacFileItem = {
        name: file.name,
        type: isImage ? 'image' : 'video',
        src,
        file,
        sizeBytes: file.size,
      };

      if (isVideo) {
        try { item.durationSec = await this.readVideoDuration(src); } catch {}
      }

      this.items.push(item);
    }

    this.isLoading = false;
    this.itemsChange.emit(this.items);
    input.value = '';
  }

  removeAt(i: number) {
    const it = this.items[i];
    if (it?.src?.startsWith('blob:')) URL.revokeObjectURL(it.src);
    this.items.splice(i, 1);
    this.itemsChange.emit(this.items);
  }

  private readVideoDuration(url: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const v = document.createElement('video');
      v.preload = 'metadata'; v.src = url;
      v.onloadedmetadata = () => { 
        resolve(isFinite(v.duration) ? v.duration : 0); 
        v.removeAttribute('src'); 
        v.load(); 
      };
      v.onerror = () => reject();
    });
  }
}
