"use strict";
var KTPreinscripcion = (function () {
  var e,
    a,
    t,
    i,
    o,
    n = [];
  return {
    init: function () {
      (a = (e = document.querySelector(
        "#preinscripcion_stepper"
      )).querySelector("#frm-preinscripcion")),
        (t = e.querySelector('[data-kt-stepper-action="submit"]')),
        (i = e.querySelector('[data-kt-stepper-action="next"]')),
        (o = new KTStepper(e)).on("kt.stepper.changed", function (e) {
          4 === o.getCurrentStepIndex()
            ? (t.classList.remove("d-none"),
              t.classList.add("d-inline-block"),
              i.classList.add("d-none"))
            : 5 === o.getCurrentStepIndex()
            ? (t.classList.add("d-none"), i.classList.add("d-none"))
            : (t.classList.remove("d-inline-block"),
              t.classList.remove("d-none"),
              i.classList.remove("d-none"));
        }),
        o.on("kt.stepper.next", function (a) {
          var e = n[a.getCurrentStepIndex() - 1];
          e
            ? e.validate().then(function (e) {
                "Valid" == e
                  ? (a.goNext(), KTUtil.scrollTop())
                  : Swal.fire({
                      text: "Por favor, llene los campos obligatorios.",
                      icon: "warning",
                      buttonsStyling: !1,
                      confirmButtonText: "Ok",
                      customClass: { confirmButton: "btn btn-light" },
                    }).then(function () {
                      KTUtil.scrollTop();
                    });
              })
            : (a.goNext(), KTUtil.scrollTop());
        }),
        o.on("kt.stepper.previous", function (e) {
          e.goPrevious(), KTUtil.scrollTop();
        }),
        n.push(
          FormValidation.formValidation(a, {
            fields: {
              ci: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                  stringLength: {
                    max: 11,
                    message: "El número de carnet puede tener hasta 11 dígitos",
                  },
                },
              },
              expedido: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                },
              },
              correo: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                  emailAddress: {
                    message: "El correo debe ser un correo válido",
                  },
                },
              },
              nombre: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                  regexp: {
                    regexp: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/i,
                    message:
                      "El nombre puede contener caracteres alfabéticos y espacios",
                  },
                },
              },
              paterno: {
                validators: {
                  regexp: {
                    regexp: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/i,
                    message:
                      "El apellido paterno puede contener caracteres alfabéticos y espacios",
                  },
                },
              },
              materno: {
                validators: {
                  regexp: {
                    regexp: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/i,
                    message:
                      "El apellido materno puede contener caracteres alfabéticos y espacios",
                  },
                },
              },
              genero: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                },
              },
              dia: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                },
              },
              mes: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                },
              },
              gestion: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                },
              },
              celular: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                  regexp: {
                    regexp: /^(7|6)?[0-9]{7}$/i,
                    message: "El número de celular debe empezar por 6 o 7",
                  },
                  integer: { message: "El número de celular no es válido" },
                  stringLength: {
                    max: 8,
                    min: 8,
                    message: "El número de celular debe tener 8 dígitos",
                  },
                },
              },
              ciudad_residencia: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                },
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
          })
        ),
        n.push(
          FormValidation.formValidation(a, {
            fields: {
              modalidad_inscripcion: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                },
              },
              id_banco: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                },
              },
              nro_transaccion: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                },
              },
              respaldo_transaccion: {
                validators: {
                  notEmpty: {
                    message: "La imagen de respaldo de pago es obligatoria",
                  },
                  file: {
                    extension: "png,jpg,jpeg",
                    type: "image/jpeg,image/png, image/jpg",
                    message: "La selección del archivo no es válido",
                  },
                },
              },
              fecha_pago: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                },
              },
              monto_pago: {
                validators: {
                  notEmpty: { message: "Esta pregunta es obligatoria" },
                  between: {
                    min: 50,
                    max: 1e3,
                    message: "El monto de pago debe estar entre 50 y 1000 Bs.",
                  },
                },
              },
              avatar: {
                validators: {
                  notEmpty: { message: "Seleccione una imagen" },
                  file: {
                    extension: "jpg,jpeg",
                    type: "image/jpeg,image/png",
                    message: "La seleccion del archivo no es valido",
                  },
                },
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
          })
        ),
        n.push(
          FormValidation.formValidation(a, {
            fields: {},
            plugins: {
              trigger: new FormValidation.plugins.Trigger(),
              bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: ".fv-row",
                eleInvalidClass: "",
                eleValidClass: "",
              }),
            },
          })
        ),
        t.addEventListener("click", function (a) {
          n[2].validate().then(function (e) {
            "Valid" == e
              ? (a.preventDefault(),
                (t.disabled = !0),
                t.setAttribute("data-kt-indicator", "on"),
                (e = new FormData($("#frm-preinscripcion")[0])),
                $.ajax({
                  type: $("#frm-preinscripcion").attr("method"),
                  url: $("#frm-preinscripcion").attr("action"),
                  data: e,
                  cache: !1,
                  contentType: !1,
                  processData: !1,
                  dataType: "JSON",
                }).done(function (e) {
                  const id_preinscripcion = e.id;
                  (t.disabled = !1),
                    t.setAttribute("data-kt-indicator", "off"),
                    void 0 !== e.exito &&
                      Swal.fire({
                        title: e.exito,
                        text: "¡Gracias por inscribirse!",
                        icon: "success",
                        showCancelButton: !1,
                        confirmButtonText: "Descargar Comprobante",
                      }).then(function (e) {
                        e.value &&
                          ($("#frm-preinscripcion").trigger("reset"),
                          window.open(
                            window.location.origin + "/imprimir-recibo/" + id_preinscripcion,
                            "_blank"
                          ),
                          location.reload());
                      }),
                    void 0 !== e.error &&
                      Swal.fire({
                        title: e.error,
                        icon: "error",
                        showCancelButton: !1,
                        confirmButtonText: "Ok",
                      }).then(function (e) {
                        e.value &&
                          (location.reload(),
                          limpiar_formulario(),
                          $("#frm_curso_inscripcion").trigger("reset"));
                      }),
                    void 0 !== e.warning &&
                      ($.each(response.warning, function (e, a) {
                        msg = msg + "- " + a + "<br>";
                      }),
                      Swal.fire({
                        title: msg,
                        icon: "warning",
                        showCancelButton: !1,
                        confirmButtonText: "Ok",
                      })),
                    void 0 !== e.info &&
                      Swal.fire({
                        title: e.info,
                        icon: "info",
                        showCancelButton: !1,
                        confirmButtonText: "Ok",
                      }).then(function (e) {
                        e.value &&
                          (location.reload(),
                          $("#frm-preinscripcion").trigger("reset"));
                      });
                }))
              : Swal.fire({
                  text: "Lo sentimos, parece que se han detectado algunos errores, inténtelo de nuevo.",
                  icon: "error",
                  buttonsStyling: !1,
                  confirmButtonText: "Ok",
                  customClass: { confirmButton: "btn btn-light" },
                }).then(function () {
                  KTUtil.scrollTop();
                });
          });
        });
    },
  };
})();
KTUtil.onDOMContentLoaded(function () {
  $("#gestion").change(function () {
    0 < $(this).val().length
      ? $("#mes").removeAttr("disabled")
      : $("#mes").attr("disabled", "disabled");
  }),
    $("#mes").change(function () {
      0 < $(this).val().length
        ? $("#dia").removeAttr("disabled")
        : $("#dia").attr("disabled", "disabled");
    }),
    $("#fecha").on("change", "#gestion, #mes", function (e) {
      var a = parseInt($("#gestion").val()),
        t = parseInt($("#mes").val()) - 1,
        t = Date.getDaysInMonth(a, t);
      i(t);
    }),
    document.getElementById("celular").addEventListener("input", function () {
      8 < this.value.length && (this.value = this.value.slice(0, 8));
    }),
    document.getElementById("ci").addEventListener("input", function () {
      11 < this.value.length && (this.value = this.value.slice(0, 11));
    }),
    document
      .getElementById("nro_transaccion")
      .addEventListener("input", function () {
        20 < this.value.length && (this.value = this.value.slice(0, 20));
      }),
    $("#banco").hide(),
    $("input[type=radio][name=modalidad_inscripcion]").change(function () {
      "TIGO MONEY" == this.value || "PAGO EFECTIVO" == this.value
        ? ($("#id_banco").append(
            '<option value="BANCO" selected>BANCO</option>'
          ),
          $("#banco").hide())
        : ($("#id_banco option[value='BANCO']").remove(), $("#banco").show());
    }),
    $("#respaldo_transaccion").on("change", function () {
      var e,
        a = this.files[0];
      "image/jpeg" != a.type && "image/png" != a.type
        ? ($("#respaldo_transaccion").val(""),
          Swal.fire(
            "Error!",
            "¡La imagen debe estar en formato JPG o PNG!",
            "error"
          ))
        : 7e6 < a.size
        ? ($("#respaldo_transaccion").val(""),
          Swal.fire("error", "La imagen no debe pesar más de 7MB!", "error"))
        : ((e = new FileReader()).readAsDataURL(a),
          $(e).on("load", function (e) {
            e = e.target.result;
            $("#img-preview").attr("src", e),
              $("#img-preview").attr("data-original", e);
          })),
        "" != $(this).val()
          ? $(".container").removeClass("d-none")
          : $(".container").addClass("d-none");
    }),
    $("#kt_wrapper").on(
      "change",
      "input[name=cupon_participante][type='radio']",
      function (e) {
        var a,
          t,
          i = $(this).val();
        "ninguno" != i
          ? ($("#costo_curso").css("text-decoration", "line-through"),
            (a = parseInt($("#costo_curso").data('costo'))),
            (t = $("#ci").val()),
            $.ajax({
              url: window.location.origin + "/porcentaje-cupon",
              method: "POST",
              data: { numero_cupon: i, ci: t },
            }).done(function (e) {
              console.log(e,a);
              $(".form-text-costo").text(
                "Total a pagar con el descuento por tu cupón: " +
                  Math.round(a - a * (e / 100)) +
                  " Bs."
              ),
                $(".form-text-costo").fadeTo(500),
                $("#monto_pago").focus();
            }))
          : ($("#costo_curso").removeAttr("style"),
            $(".form-text-costo").text(""),
            $("#monto_pago").val(),
            $("#monto_pago").focus());
      }
    ),
    $("#respaldo_transaccion").on("change", function () {
      var e,
        a = this.files[0];
      "image/jpeg" != a.type && "image/png" != a.type
        ? ($("#respaldo_transaccion").val(""),
          Swal.fire(
            "Error!",
            "¡La imagen debe estar en formato JPG o PNG!",
            "error"
          ))
        : 7e6 < a.size
        ? ($("#respaldo_transaccion").val(""),
          Swal.fire("error", "La imagen no debe pesar más de 7MB!", "error"))
        : ((e = new FileReader()).readAsDataURL(a),
          $(e).on("load", function (e) {
            e = e.target.result;
            $("#img-preview").attr("src", e),
              $("#img-preview").attr("data-original", e);
          })),
        "" != $(this).val()
          ? $(".container").removeClass("d-none")
          : $(".container").addClass("d-none");
    }),
    $("#frm-preinscripcion").change(function (e) {
      a();
    }),
    $("#ci").on("change", function (e) {
      var a = $(this).val();
      n(a), t($("#ci").val(), $("#id").val());
    });
  let i = (a) => {
      $("#dia").children().remove();
      let t = '<option value="" selected></option>';
      for (let e = 1; e <= a; e++)
        t += "<option value='" + e + "'>" + e + "</option>";
      $("#dia").append(t);
    },
    t = (e, a) => {
      $.post(
        window.location.origin + "/verificar-registro",
        { ci: e, id: a },
        function (e) {
          e.data &&
            Swal.fire({
              title: "Advertencia !!!",
              text: "Ya se encuentra registrado en el Curso.",
              icon: "warning",
              showCancelButton: !1,
              confirmButtonText: "OK",
              reverseButtons: !0,
            }).then(function (e) {
              e.value && (o(), $("#ci").val(""), $("#ci").focus());
            });
        }
      );
    },
    o = () => {
      $("#expedido").val("").trigger("change"),
        $("#correo").val(""),
        $("#nombre").val(""),
        $("#paterno").val(""),
        $("#materno").val(""),
        $("input[name=genero][value='M']").prop("checked", !0),
        $("#celular").val(""),
        $("#gestion").val("").trigger("change"),
        $("#mes").val("").trigger("change"),
        $("#dia").val("").trigger("change"),
        $("#ciudad_residencia").val("").trigger("change");
    },
    n = (e) => {
      4 <= e.length &&
        $.post(
          window.location.origin + "/verificar-cupon",
          { ci: e },
          function (e) {
            0 < e.cupones.length
              ? ($("#card-cupon").removeClass("d-none"),
                $("#card-cupon-body").empty(),
                $("#card-cupon-body").append(
                  '<label class="fs-6 fw-bold form-label mb-2">Aplicar cupón</label>'
                ),
                $("#card-cupon-body").append(
                  '<div class="radio-list form-group m-0">'
                ),
                e.cupones.forEach((e) => {
                  $("#card-cupon-body").append(
                    ' <label class="form-check form-check-custom form-check-solid mb-3"><input type="radio" class="form-check-input" name="cupon_participante" id="cupon_participante" value="' +
                      e +
                      '" /><span class="form-check-label" style="margin-right: 6px;"></span><div class="fw-bolder text-gray-500" style="cursor:pointer">' +
                      e +
                      "</div></label>"
                  );
                }),
                $("#card-cupon-body").append(
                  '<label class="form-check form-check-custom form-check-solid mb-1"><input type="radio" class="form-check-input" name="cupon_participante" id="cupon_participante" checked value="ninguno" /><span class="form-check-label" style="margin-right: 6px;"></span><div class="fw-bolder pointer text-gray-500" style="cursor:pointer">Ninguno</div></label>'
                ),
                $("#card-cupon-body").append("</div>"))
              : $("#card-cupon").addClass("d-none");
          }
        );
    },
    r = (e) =>
      e
        .split("")
        .map(function (e) {
          if (!isNaN(parseInt(e))) return e;
        })
        .filter(function (e) {
          return null != e;
        })
        .join(""),
    a = () => {
      let t = [];
      $("#frm-preinscripcion")
        .find("input, select")
        .each(function () {
          let e = null,
            a = [];
          "expedido" == this.name
            ? ((e = $('select[name="expedido"] option:selected').text()),
              a.push(this.name),
              a.push(this.value),
              a.push(e),
              t.push(a))
            : "ciudad_residencia" == this.name
            ? ((e = $(
                'select[name="ciudad_residencia"] option:selected'
              ).text()),
              a.push(this.name),
              a.push(this.value),
              a.push(e),
              t.push(a))
            : "genero" == this.name
            ? $(this).is(":checked") &&
              ((e = $("input[name=genero][type=radio]:checked").val()),
              a.push(this.name),
              a.push(this.value),
              a.push(e),
              t.push(a))
            : "cupon_participante" == this.name
            ? $(this).is(":checked") &&
              ((e = $(
                "input[name=cupon_participante][type=radio]:checked"
              ).val()),
              a.push(this.name),
              a.push(this.value),
              a.push(e),
              t.push(a))
            : "modalidad_inscripcion" == this.name
            ? $(this).is(":checked") &&
              ((e = $(
                "input[name=modalidad_inscripcion][type=radio]:checked"
              ).val()),
              a.push(this.name),
              a.push(this.value),
              a.push(e),
              t.push(a))
            : "tipo_certificado_solicitado" == this.name
            ? $(this).is(":checked") &&
              ((e = $(
                "input[name=tipo_certificado_solicitado][type=radio]:checked"
              ).val()),
              a.push(this.name),
              a.push(this.value),
              a.push(e),
              t.push(a))
            : "certificacion" == this.name
            ? $(this).is(":checked") &&
              ((e = $("input[name=certificacion][type=radio]:checked").val()),
              a.push(this.name),
              a.push(this.value),
              a.push(e),
              t.push(a))
            : (a.push(this.name), a.push(this.value), a.push(e), t.push(a));
        }),
        t.map((e) => {
          $("#m_" + e[0]).html(e[1] + " "),
            "ciudad_residencia" == e[0] && $("#m_" + e[0]).text(e[2]),
            "monto_pago" == e[0] && $("#m_" + e[0]).html(e[1] + " Bs."),
            "tipo_certificado_solicitado" == e[0] &&
              ("AMBOS" == e[1]
                ? $("#m_" + e[0]).html("DIGITAL Y FÍSICO")
                : $("#m_" + e[0]).html(e[1])),
            "certificacion" == e[0] &&
              ("MÓDULOS" == e[1]
                ? $("#m_" + e[0]).html(e[1] + " " + $("#span-modulos").text())
                : $("#m_" + e[0]).html(e[1]));
        });
    };
  KTPreinscripcion.init(),
    $("#frm-preinscripcion").on("submit", function (e) {
      e.preventDefault(), e.stopPropagation();
    }),
    $(".descargarQr").click(function (e) {
      var a = $(this).attr("src"),
        t = a.split(".").pop(),
        i = document.createElement("a");
      (i.download = !0),
        (i.download = $(this).data("curso") + "." + t),
        (i.href = a),
        (i.target = "_blank"),
        i.click();
    });
});
