//user your credentials
const creds = {
    username: '',
    password: ''
};




const baseUrl = 'https://api.mangadex.org';

let sessionToken, expires, refreshToken;

//let title = 'Hunter x Hunter';
let mangaID; //= '7c145eaf-1037-48cb-b6ba-f259103b05ea';
let chapterID; //= '27cd0902-ad4c-490a-b752-ae032f0503c9';
const languages = ['en'];
const limit=500;

let host, hash, data, dataSaver;
const order = {
    chapter: 'asc',
};

const finalOrderQuery = {};

// { "order[rating]": "desc", "order[followedCount]": "desc" }
for (const [key, value] of Object.entries(order)) {
    finalOrderQuery[`order[${key}]`] = value;
};

async function login() {
    const resp = await axios({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: creds
    });

    sessionToken = resp.data.token.session;
    expires = new Date().valueOf() + 15 * 60000
    refreshToken = resp.data.token.refresh;

    console.log(sessionToken, expires, refreshToken);
};


//var mangaID;
//var chapterID;

async function getMangaId  (title) {
    const resp = await axios({
        method: 'GET',
        url: `${baseUrl}/manga`,
        params: {
            title: title
        }
    });

    mangaID=resp.data.data.map(manga => manga.id);
    return new Promise((resolve,reject) => resolve(mangaID));
};





async function getChapterId (mangaId) {
    const resp = await axios({
        method: 'GET',
        url: `${baseUrl}/manga/${mangaId}/feed`,
        params: {
            translatedLanguage: languages,
            ...finalOrderQuery,
            limit
        }
    });

    chapterID=resp.data.data.map(chapter => chapter.id);
    return new Promise ((resolve,reject) => resolve(chapterID));
};

async function getDati (mangaId) {
    const resp = await axios({
        method: 'GET',
        url: `https://api.mangadex.org/manga/${mangaId}?includes[]=author&includes[]=artist&includes[]=cover_art&includes[]=title`

    });

    DATI=resp;
    return new Promise ((resolve,reject) => resolve(DATI));
};





var chapterHash

async function getData(chapterId) {
    const resp = await axios({
        method: 'GET',
        url: `${baseUrl}/at-home/server/${chapterId}`,
    });

    host = resp.data.baseUrl;
    chapterHash = resp.data.chapter.hash;
    data = resp.data.chapter.data;
    dataSaver = resp.data.chapter.dataSaver;
    //data.forEach(pagina=>console.log(pagina));

    return new Promise((resolve,reject) => resolve(resp.data));
};


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "path=/";
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


async function doIt()
{
   // await login();
   // Aggiungi event listener al form

    const responseMangaId = await getMangaId(getCookie("nome"));
    //console.log(responseMangaId);
    if(responseMangaId.length>0)
        responseMangaId.forEach(manga=>console.log(manga));
    await updateDomMangaId(responseMangaId);
    //const responseChapterId = await getChapterId(responseMangaId);
    //console.log(responseChapterId);
    //if(responseChapterId.length>0)
    //    responseChapterId.forEach(manga=>console.log(manga));
    //const responseData = await getData(responseChapterId);
    //console.log(responseData);
    //responseData.forEach(manga=>console.log(manga));
    //console.log(chapterHash);
    await idk();
};


function ff()
{
    console.log("ok");
};

