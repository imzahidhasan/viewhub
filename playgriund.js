// setTimeout(() => {
//   console.log("this is a massage from me");
// }, 1000);
// const delayedGreeting = (name, time) => {
//   setTimeout(() => {
//     console.log(`hello,${name}`);
//   }, time);
// };


let num=0
const url='https://v2.jokeapi.dev/joke/Programming?type=single'
async function tellJoke() {
    const res = await fetch(url)
    const getJoke = await res.json()
    num++
    console.log(`%c${num}   ${getJoke.joke}`);
    console.log("____________________________________________________________");
    }

const jokeInterval = setInterval(() => tellJoke(), 1000);
    setTimeout(() => {
        clearInterval(jokeInterval)
    },20000 );