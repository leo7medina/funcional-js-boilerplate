const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

let description = document.getElementById('txtdescripcion');
let calorias = document.getElementById('txtcalorias');
let carbohidratos = document.getElementById('txtcarbohidratos');
let proteinas = document.getElementById('txtproteinas');

const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj);
  const attrs = []

  for(let i=0; i < keys.length; i++){
    let attr = keys[i];
    attrs.push(attr);
  }

  const cadena = attrs.join('');
  return cadena;
}

const tagAttrs = obj => (content = "") => 
`<${obj.tag} ${obj.attrs}></>`;

const tag =  t => content => `<${t}>${content}</${t}>`

let list = [];

description.keypress(() => {
  description.removeClass('is-invalid');
});
calorias.keypress(() => {
  calorias.removeClass('is-invalid');
});
carbohidratos.keypress(() => {
  carbohidratos.removeClass('is-invalid');
});
proteinas.keypress(() => {
  proteinas.removeClass('is-invalid');
});

const validarInputs = () => {
  description.val() ? '' : description.addClass('is-invalid');
  calorias.val() ? '' : calorias.addClass('is-invalid');
  carbohidratos.val() ? '' : carbohidratos.addClass('is-invalid');
  proteinas.val() ? '' : proteinas.addClass('is-invalid');

  if (
    escription.val() === '' ||
    calorias.val() === '' ||
    carbohidratos.val() === '' ||
    proteinas.val()
  ) {

  } else {
    add();
    cleanInputs();
  }
};

const add = () => {
  const newItem = {
    descripcion: description.val(),
    calorias: parseInt(calorias.val()),
    carbohidratos: parseInt(carbohidratos.val()),
    proteinas: parseInt(proteinas.val())
  }
  list.push(newItem);
}

const cleanInputs = () => {
  description.val('') ;
  calorias.val('');
  carbohidratos.val('');
  proteinas.val('');
}

