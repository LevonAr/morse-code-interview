const getMorseCode = async (letter) => {
    const { data } = await axios.get(`https://safetybelt.pythonanywhere.com/letters/${letter}`);
    return data;
};

const generateOutput = async (input) => {
    const output = document.getElementById('result-content');

    const inputArray = Array.from(input);

    const morseArray = [];
    for (let i = 0; i < inputArray.length; i++) {
        const letter = inputArray[i];
        const morseLetter = getMorseCode(letter).then((data) => (data?.code));
        morseArray.push(morseLetter);
    };
    const result = await Promise.all(morseArray).join('') || '';

    output.innerHTML = result;
}

document.getElementById('text-input').addEventListener('submit', (e) => {
    const input = document.getElementById('text-to-convert');

    e.preventDefault();

    generateOutput(input.value);
});
