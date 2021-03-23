let form = document.querySelector('#messege');

form.addEventListener('submit', checkAndSend);


function checkAndSend(e) {
   e.preventDefault();
   let userData = {};
   let error = formValidate(userData);

   if (error === 0) {
      document.body.classList.add('wait');
      sendData(userData);
   }
   else {
      alert('Заполните обязательные поля');
   }
}

// <Validation functions >
function formValidate(userData) {
   let error = 0;
   let req = document.querySelectorAll('.req');

   for (let i = 0; i < req.length; i++) {
      const input = req[i];
      const inputParent = input.parentElement;

      formRemoveErr(input, inputParent);

      if (input.classList.contains('email')) {
         if (mailTest(input)) {
            formAddError(input, inputParent);
            error++;
         }
         else {
            userData[input.id] = input.value;
         }
      }
      else {
         if (input.value === '') {
            formAddError(input, inputParent);
            error++;
         }
         else {
            userData[input.id] = input.value;
         }
      }
   }
   return error;
};

function formAddError(input, inputParent) {
   input.classList.add('err')
   inputParent.classList.add('err');
};

function formRemoveErr(input, inputParent) {
   input.classList.remove('err');
   inputParent.classList.remove('err');
};

function mailTest(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

// <Validation functions />

async function sendData(userData) {
   const token = '1602129274:AAFMlk371ENcxklOg0hPL78IJgT04xmRY8Q';
   const chat_id = '1039710604';
   // Перебирает наш массив
   let str = '';
   for (const key in userData) {
      if (Object.hasOwnProperty.call(userData, key)) {
         const element = userData[key];
         str += `<b>${key.toUpperCase()}</b> : ${element.trim()}%0A`
      }
   }

   // Удалить все символы новой строки!
   str = str.replace(/(\r\n|\n|\r)/gm, "");

   let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${str}`;
   // Request...
   let req = new XMLHttpRequest();
   req.open('GET', url);

   req.onload = () => {

      // Если всё OK
      if (req.status === 200) {
         alert('Данные отправлена, свяжусь в ближайшее время)')
      }

      // Если ошибка
      else {
         alert('Что-то пошло не так')
      }

      document.body.classList.remove('wait');
      form.reset();
   }

   req.send();
}