async function putImages()
{
    //await login();
    const responseData = new Array;
    let res = getCookie("dati");
    //let pointerW
    console.log(res);
    const div = document.getElementById("images");
    //const responseDData = new Array;
    //responseDData.push(await getData(res));
    //console.log(responseDData);
    //let pointer=getCookie("ok")
    //pointerW=res.substring(3);
    console.log(res);
    responseData.push(await getData(res)) ;
    console.log(responseData);
    for(let i=0;i<responseData.length;i++)
    {
        //console.log(responseData[i].chapter.hash);
        //console.log(responseData[i].chapter.data);
        for(let j=0; j<responseData[i].chapter.data.length;j++)
        {
            console.log(`${responseData[i].baseUrl}/data/${responseData[i].chapter.hash}/${responseData[i].chapter.data[j]}`);
            let img = document.createElement("img");
            img.src=`${responseData[i].baseUrl}/data/${responseData[i].chapter.hash}/${responseData[i].chapter.data[j]}`;
            div.appendChild(img);
        }
    }    
};
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateDomMangaId(data)
{
    //console.log(data);
    let m= document.getElementById('manga');
    const responseChapterId=new Array;
    const responseData = new Array;
    const searchResults = document.getElementById('search-results');
    const dati = new Array;
    console.log(data.length);
    if(data.constructor!==Array || data.length===1)
    {
  
        console.log(data);
        let img = document.createElement("img");
        let a=document.createElement("a");
        a.append("manga: " + data+" | ");
        a.href="./pagem.php";
        a.name=data;
        responseChapterId.push(await getChapterId(data)) ;
        //cerco di ottentre i dati
        dati.push(await getDati(data))  ;
        m.appendChild(a);
       // await sleep(1000);

        img.src="https://uploads.mangadex.org/covers/"+data+"/"+dati[0].data.data.relationships[2].attributes.fileName;
        m.appendChild(img);
            console.log(dati);
        //console.log(responseChapterId[1][1]);
        for(let i=0;i<responseChapterId.length;i++)
        {
            for(let j=0;j<responseChapterId[i].length;j++)
            {
                //console.log(responseChapterId[i][j]);
                var a1 = document.createElement("a");
                a1.append("chapter: " /*+ responseChapterId[i][j]*/ + "numero: "+i+"n"+j+" | ");
                //a1.href="https://mangadex.org/manga/"+responseChapterId[i][j]+"/feed";
                a1.href="./page.php"
                a1.id=i+"n"+j+responseChapterId[i][j];
                a1.name=responseChapterId[i][j];
                //responseData.push(await getData(responseChapterId[i][j])) ;
                //await putImages(responseChapterId[i][j]);
                //exit;
                searchResults.appendChild(a1);
                //console.log(responseData);
                console.log(responseChapterId[i][j]);
                //setCookie("dati",responseChapterId[i][j],1);
            }

        }

        
        //console.log(responseData);
        //console.log(responseData[0].chapter.hash);//sistemare
        //console.log(responseData[0].chapter.data);//sistemare
        for(let i=0;i<responseData.length;i++)
        {
            //console.log(responseData[i].chapter.hash);
            //console.log(responseData[i].chapter.data);
            for(let j=0; j<responseData[i].chapter.data.length;j++)
            {
                console.log(`${responseData[i].baseUrl}/data/${responseData[i].chapter.hash}/${responseData[i].chapter.data[j]}`);
            }
        }
        await idk();
    }
    else
    {
        for(let i=0;i<data.length-2;i++)
        {
            let img = document.createElement("img");
            let a=document.createElement("a");
            a.append("manga: " + data[i]+" | ");
            a.href="./pagem.php";
            a.name=data[i];
            responseChapterId.push(await getChapterId(data[i])) ;
            //cerco di ottentre i dati
            dati.push(await getDati(data[i]))  ;
            m.appendChild(a);
           // await sleep(1000);
    
            img.src="https://uploads.mangadex.org/covers/"+data[i]+"/"+dati[i].data.data.relationships[2].attributes.fileName;
            m.appendChild(img);
            
    
    
    
    
    
    
        
        //console.log(responseChapterId);
    
        //searchResults.appendChild(a);
        }
    }



};

async function clicked(event)
{
    setCookie("dati",event.currentTarget.name,1);
}

async function clickedM(event)
{
    setCookie("manga",event.currentTarget.name,1);
}

function search(event)
{
    //event.preventDefault();
    console.log('Qui effetteremo la ricerca...');
    const author_input = document.querySelector('#author');
    const author_value = author_input.value;

    console.log(author_value);

    setCookie("nome",author_value,1);

}



async function idk()
{
    const linkclicked=document.getElementById("search-results").children;
    const mangaclicked = document.getElementById("manga").children;

    //cerca.addEventListener("click")

    //console.log(linkclicked);
    for(let i=0;i<linkclicked.length;i++)
    {
        //linkclicked[i].style.backgroundColor="red";
        //console.log(linkclicked);
        linkclicked[i].addEventListener("click",clicked);

    }
    for(let i = 0;i<mangaclicked.length;i++)
    {
        mangaclicked[i].addEventListener("click",clickedM);
    }

};

const form = document.querySelector('form');
form.addEventListener('submit', search);

//doIt();

