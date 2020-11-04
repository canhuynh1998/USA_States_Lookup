
//connect element from html file
const search = document.getElementById('search');       
const matchList = document.getElementById('match-list');


//Search state.json and fliter
const searchStates = async searchText =>{

    //Fetching data
    const response = await fetch('..\\data\\state.json');
    const states = await response.json();

    //console.log(states);

    //Get matches from input
    let matches = states.filter(state =>{
        const regex = new RegExp(`${searchText}`,'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });
    console.log(matches);
    
    //Make sure there are only at max 8 results
    while(matches.length > 8){
        matches.pop();
    }
    
    //Display nothing initially or nothing matches
    if(searchText.length === 0 || matches.length == 0){
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);

}

//Show result in HTML
const outputHtml = matches =>{
    if(matches.length > 0){
        //This is for 1 match
        const html = matches.map(match => `
        <div class="select-box">
        <div class ="options-container">
        <div class ="option">
        <input type="radio" class ="radio">
        <label>${match.name}</label>
        </div>
        </div>
        </div>
        `)
        .join('');
        matchList.innerHTML =html;
        
        $('.option').on('click', function(){
            $('#form')[0].reset();
            $('input[name="state"]').attr('placeholder',$(this).text());    //write the result back into the placeholder
            console.log($(this).text());    //testing in the console.
            matches = [];   //clear the array when targeted State is clicked
            matchList.innerHTML = '';   // clear the screen
        });

        // $('.option').on('click', function(){
        //     
        // })
        // $('#search').text(function(e){
        //     console.log(e.target.value);
        // });
        // // $('button').on('mouseenter', function(){
        // //     $('button').toggle();
        // // });

        // // $('button').on('mouseleave', function(){
        // //     $('button').toggle();
        // // });
        // $('button').on('click', function(){
        //     $('input').attr("placeholder",$(this).text());
        // });
    }
}

search.addEventListener('input',() => searchStates(search.value));  //event listener
// var button = document.getElementById('currentbutton')
// button.onclick = function(){
//     alert('Clicked');
// };

// search.addEventListener('keydown',() => searchStates(search.value));
// var button = document.getElementById('currentbutton')
// button.onclick = function(){
//     alert('Clicked');
// };
