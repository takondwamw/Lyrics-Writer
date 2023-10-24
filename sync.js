const lyrics = {};
let nextIndex = 1;
function addLyric () {
	const timestampInput = document.getElementById('timestamp');
	const lyricInput = document.getElementById('lyric');

	const timestamp =  parseFloat (timestampInput.value);
	const lyric = lyricInput.value.trim();

	if (isNaN(timestamp) || lyric === '') {
		alert("enterea valid timestamp and lyrics");
		return
	}

	
	lyrics[nextIndex] = {timestamp,lyric} ;
	nextIndex++;
	timestampInput.value = "";
	lyricInput.value = "";
	displayLyrics();
	displayEditSection();
	const addlyricBtn = document.getElementById('addLyricBtn');
	addlyricBtn.textContent = "save changes";
	console.log(lyrics);

}

function displayLyrics(){
	const lyricsDisplay = document.getElementById('lyricsDisplay');
	lyricsDisplay.inneHTML = '';
	Object.entries(lyrics).forEach(([index, {timestamp,lyric} ]) =>{
		const span = document.createElement("span");
		const p = documejnt.createElement('p');
		span.textContent = `[${parseFloat(timestamp).toFixed(2)}s]`;
		p.textContent = `${lyric}`;
 		lyricsDisplay.appendChild(span);
 		lyricsDisplay.appendChild(p);

	})
}

function displayEditSection(){
	const lyricsList = document.getElementById("lyricsList");
	lyricsList.innerHTML = '';
	let li;
	Object.entries(lyrics).forEach(([index, {timestamp,lyric}]) => {
		li = document.createElement("li");
		
		li.innerHTML = `<span>[ ${parseFloat(timestamp).toFixed(2)} s] ${lyric}</span>
						 
						 <button class="editBtn" data-index="${index}">Edit</button>`
	    lyricsList.appendChild(li);
	})

	const  editButtons = document.querySelectorAll('.editBtn');
	editButtons.forEach((btn) =>{
		btn.addEventListener('click',editLyrics);
	})
}
// will finish it soon
function editLyrics(){
	const timestampInput = document.getElementById("timestamp");
	const lyricInput = document.getElementById('lyric');
	const addlyricBtn = document.getElementById('addLyricBtn');
	const index = this.dataset.index;
	const {timestamp, lyric} = lyrics[index];

	timestampInput.value = parseFloat(timestamp).toFixed(2);
	lyricInput.value = lyric;
	addlyricBtn.textContent = "save changes";
	addlyricBtn.dataset.index = index;
	
}

// to populate the timestamp value based on the current play time
function populateTimestampInput(){
	const timestampInput = document.getElementById("timestamp");
	const audio = document.getElementById('audio');
	audio.addEventListener('timeupdate',() =>{
		timestampInput.value = audio.currentTime.toFixed(2);
	})
}

function updateTimeStampOnsliderChange(){
	const timestampInput = document.getElementById("timestamp");
	const audio = document.getElementById('audio');
	const maxDuration = audio.Duration;
	const sliderValue = parseFloat(audio.value);
	if(isNaN(sliderValue) && sliderValue <= maxDuration){
		timestampInput.value = sliderValue.tofixed(2);
	}
}


function playSong(){
	const audio = document.getElementById('audio');
	let currentIndex =0;
	audio.addEventListener('timeupdate', () => {
		const currentTime = audio.currentTime;
		const timestamps = Object.keys(lyrics).map(parseFloat);

		//  find the next index greater than the current index;
		while(currentIndex < timestamps.length && timestamps[currentIndex]){
			currentIndex++;
		}

		// display the coresponding lyric

		if (currentIndex > 0 ) {
			currentIndex --;
			const lyricsDisplay = document.getElementById('lyricsDisplay');
			lyricsDisplay.innerHTML = `[${timestamps[currentIndex].toFixed(2)}s],
									   ${lyrics[timestamps[currentIndex]]}`;
		}

	})

	audio.play();
}
// event Listeneres
const lyricBtn = document.getElementById('addLyricBtn')
      lyricBtn.addEventListener('click',addLyric);
const lyricForm = document.getElementById('lyricsForm')
	  lyricForm.addEventListener('submit',(e) => {
	e.preventDefault();
	addLyric();

});
document.getElementById('audio').addEventListener('canplay',playSong);

document.getElementById('audio').addEventListener('play',populateTimestampInput);
document.getElementById('audio').addEventListener('input', updateTimeStampOnsliderChange);


