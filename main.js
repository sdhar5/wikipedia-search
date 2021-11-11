async function handleSubmit(event) {
    // Keep from reloading
    event.preventDefault();
    
    const inputValue = document.querySelector('.search-input').value;
    const searchQuery = inputValue.trim();

    // Try catch in case wikiSearch fails
    try {
        const results = await wikiSearch(searchQuery);
        displayResults(results);
    } catch (error) {
        console.log(error);
        alert('Wikipedia Search Failed');
    }
}

// Fetch search results from Wiki API
async function wikiSearch(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
}

function displayResults(results) {
    const searchResults = document.querySelector('.search-results');

    // Loop through each search result
    results.query.search.forEach(link => {
        const url = `https://en.wikipedia.org/?curid=${link.pageid}`;

        // Add HTML to display title, link and snippet
        searchResults.insertAdjacentHTML('afterbegin', 
            `<div>
                <h2>
                    <a href="${url}" target="_blank" rel="noopener">${link.title}</a>
                </h2>
                <a href="${url}" target="_blank" rel="noopener">${url}</a>
                <span>${link.snippet}</span><br>
            </div>`
        );
    });
}

// Store elements in variables
const form = document.querySelector(".search-form");
form.addEventListener('submit', handleSubmit);