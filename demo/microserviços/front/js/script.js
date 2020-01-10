$(document).ready(() => {
  function errorFunction(error) {
    $(".alert").removeClass(`alert-warning`);
    $(".alert").removeClass(`alert-danger`);
    $(".alert").removeClass(`alert-alert`);

    $(".alert").addClass(`alert-${error.type}`);
    $(".alert").html(error.message);

    $(".form-signin > input.btn").removeAttr("disabled");
    $(".form-signin > input.btn").val("Entrar");
  }

  $("#app").load("../fragments/login.html", () => {
    $(".form-signin").submit(e => {
      e.preventDefault();
      $(".form-signin > input.btn").attr("disabled", true);
      $(".form-signin > input.btn").val("Carregando...");

      $.post(
        "http://localhost:2000/login",
        {
          login: $("#form-login").val(),
          senha: $("#form-password").val()
        },
        data => {
          if (data.error.status) {
            errorFunction(data.error);
            return;
          }

          sessionStorage.setItem("token", JSON.stringify(data.result));
          $("#app").load("../fragments/todo.html");
          return;
        }
      ).fail(error => {
        console.log(error);

        if (error.status == 404)
          errorFunction({ type: "warning", message: "Pagina não encontrada!" });

        if (error.status == 500 || error.status == 0)
          errorFunction({
            type: "danger",
            message: "Ops! Ouve tivemos um erro!"
          });

        $(".form-signin > button").attr("disabled", true);
        $(".form-signin > button").text("Carregando...");
      });
    });
  });

  if (!!sessionStorage.getItem("token")) {
    $("#app").load("../fragments/todo.html");
    console.log("carregado!");
  }
});
