let minutes = 25; // Default to 25 min
let seconds = minutes * 60;
let milli = seconds * 1000; 
let initialMilli;
let secondsLeft;
let timer;
let flashInterval; 
let paused = false;

// Main Buttons
let start = () => {
   document.getElementById('start').disabled = true;
   document.getElementById('pause').disabled = false;
   initialMilli = Date.now();    

   if (paused) {
      clearInterval(timer);
      paused = false;
      pomodoro(secondsLeft, initialMilli);
      return;
   } else {
      pomodoro(seconds, initialMilli);   
   }
};

let pause = () => {
   document.getElementById('start').disabled = false;
   document.getElementById('pause').disabled = true;
   paused = true;
};

let reset = () => {
   document.getElementById('start').disabled = false;
   document.getElementById('pause').disabled = true;
   document.getElementById('tomato').style.backgroundColor = 'white';
   paused = false;
   clearInterval(flashInterval);
   clearInterval(timer);
   printTime(seconds);
};

// Secondary Buttons
let short = () => {
   minutes = 2;
   seconds = minutes * 60;
   milli = seconds * 1000;
   reset(); 
   printTime(seconds);
}

let medium = () => {
   minutes = 15;
   seconds = minutes * 60;
   milli = seconds * 1000;
   reset();
   printTime(seconds);
}

let long = () => {
   minutes = 25;
   seconds = minutes * 60;
   milli = seconds * 1000;
   reset();
   printTime(seconds);
}

// Timer Functions
let pomodoro = (seconds, initialMilli) => {
   console.log('Total Seconds: ' + seconds);  
   timer = setInterval( () => {
      if (!paused) {      
         let delta = getDeltaSec(initialMilli);
         secondsLeft = seconds - delta;
         console.log('Seconds Left: ' + secondsLeft);   
      }
      
      printTime(secondsLeft);

      if (!secondsLeft) {
         clearInterval(timer);
         document.getElementById('start').disabled = true;
         document.getElementById('pause').disabled = true;
         let ding = new Audio('assets/ding.mp3');
         ding.play();
         flash();
      }

   }, 1000);
};

let flash = () => {
   let toggle = true;
   flashInterval = setInterval( () => {
      if (toggle) {
         document.getElementById('tomato').style.backgroundColor = 'blue';
         toggle = false;
         console.log(toggle);
      } else {
         document.getElementById('tomato').style.backgroundColor = 'red';
         toggle = true;
         console.log(toggle); 
      }
   }, 500);
}

let getDeltaSec = (initialMilli) => {
   let deltaMilli = Date.now() - initialMilli;
   let deltaSec = Math.floor(deltaMilli / 1000);
   return (deltaSec);
};

let printTime = (seconds) => {
   let minutes = Math.floor(seconds / 60);
   seconds = seconds % 60;
   document.getElementById('clock').innerHTML = 
      minutes.toString().padStart(2, '0') + 
      ":" + 
      seconds.toString().padStart(2, '0');
   document.title = 
      minutes.toString().padStart(2, '0') + 
      ":" + 
      seconds.toString().padStart(2, '0');
};