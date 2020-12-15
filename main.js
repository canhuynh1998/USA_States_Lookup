
//connect element from html file
const search = document.getElementById('search');       
const matchList = document.getElementById('match-list');


//search.readOnly = false;

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
    // $('search').
    //$("input[type='text']").on("placeholder",matches[0].name);
    //$('input[name="state"]').attr('placeholder', matches[0].name.text()); 
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
        <div class ="option" id ="selection:>
        <input type="radio" class ="radio" readonly ="false">
        <label>${match.name}</label>
        </div>
        </div>
        </div>

        `)
        .join('');
        console.log("Hi");
        matchList.innerHTML =html;

        
        $('.option').on('click', function(event){
            search.value = ($(this).text().trim());
            console.log($(this).text());    //testing in the console.
            matches = [];   //clear the array when targeted State is clicked
            matchList.innerHTML = '';   // clear the screen
        });

    }
}

search.addEventListener('input',() => searchStates(search.value));  //event listener

