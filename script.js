var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(200, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

let urbanizaciones = [];
getJSON("datos.json", (status, response) => {
  if (status == 200 && !!response.urbanizaciones) {
    urbanizaciones = response.urbanizaciones;
  }
  mostrarTodasLasVillas();
});

function mostrarTodasLasVillas() {
  for (indice in urbanizaciones) {
    let villa = urbanizaciones[indice];
    let el = document
      .getElementById("m" + villa.manzana)
      .getElementsByClassName("v" + villa.villa)[0]
      .style.background = getColor(villa.estado)

  }

  setSelectedLink("residentes");
}

function mostrarResidentesDeuda() {
  for (indice in urbanizaciones) {
    let villa = urbanizaciones[indice];
    let el = document
      .getElementById("m" + villa.manzana)
      .getElementsByClassName("v" + villa.villa)[0];

    if (villa.estado == "rojo" || villa.estado == "amarillo") {
      el.style.background = getColor(villa.estado);
    } else {
      el.style.background = "white";
    }
  }
  setSelectedLink("deudas");
}

function mostrarResidentesSinDeuda() {
  for (indice in urbanizaciones) {
    let villa = urbanizaciones[indice];
    let el = document
      .getElementById("m" + villa.manzana)
      .getElementsByClassName("v" + villa.villa)[0];

    if (villa.estado == "verde") {
      el.style.background = getColor(villa.estado);
    } else {
      el.style.background = "white";
    }
  }
  setSelectedLink("sin-deudas");
}

function mostrarResidentesSinPropietarios() {
  for (indice in urbanizaciones) {
    let villa = urbanizaciones[indice];
    let el = document
      .getElementById("m" + villa.manzana)
      .getElementsByClassName("v" + villa.villa)[0];

    if (villa.estado == "gris") {
      el.style.background = getColor(villa.estado);
    } else {
      el.style.background = "white";
    }
  }
  setSelectedLink("sin-propietarios");
}

function setSelectedLink(link_id) {
  let els = document.getElementsByClassName('link-menu');
  for (index in els) {
    let el = els[index]
    el.className = "link-menu"
  }
  document.getElementById(link_id).className = "link-menu selected";
}

function getColor(color) {
  switch (color) {
    case 'verde':
      return 'green';
    case 'rojo':
      return 'red';
    case 'amarillo':
      return 'yellow';
  }
  return 'lightgray';
}


