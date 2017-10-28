angular.module('primeiraApp').component('contentHeader', {
  bindings: {
    title: '@',
    subtitle: '@',
  },
  template: `
  <section>
    <h1>{{ $ctrl.title }} <small>{{ $ctrl.subtitle }}</small></h1>
  </section>
  `
})
