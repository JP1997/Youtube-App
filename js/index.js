
let urlSearch;
let videoTerm;

function handleFetch(videoTerm,callback){
	
	$.ajax({
	   url : urlSearch,
	   method : "GET",
	   data: {
	   		apiKey: "AIzaSyC0kgqZuqwAlJgf6T9kXhm5Q67s89R5doU" ,
	   		q: videoTerm,
	   },
	   dataType : "json",
	   success : responseJson => callback(responseJson),
	   error : err => console.log(err)
	 });
}


function displayResults(data){


	for(let i = 0 ; i < data.items.length; i++){
		$('.results').append(`

			<div class="video">
				<div class="videoTitle">
					<a href = "https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target = "-blank" >
						<h3> ${data.items[i].snippet.title}
						</h3>
					</a>
				</div>
				<div class="videoChannel">
					<a href = "https://www.youtube.com/channel/${data.items[i].snippet.channelId}" target = "-blank" >
						<h4> ${data.items[i].snippet.channelTitle}
						</h4>
					</a>
				</div>
				<div class="videoImage">
					<a href = "https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target = "-blank" >
					<img src= "${data.items[i].snippet.thumbnails.medium.url}" alt="${data.items[i].snippet.title} Image" />
					</a>
				</div>
			`)
	}

	addButtons(data); 

}

function addButtons(data){

  $(".buttons").html("");
 
  if(data.nextPageToken)
  {
    let NextButton=$(`
    				  <div>
                      <button id= "nextVideosButton" type="submit" class="buttons">
                        Next videos
                      </button>
                      </div>
                    `);
    

    $(NextButton).on("click", function(event){

        urlSearch = `https://www.googleapis.com/youtube/v3/search?pageToken=${data.nextPageToken}&part=snippet&maxResults=10&q=${videoTerm}&key=AIzaSyC0kgqZuqwAlJgf6T9kXhm5Q67s89R5doU`;
        handleFetch(videoTerm, displayResults);
      
    });

    $(".buttons").append(NextButton);
  }

}  

function watchForm(){
	$('#videosubmitButton').on("click", function(event) {
		event.preventDefault();
		
		videoTerm = $('#videoSearchBox').val();

		urlSearch = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC0kgqZuqwAlJgf6T9kXhm5Q67s89R5doU&maxResults=10&q=${videoTerm}&part=snippet`;
		handleFetch(videoTerm,displayResults);
	});
}

$(watchForm);

