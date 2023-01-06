const synth = window.speechSynthesis;

const inpuForm = document.querySelector('form');
const inputTxt = document.querySelector('.txt');
const voiceSelect = document.querySelector('select');

const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('.pitch-value');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('.rate-value');

const voices = [];


function populateVoiceList(){
    voices = synth.getVoices();

    for (const voice of voices){
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;

        if (voice.default) {
            option.textContent += '-DEFAULT';
        }

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    }
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

inpuForm.onsubmit = (event) => {
    event.preventDefault();

    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    const selecteOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (const voice of voices){
        if (voice.name === selecteOption){
            utterThis.voice = voice;
        }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);

    const char = event.utterance.text.cahrAt(event.charIndex);
    console.log(`Speech pauseed at character ${event.charIndex} of "${event.utterance.text}", "${char}".`);
}

pitch.onchange = () => {
    pitchValue.textContent = pitch.value;
}

rate.onchange = () => {
    rateValue.textContent = rate.value;
}