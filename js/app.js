/* script.js
   JavaScript muy básico y seguro para estudiantes que aún no programan.
   Objetivo: “mejoras pequeñas” que muestran para qué sirve JS, sin complicar.

   Funciones incluidas:
   1) Colocar el año actual en el footer (automático).
   2) Validación amigable del formulario (sin backend).
   3) Mensaje de confirmación simple (no envía nada a internet).
*/

document.addEventListener("DOMContentLoaded", function () {
  // ====== 1) Año automático en el footer ======
  // Busca el primer <span> dentro del footer (en tu HTML tienes: © <span>2026</span>)
  var footer = document.querySelector(".footer");
  if (footer) {
    var spanAnio = footer.querySelector("span");
    if (spanAnio) {
      var anioActual = new Date().getFullYear();
      spanAnio.textContent = anioActual;
    }
  }

  // ====== 2) Validación simple del formulario ======
  var formulario = document.querySelector(".form");
  if (!formulario) return; // Si no existe formulario, no hacemos nada.

  // Inputs del formulario (según tu HTML)
  var inputNombre = document.querySelector("#nombre");
  var inputCorreo = document.querySelector("#correo");

  // Creamos un contenedor de mensajes (si no existe)
  var mensaje = document.createElement("div");
  mensaje.className = "form__message";
  mensaje.style.display = "none";
  formulario.appendChild(mensaje);

  // Al enviar el formulario:
  formulario.addEventListener("submit", function (evento) {
    // Evita que recargue la página (porque aún no hay servidor/backend)
    evento.preventDefault();

    // Limpiamos estados anteriores
    limpiarEstado(inputNombre);
    limpiarEstado(inputCorreo);
    ocultarMensaje();

    // Validaciones mínimas
    var nombreValido = validarNombre(inputNombre);
    var correoValido = validarCorreo(inputCorreo);

    // Si todo está bien, mostramos éxito. Si no, mostramos error.
    if (nombreValido && correoValido) {
      mostrarExito(
        "Listo ✅ Tu solicitud fue registrada (simulación). En una fase futura lo conectaremos a un servidor."
      );

      // Opcional: limpiar campos
      formulario.reset();
    } else {
      mostrarError(
        "Revisa los campos marcados. Tip: el nombre debe tener al menos 3 letras y el correo debe ser válido."
      );
    }
  });

  // ====== Funciones auxiliares (explicables y cortas) ======

  function validarNombre(input) {
    if (!input) return false;
    var valor = input.value.trim();

    // Regla simple: al menos 3 caracteres
    if (valor.length < 3) {
      marcarError(input);
      return false;
    }

    marcarExito(input);
    return true;
  }

  function validarCorreo(input) {
    if (!input) return false;
    var valor = input.value.trim();

    // Regla simple: debe incluir "@" y "."
    // (No es la validación perfecta, pero es entendible para principiantes)
    if (valor.includes("@") === false || valor.includes(".") === false) {
      marcarError(input);
      return false;
    }

    marcarExito(input);
    return true;
  }

  function marcarError(input) {
    input.classList.add("is-error");
    input.classList.remove("is-success");
  }

  function marcarExito(input) {
    input.classList.add("is-success");
    input.classList.remove("is-error");
  }

  function limpiarEstado(input) {
    if (!input) return;
    input.classList.remove("is-error");
    input.classList.remove("is-success");
  }

  function mostrarError(texto) {
    mensaje.textContent = texto;
    mensaje.style.display = "block";
    mensaje.style.borderColor = "#b00020";
  }

  function mostrarExito(texto) {
    mensaje.textContent = texto;
    mensaje.style.display = "block";
    mensaje.style.borderColor = "#0a7a20";
  }

  function ocultarMensaje() {
    mensaje.style.display = "none";
    mensaje.textContent = "";
  }
});
