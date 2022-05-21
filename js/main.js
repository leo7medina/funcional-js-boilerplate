const compose = (...functions) => data => functions.reduceRight((value, func) => func(value), data)

let description = document.getElementById('txtdescripcion');
let calorias = document.getElementById('txtcalorias');
let carbohidratos = document.getElementById('txtcarbohidratos');
let proteinas = document.getElementById('txtproteinas');

const attrsToString = (obj = {}) =>
  Object.keys(obj)
    .map(attr => `${attr}="${obj[attr]}"`)
    .join(' ')


const tagAttrs = obj => (content = '') => 
`<${obj.tag} ${obj.attrs ? ' ' :	 ''} ${attrsToString(obj.attrs)}> ${content} </${obj.tag}>`;

const tag = t => typeof t === 'string' ? tagAttrs({tag: t}) : tagAttrs(t);

const tableRowTag = tag('tr');
const tableRow = items => compose(tableRowTag, tableCells)(items);

const tableCell = tag('td');
const tableCells = items => items.map(tableCell).join('');

const trashIcon = tag({tag: 'i', attrs: {class: 'fas fa-trash-alt'}})('');

let list = [];

description.onkeypress = () => {
  description.classList.remove('is-invalid');
};
calorias.onkeypress = () => {
  calorias.classList.remove('is-invalid');
};
carbohidratos.onkeypress = () => {
  carbohidratos.classList.remove('is-invalid');
};
proteinas.onkeypress = () => {
  proteinas.classList.remove('is-invalid');
};

validarInputs = () => {
  console.log('validacion');
  description.value ? '' : description.classList.add('is-invalid');
  calorias.value ? '' : calorias.classList.add('is-invalid');
  carbohidratos.value ? '' : carbohidratos.classList.add('is-invalid');
  proteinas.value ? '' : proteinas.classList.add('is-invalid');

  if (
    description.value === '' ||
    calorias.value === '' ||
    carbohidratos.value === '' ||
    proteinas.value === ''
  ) {

  } else {
    add();
  }
};

const add = () => {
  const newItem = {
    descripcion: description.value,
    calorias: parseInt(calorias.value),
    carbohidratos: parseInt(carbohidratos.value),
    proteinas: parseInt(proteinas.value)
  }
  list.push(newItem);
  updateTotals()
  cleanInputs()
  renderItems()
}

const cleanInputs = () => {
  description.value = '' ;
  calorias.value = '';
  carbohidratos.value = '';
  proteinas.value = '';
}

const removeItem = (index) => {
  list.splice(index, 1)

  updateTotals()
  renderItems()
}

const updateTotals = () => {
  let calories = 0;
  let carbs = 0;
  let protein = 0;

  list.map(item => {
    calories += item.calorias,
    carbs += item.carbohidratos,
    protein += item.proteinas
  });

  $('#totalCalories').text(calories);
  $('#totalCarbs').text(carbs);
  $('#totalProtein').text(protein);
}

const renderItems = () => {
  $('tbody').empty()

  list.map((item, index) => {

    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-danger',
        onclick: `removeItem(${index})`
      }
    })(trashIcon)
    const content = tableRow([item.descripcion, item.calorias, item.carbohidratos, item.proteinas, removeButton]);
    console.log(content);
    $('tbody').append(content);
  })
}
