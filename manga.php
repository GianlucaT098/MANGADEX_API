<!DOCTYPE html>

<html>

    <head>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

        <script src="./manga.js" defer></script>
        <link rel='stylesheet' href='manga.css'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


    </head>


    <body onload="doIt()">
      
        <!--<img src="https://uploads.mangadex.org/covers/936f0ba5-ca65-4de4-99b1-528c02a4454d/69cc13aa-7331-4ab9-a7a1-f00ac6d84c9f.jpg">-->
        <!--<img src="https://uploads.mangadex.org/manga/f9c33607-9180-4ba6-b85c-e4b5faee7192?includes[]=author&includes[]=artist&includes[]=cover_art">-->
        <!--<a href="https://uploads.mangadex.org/manga/f9c33607-9180-4ba6-b85c-e4b5faee7192/feed">clicca</a>-->
        <!--<img src="https://uploads.mangadex.org/data/ebf49945bb923b9e9a94b2e673ea6cb2/68-dbcf1e5fa85e4ffd234f52b9ca9f02ed1a51edeede0c57bfa0a4205c45d74af3.jpg">-->

		<form>
			Inserire manga da cercare
			<input type='text' id='author'>
			<input type='submit' id='submit' value='Cerca'>
		</form>

        <div id="manga" class="container"></div>

        <div id="search-results" class="container">

        </div>

    </body>



</html>