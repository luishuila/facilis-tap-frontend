import { AnimationController } from '@ionic/angular';

export const customAnimation = (baseEl: HTMLElement, opts?: any) => {
  const animationCtrl = new AnimationController();

  const rootAnimation = animationCtrl.create()
    .addElement(baseEl)
    .duration(500) // Duración de la animación en milisegundos
    .easing('ease-in-out') // Tipo de curva para la animación
    .keyframes([
      { offset: 0, opacity: 0, transform: 'translateX(100%)' },
      { offset: 1, opacity: 1, transform: 'translateX(0)' }
    ]);

  return rootAnimation;
};
