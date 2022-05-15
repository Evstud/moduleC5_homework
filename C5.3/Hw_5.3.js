const txtInpErr = document.querySelector('.text_for_input');
const placeImg = document.querySelector('.place_for_images');
const btnNode = document.querySelector('.btn_to_submit');

function checkInput (callback){
  txtInpErr.innerHTML = '';
  placeImg.innerHTML = '';
  const value = +document.querySelector('input').value;
  if (value < 1 || value > 10){
    txtInpErr.innerHTML = 'Число вне диапазона от 1 до 10';
  } else {
    const xhr = new XMLHttpRequest();
    const urlToUse = `https://picsum.photos/v2/list?limit=${value}`;
    xhr.open('GET', urlToUse, true);
    
    xhr.onload = function(){
      if (xhr.status != 200){
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback){
          callback(result);
        }
      }
    }
    xhr.onerror = function(){
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    xhr.send();
  };
};

function displayResult(apiData){
  let cards = '';
  
  apiData.forEach(item => {
    const cardBlock = `
    <div class="card">
      <img
        src="${item.download_url}"
        class="card-image"
      />
    </div>
    `;
  cards = cards + cardBlock;
  });
  placeImg.innerHTML = cards;
}

btnNode.addEventListener('click', () => {
  checkInput(displayResult);
}) 

// HTML
{/* <block>
  <input placeholder="Введите число" type="number">
  <button class="btn_to_submit">Отправить</button>
</block>
<div class="text_for_input"></div>
<div class="place_for_images"></div> */}

// CSS
// .card {
//     width: 100px;
//     margin: 20px
//   }
  
//   .card-image{
//     display: block;
//     width: 200px;
//     height: 150px
//   }
  
//   .text_for_input{
//     margin: 25px 0 0 0 
//   }