
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


    let count = 0;      // keep track of times pressing the arrow keys
    let index = 0;      // keep track of the index of matches.
    $(document).keydown(function(event){    
        if(event.keyCode === 40){
           
            console.log(count);
            index = count % (matches.length );
            console.log(index + " "+ count+" "+matches.length);
        //    $('this.#selection').css( "background": "#39587e");
            search.value = matches[index].name;
            count++;
            // if(count ==)
        }else if(event.keyCode === 38){
            
            console.log(count);
            index = count % (matches.length);
            console.log(index + " "+ count+" "+matches.length);
            search.value = matches[index].name;
            count--;
            if(count < 0){
                count = matches.length-1;
            }
        }

        if(event.keyCode === 13){
            alert(matches[index].name)
        }

    });
}


//Show result in HTML
const outputHtml = matches =>{
    if(matches.length > 0){
        //This is for 1 match
        const html = matches.map(match => `
        <div class="select-box">
        <div class ="options-container">
        <div class ="option" id ="selection">
        <input type="radio"  class ="radio" readonly ="false">
        <label>${match.name}</label>
        </div>
        </div>
        </div>

        `)
        .join('');
        console.log("Hi");
        matchList.innerHTML =html;
        // // | event.keyCode === 38){
        //     count ++;
        let count = 0;      // keep track of times pressing the arrow keys
        let index = 0;      // keep track of the index of matches.
        

        $('.option').on('click', function(event){
            search.value = ($(this).text().trim());
            console.log($(this).text());    //testing in the console.
            matches = [];   //clear the array when targeted State is clicked
            matchList.innerHTML = '';   // clear the screen
        });

    }
}

search.addEventListener('input',() => searchStates(search.value));  //event listener

