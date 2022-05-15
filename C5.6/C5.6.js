const txtInpErr = document.querySelector('.text_for_input');
const placeImg = document.querySelector('.place_for_images');
const btnNode = document.querySelector('.btn_to_submit');

btnNode.addEventListener('click', () => {
  txtInpErr.innerHTML = '';
  placeImg.innerHTML = '';
  const value_width = document.querySelector('.inp_width').value;
  const value_height = document.querySelector('.inp_height').value;
  if (value_width < 100 || value_width > 300 || value_height < 100 || value_height > 300 || isNaN(value_width) || isNaN(value_height)){
    txtInpErr.innerHTML = 'Одно из чисел вне диапазона от 100 до 300';
  } else {
     fetch(`https://picsum.photos/${value_width}/${value_height}`)
      .then((response) => {
        console.log('response', response);
        return response;
      })     
      .then((data) => {
      const cardBlock = `
      <div class="card">
        <img
          src="${data.url}"
        />
      </div>
      `;
      placeImg.innerHTML = cardBlock;
      })
      .catch(() => { console.log('error') })
  };
});

// HTML
{/* <block>
  <input class="inp_width" placeholder="Введите ширину">
  <input class="inp_height" placeholder="Введите высоту">
  <button class="btn_to_submit">Отправить</button>
</block>
<div class="text_for_input"></div>
<div class="place_for_images"></div> */}