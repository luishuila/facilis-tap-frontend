import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
  standalone: false,
})
export class AppointmentPage implements OnInit {
  filtroSeleccionado: string = '' ;
  constructor() { }

  ngOnInit() {
      this.filtroSeleccionado = 'proxima'
  }
  // por defecto

  cursos = [
    {
      nombre: 'Curso de Angular',
      descripcion: 'Aprende Angular desde cero.',
      fecha: '2025-08-10',
      estado: 'proxima'
    },
    {
      nombre: 'Curso de Ionic',
      descripcion: 'Crea apps móviles con Ionic.',
      fecha: '2025-08-04',
      estado: 'en_curso'
    },
    {
      nombre: 'Curso de NestJS',
      descripcion: 'Backend moderno con TypeScript.',
      fecha: '2025-06-01',
      estado: 'pasada'
    },
    {
      nombre: 'Curso de C#',
      descripcion: 'Programación orientada a objetos.',
      fecha: '2025-05-10',
      estado: 'pasada'
    }
  ];

  // Filtrar cursos según el estado seleccionado
  cursosFiltrados() {
    return this.cursos.filter(curso => curso.estado === this.filtroSeleccionado);
  }

  // Retorna el color del ion-card según el estado
  colorPorEstado(estado: string): string {
    switch (estado) {
      case 'proxima':
        return 'success'; // verde
      case 'en_curso':
        return 'warning'; // amarillo
      case 'pasada':
        return 'danger'; // rojo
      default:
        return 'medium';
    }
  }
  editarCurso(curso: any) {
    console.log('Editar curso:', curso);
    // Aquí puedes abrir un modal, navegar o lo que necesites
  }
  
  eliminarCurso(curso: any) {
    console.log('Eliminar curso:', curso);
    // Lógica de eliminación
  }
  
}
