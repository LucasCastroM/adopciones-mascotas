//Modal de adopción
const botonesAdoptar = document.querySelectorAll('.btn-adoptar');
const modalAdopcion = document.getElementById('modalAdopcion');
const cerrarModalAdopcion = document.getElementById('cerrarModalAdopcion');
const inputNombreAnimal = document.getElementById('nombreAnimal');

botonesAdoptar.forEach(boton => {
    boton.addEventListener('click', function (e) {
        e.preventDefault();
        const nombreAnimal = this.getAttribute('data-animal');
        inputNombreAnimal.value = nombreAnimal;
        modalAdopcion.classList.add('modal--show');
    });
});

cerrarModalAdopcion.addEventListener('click', function () {
    modalAdopcion.classList.remove('modal--show');
});

const btnSwitch = document.querySelector('#active');
if (btnSwitch) {
  btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
  });
}

