function handleSubmit(event) {
    // Keep from reloading
    event.preventDefault();
    
    const inputValue = document.querySelector('.search-input').value;
    const searchQuery = inputValue.trim();
    console.log(searchQuery);
}

async function wikiSearch(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const json = await response.json();
}

// Store elements in variables
const form = document.querySelector(".search-form");
form.addEventListener('submit', handleSubmit);