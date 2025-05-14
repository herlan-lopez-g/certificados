$(".btn-whatsapp-informacion").click(function (e) {
  e.preventDefault();
  let a = $(this).data("celular"),
    t = $(this).data("mensaje");
  window.open(
    "https://api.whatsapp.com/send?phone=" + a + "&text=" + t,
    "_blank"
  );
}),
  $("#id_municipio").select2({
    placeholder: "Seleccione un municipio",
    autoClear: !0,
    language: {
      noResults: function () {
        return "No se encontraron Coincidencias";
      },
      searching: function () {
        return "Buscando...";
      },
      inputTooShort: function () {
        return "Escriba almenos 1 caracter para comenzar b\xfasqueda";
      },
    },
    minimumInputLength: 1,
    ajax: {
      url: window.location.origin + "/buscar-municipio",
      dataType: "json",
      delay: 250,
      data: function (e) {
        return { searchTerm: e.term };
      },
      processResults: function (e) {
        return { results: e };
      },
      cache: !0,
    },
  });
const generarCaptcha = () => {
  $.post(window.location.origin + "/generar-captcha", function (e) {
    e &&
      ($("#codigo_captcha").attr("value", e.captcha.codigo),
      $("#img_captcha").attr("src", e.captcha.ruta),
      $("#borrar_img").val(e.captcha.ruta),
      $("#captcha").val(""));
  });
};
generarCaptcha();
const form = document.getElementById("frm-informacion-areas");
var validator = FormValidation.formValidation(form, {
  fields: {
    "id_area[]": {
      validators: { notEmpty: { message: "Esta pregunta es obligatoria" } },
    },
    nombre: {
      validators: {
        notEmpty: { message: "Esta pregunta es obligatoria" },
        regexp: {
          regexp: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/i,
          message:
            "El nombre puede contener caracteres alfab\xe9ticos y espacios",
        },
      },
    },
    celular: {
      validators: {
        notEmpty: { message: "Esta pregunta es obligatoria" },
        regexp: {
          regexp: /^(7|6)?[0-9]{7}$/i,
          message: "El n\xfamero de celular debe empezar por 6 o 7",
        },
        integer: { message: "El n\xfamero de celular no es v\xe1lido" },
        stringLength: {
          max: 8,
          min: 8,
          message: "El n\xfamero de celular debe tener 8 d\xedgitos",
        },
      },
    },
    id_municipio: {
      validators: { notEmpty: { message: "Esta pregunta es obligatoria" } },
    },
    sugerencia: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ., ]+$/i,
          message:
            "El nombre puede contener caracteres alfab\xe9ticos y espacios",
        },
      },
    },
    captcha: {
      validators: { notEmpty: { message: "Esta pregunta es obligatoria" } },
    },
  },
  plugins: {
    trigger: new FormValidation.plugins.Trigger(),
    bootstrap: new FormValidation.plugins.Bootstrap5({
      rowSelector: ".fv-row",
      eleInvalidClass: "",
      eleValidClass: "",
    }),
  },
});
const submitButton = document.getElementById("btn-submit-informacion-area");
submitButton.addEventListener("click", function (e) {
  e.preventDefault(),
    validator &&
      validator.validate().then(function (e) {
        if ("Valid" == e) {
          submitButton.setAttribute("data-kt-indicator", "on"),
            (submitButton.disabled = !0);
          let a = new FormData($("#frm-informacion-areas")[0]);
          $.ajax({
            type: $("#frm-informacion-areas").attr("method"),
            url: $("#frm-informacion-areas").attr("action"),
            data: a,
            cache: !1,
            contentType: !1,
            processData: !1,
            dataType: "JSON",
          }).done(function (e) {
            submitButton.removeAttribute("data-kt-indicator"),
              (submitButton.disabled = !1),
              void 0 !== e.success &&
                (generarCaptcha(),
                limpiarCampos(),
                Swal.fire({
                  title: "\xa1\xc9xito!",
                  text: "\xa1Gracias por registrarse!",
                  icon: "success",
                  showCancelButton: !1,
                  confirmButtonText: "Ok",
                })),
              void 0 !== e.error &&
                Swal.fire({
                  title: e.error,
                  icon: "error",
                  showCancelButton: !1,
                  confirmButtonText: "Ok",
                }).then(function (e) {
                  e.value && limpiarCampos();
                }),
              void 0 !== e.info &&
                (generarCaptcha(),
                Swal.fire({
                  title: "\xa1Error!",
                  text: e.info,
                  icon: "info",
                  showCancelButton: !1,
                }));
          });
        }
      });
});
const limpiarCampos = () => {
  $("#id_area").val([]).trigger("change"),
    $("#nombre").val(""),
    $("#celular").val(""),
    $("#sugerencia").val(""),
    $("#id_municipio").val("").trigger("change");
};
// $(document).ready(function () {
//   appMaster.preLoader();
// }),
//   (document.oncontextmenu = function () {
//     return !1;
//   }),
//   $(document).keydown(function (e) {
//     return (
//       123 != e.keyCode &&
//       (!e.ctrlKey || !e.shiftKey || 73 != e.keyCode) &&
//       void 0
//     );
//   });
