const API_KEY = "dd8e13277b074cf1a2ee5bfe35a965cd";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardContainer.innerHTML = ' ';

    articles.forEach((articles) => {
        if (!articles.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, articles);
        cardContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, articles) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    var newsDesc = ' ';
    newsDesc = cardClone.querySelector('.news-desc');
    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description;

    const date = new Date(articles.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${articles.source.name}${date}`;
    // console.log(articles.url);
    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(articles.url, "_blank");
    });
}

function navItemClick(id) {
    fetchNews(id);
}

const searchbutton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchbutton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
})