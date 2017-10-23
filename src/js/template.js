// @ts-check
import { getDetailsTemplate } from './details-template.js';

export function appendCards(data) {
  let cardHTML = '';
  for (let i = 0; i < data.length; i++) {
    cardHTML += generateCard(data[i]);
  }
  document.getElementById('first-load').innerHTML = "";
  document.querySelector('.mdl-grid').insertAdjacentHTML('beforeend', cardHTML);
  //Force Redraw Fix for IE
  document.querySelector('.mdl-layout__content').style.display = 'none';
  document.querySelector('.mdl-layout__content').style.display = 'inline-block';
}

function generateCard(user) {
  let template = document.querySelector('#user-card').innerHTML;
  const title = user.name.first + ' ' + user.name.last;
  template = template.replace('{{title}}', title);
  template = template.replace('{{userId}}', user.userId);
  template = template.replace('{{image}}', user.picture.large);
  return template;
}
