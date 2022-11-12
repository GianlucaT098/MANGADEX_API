<!DOCTYPE html>

<html>

    <head>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

        <script src="./manga.js" defer></script>
        <link rel='stylesheet' href='manga.css'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


    </head>
    <body onload="updateDomMangaId(getCookie('manga'))">
      

      <div id="manga" class="container">

      </div>

      <div id="search-results" class="container">

      </div>

  </body>



</html>