// Ищем и записываем в переменные необходимые html-элементы
const txtInpErr = document.querySelector('.text_for_input');
const placeImg = document.querySelector('.place_for_images');
const btnNode = document.querySelector('.btn_to_submit');

// Назначаем обработчик событий на клик по кнопке
btnNode.addEventListener('click', () => {
  // очищаем поля для отображения сообщения об ошибке и размещения картинок  
  txtInpErr.innerHTML = '';
  placeImg.innerHTML = '';
  // записываем в переменные значения полей input
  const pageNum = document.querySelector('#num_page').value;
  const limit = document.querySelector('#limit').value;
  // реализуем проверку на соответствие введенных данных требованиям
  if ((pageNum < 1 || pageNum > 10 || isNaN(pageNum)) && (limit < 1 || limit > 10 || isNaN(limit))){
    txtInpErr.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
  } else if (pageNum < 1 || pageNum > 10 || isNaN(pageNum)){
    txtInpErr.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
  } else if (limit < 1 || limit > 10 || isNaN(limit)){
    txtInpErr.innerHTML = 'Лимит вне диапазона от 1 до 10';
  } else {
    // реализуем запрос данных
     fetch(`https://picsum.photos/v2/list?page=${pageNum}&limit=${limit}`)
      .then((response) => {
        console.log('response', response);
        // преобразуем объект response в JSON
        const result = response.json();
        // возвращаем его для следующего then
        return result;
      })     
      .then((data) => {
        // объявляем переменную для картинок
        let cards = '';
        // назначаем действие для каждого элемента массива
        data.forEach(item => {
        const cardBlock = `
          <div class="card">
            <img
              src="${item.download_url}"
              class="card-image"
            />
          </div>
        `;
        // добавляем данные по каждому элементу в переменную
        cards = cards + cardBlock;
        })
      // вносим дынные в html
      placeImg.innerHTML = cards;
      // преобразуем данные в JSON для сохранения в localStorage
      const cardsJSON = JSON.stringify(cards);
      localStorage.setItem('pictures', cardsJSON);
      })
      // на случай ошибки
      .catch(() => { console.log('error') })
  };
});

// функция для отображения картинок из последнего успешно выполненного
// запроса при загрузке/перезагрузке страницы 
window.onload = () => {
  const loaded = localStorage.getItem('pictures');
  if (loaded){
    placeImg.innerHTML = JSON.parse(loaded);
  } else {
    console.log("empty")
  }
}
