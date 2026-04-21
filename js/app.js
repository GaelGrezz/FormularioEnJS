const emailInputHTML = document.querySelector("#email");
const asuntoInputHTML = document.querySelector("#asunto");
const mensajeInputHTML = document.querySelector("#mensaje");
const buttonEnviarHTML = document.querySelector("button[type='submit']");
const buttonResetHTML = document.querySelector("button[type='reset']");
const formHTML = document.querySelector("form");
let mensajeObj = {
  mensaje: "",
  asunto: "",
  email: "",
};
class UI {
  constructor(referencia, contenido, tipo) {
    this.elementParent = referencia;
    this.contenido = contenido;
    this.tipo = tipo;
  }
  mensaje() {
    if (this.tipo != "Error") {
      this.showMensajeExito();
      return;
    }
    this.showMensajeError();
  }

  showMensajeExito() {
    const mensajeHTML = document.createElement("P");
    mensajeHTML.textContent = "Correo enviado con éxito";
    mensajeHTML.classList.add(
      "p-3",
      "bg-green-500",
      "text-center",
      "text-white",
    );
    if (!formHTML.children[4]) {
      formHTML.append(mensajeHTML);
    }

    setTimeout(() => {
      formHTML.removeChild(formHTML.lastChild);
    }, 3000);

    formHTML.reset();
  }

  showMensajeError() {
    const mensajeHTML = document.createElement("P");
    mensajeHTML.textContent = this.contenido;

    mensajeHTML.classList.add(
      "p-3",
      "bg-red-600",
      "text-white",
      "text-center",
      "font-bold",
    );
    if (!this.elementParent.children[2]) {
      setTimeout(() => {
        this.elementParent.removeChild(this.elementParent.children[2]);
      }, 4000);
      this.elementParent.append(mensajeHTML);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  emailInputHTML.addEventListener("blur", (e) => {
    validarContenido(e.target, e.target.value);
  });
  asuntoInputHTML.addEventListener("blur", (e) => {
    validarContenido(e.target, e.target.value);
  });
  mensajeInputHTML.addEventListener("blur", (e) => {
    validarContenido(e.target, e.target.value);
  });

  buttonEnviarHTML.addEventListener("click", (e) => {
    e.preventDefault();
    enviarDatos();
  });
  buttonResetHTML.addEventListener("click", (e) => {});
  limpiarDatos();
});

function validarContenido(target, contenido) {
  const elementParent = target.parentElement;
  if (target.name == "email" && !validarEmail(contenido)) {
    const mensajeUI = new UI(
      elementParent,
      `Debes ingresar un email válido para este campo`,
      "Error",
    );
    mensajeUI.mensaje();
    return;
  }
  if (contenido.length === 0) {
    const mensajeUI = new UI(
      elementParent,
      `Debes ingresar valores a este campo ${target.name}`,
      "Error",
    );
    mensajeUI.mensaje();
    return;
  } else {
    if (elementParent.children[2]) {
      elementParent.removeChild(elementParent.children[2]);
    }
  }

  registrarObjeto(target, contenido);
  validarObjeto();
}

function registrarObjeto(target, contenido) {
  mensajeObj[target.name] = contenido;
  return;
}

function validarObjeto() {
  const rest = Object.values(mensajeObj).every((value) => value !== "");
  if (rest) {
    buttonEnviarHTML.removeAttribute("disabled");
    buttonEnviarHTML.classList.remove("opacity-50");
  }
}

function enviarDatos() {
  const mensajeUI = new UI(formHTML, "Correo enviado con éxito", "");
  mensajeUI.mensaje();
}

function limpiarDatos() {
  mensajeObj = {
    mensaje: "",
    asunto: "",
    email: "",
  };
  formHTML.reset();
}

function validarEmail(email) {
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const rest = regex.test(email);
  return rest;
}
