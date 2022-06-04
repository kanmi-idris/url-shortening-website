const API = 'https://api.shrtco.de/v2/shorten?url=';

const input = document.querySelector('#url');
const error = document.querySelector('#error');
const shortenBtn = document.querySelector('#shortenBtn');
const copyBtn = document.querySelector('.btn-copy');
const shortndLinks = document.querySelector('.shortndLinks');

let links = localStorage.getItem('links') ? [...JSON.parse(localStorage.getItem('links'))] : [];


/* API to shorten link Function*/
async function getShortUrl(url) {
    let query = await fetch(`${API}${url}`)
    let data = await query.json()

    updateSavedLinks(data);

    input.value = '';
}

shortenBtn.addEventListener('clicks', checkUrl);


/*Function to check if link is valid or not*/

function checkUrl() {
    let url = input.value;

    if (url == '') {
        input.classList.add('wrong');
        error.style.opacity = `1`;
        setTimeout(() => {
            input.classList.remove('wrong')
            error.style.opacity = `0`;
        }, 2000);
    } else {
        getShortUrl(url);
    }
}

/*Function to append shortened link to html*/

function populate(links) {
    container.innerHtml = '';

    links.forEach(link => {
        let div = document.createElement('div');
        div.classList.add('link');

        div.innerHTML = `
            <div class="link-info">
              <span>${link.originalLink}</span>
              <span>${link.shortLink}</span>
            </div>
            <button class="btn btn-copy">Copy</button>
            <div class="delete"> 
                <i class="fa fa-trash"></i>
            </div>`;
        
        container.appendChild(div);

        div.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete')) {
                deleteLink(e);
            } else if (e.target.tagName == 'BUTTON') {
                let parent = e.target.parentElement;
                let child = parent.children[0];
                let url = child.children[1].innerText;

                e.target.innerText = 'Copied!'

                setTimeout(() => {
                    e.target.innerText = 'Copy'
                }, 1500);

                copyUrl(url);
            }
        });

        
    });
}


function updateSavedLinks(data) {
    let link = {originalLink: data.result.original_link, shortLink: data.result.full_short_link2};
    links.push(link);

    localStorage.setItem('links', JSON.stringify(links));

    populateLinks(links);
}

function deleteLink(e) {
    let parent = e.target.parentElement;
    let child = parent.children[0];
    let url = child.children[0].innerText;

    links = links.filter(link => link.originalLink !== url)
    
    localStorage.setItem('links', JSON.stringify(links));

    populateLinks(links);
}

async function copyUrl(url) {
    try {
        await navigator.clipboard.writeText(url);
        console.log('Page URL copied to clipboard')
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}


if (links.length > 0) {
    populateLinks(links);
}


