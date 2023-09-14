
import { server } from "./server.js";

const form = document.querySelector('#form');
const input = document.querySelector('#url');
const paragraphContent = document.querySelector('#content');

async function handleSubmitForm(e) {
  e.preventDefault();
  paragraphContent.classList.add('placeholder');

  const videoURL = input.value;

  if (!videoURL.includes('shorts')) {
    return paragraphContent.textContent = 'O vídeo escolhido não parece ser um short. Por favor, escolha outro.'
  };

  const [ _, params ] = videoURL.split('/shorts/');
  const [ videoId ] = params.split('?si')

  paragraphContent.textContent = 'Obtendo o texto do áudio...';

  const transcription = await server.get(`/summary/${videoId}`);

  paragraphContent.textContent = 'Realizando o resumo...';

  const summary = await server.post('/summary', {
    text: transcription.data.result,
  });

  paragraphContent.textContent = summary.data.result;
  paragraphContent.classList.remove('placeholder');

};

form.addEventListener('submit', handleSubmitForm);
