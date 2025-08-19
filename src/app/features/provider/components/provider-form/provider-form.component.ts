import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { CategoryService } from 'src/app/core/services/category/category.service';

import { contributor } from 'src/app/core/constant/constants';


@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss'],
  standalone: false,
})
export class ProviderFormComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;

  @Input() providerForm!: FormGroup;
  @Input() isDisabled: boolean = false;
  @Input() independent: boolean = true;
  @Input() isUpdate: boolean = false;

  /** Emite todo el payload listo para enviar (incluye archivos si existen) */
  @Output() providerSaved = new EventEmitter<{
    data: any,
    avatarFile?: File | null,
    covanFile?: File | null,
    fileItems?: any[] | null  
  }>();

  // Data UI
  contributor = contributor;
  selectModal: any[] = [];
  files: any[] = [];
  // Archivos / Previews
  avatarFile: File | null = null;
  avatarPreview: string | null = null;

  covanFile: File | null = null;
  covanPreview: string | null = null;

  fileItems: any = []; // Archivos subidos por el usuario

  constructor(
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.categoryService.findAllCategory().subscribe(data => {
      console.log('Categorías cargadas-->:', data);
      this.selectModal = data || [];
    });
  }

  // ---- Servicios (fac-select modal) ----
  onServicesChanged(values: any) {
    this.providerForm.get('categories')?.setValue(values);
  }

  // ---- Avatar ----
  onImageFileSelected(file: File) {
    this.avatarFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => (this.avatarPreview = e.target.result);
    reader.readAsDataURL(file);

  }
  onImg (event:any){
    this.fileItems = event;
  }
  // ---- Covan ----
  isImage(preview: string | null) {
    return preview && preview !== 'pdf';
  }

  onCovanSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.covanFile = input.files[0];

      if (this.covanFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => (this.covanPreview = e.target.result);
        reader.readAsDataURL(this.covanFile);
      } else {
        this.covanPreview = 'pdf';
      }
    }
  }

  // ---- Submit ----
  onSubmit() {

    if (this.providerForm.invalid) return;

    this.providerSaved.emit({
      data: this.providerForm.value,
      avatarFile: this.avatarFile,
      fileItems: this.fileItems 
    });
  }
}
