/**
 * Morse Code Translator
 * 
 * Use the Letters API built for this interview:
 * https://safetybelt.pythonanywhere.com/letters/<LETTER>
 * 
 *  For example, a GET call to https://safetybelt.pythonanywhere.com/letters/s will return:
 *      {
 *          "code": "..."
 *      }
 * 
 * The API only handles one letter at a time
 *
 * Letters should be broken up with a space.
 * Feel free to use any process for differentiating the space between letters and words
 *     I recommend something like a / or | between words; ie 'dog cat' => '-.. --- --. / -.- .- -'
 *
 * Also feel free to modify this code or the HTML as much as needed.  You do not need to use this structure.
 */

const getMorseCode = async (letter) => {
    const { data } = await axios.get(`https://safetybelt.pythonanywhere.com/letters/${letter}`);
    console.log('data', data);
    return data;
};

const generateOutput = async (input) => {
    const output = document.getElementById('result-content');

    console.log('input', input)
    const inputArray = Array.from(input);
    console.log('inputArray', inputArray)

    const morseArray = [];
    for (let i = 0; i < inputArray.length; i++) {
        const item = inputArray[i];
        const res = getMorseCode(item).then((data) => {
            result = data?.code;
            return result;
        });
        console.log('res', res)
        morseArray.push(res);
    }

    const test = await Promise.all(morseArray)

    console.log('morseArray', morseArray)
    console.log('test', test)


    output.innerHTML = test.join(" ") || "";
}

document.getElementById('text-input').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('text-to-convert');
    generateOutput(input.value);
});
