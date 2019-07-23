<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="csrf-token" content="{{ csrf_token() }}" />
	<title>bookCatalog</title>
	<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="css/style.css">
  <script src="js/main.js" defer></script>
</head>
<body>
  <div class="overlay">
    <div class="popup">
      <div id="addTitle" class="popup-title">Добавление новой книги</div>
      <div id="editTitle" class="popup-title">Редактировать запись</div>
      <div class="popup-close">&times;</div>
      <div class="popup-form">

        <div class="form-group">
          <label>Название</label>
          <input type="text" id="name" class="form-control"   placeholder="Название">
          <div id="nameValid" class="validation"></div>
        </div>

        <div class="form-group">
          <label>Автор</label>
          <input type="text" id="author" class="form-control"  placeholder="Автор">
          <div id="authorValid" class="validation"></div>
        </div>

        <div class="form-group">
          <label>Жанр</label>
          <input type="text" id="category" class="form-control"  placeholder="Жанр">
          <div id="categoryValid" class="validation"></div>
        </div>

        <div class="form-group input-wrap">
          <label>Год</label>
          <input type="text" id="year" class="form-control"  placeholder="Год">
          <div id="yearValid" class="validation"></div>
        </div>

        <div class="form-group">
          <button id="addForm" class="btn-form btn btn-success">Добавить</button>
          <button id="applyForm" class="btn-form btn btn-success">Применить</button>
        </div>

      </div>
      <!-- /popup-form -->
    </div>
    <!-- /popup -->
  </div>
  <!-- /overlay -->
  <div class="container">

  <div class="header">
    <button class="btn btn-add btn-success" id="add"><img src="plus.png" alt=""> Добавить</button>
  </div>

  <table class="table table-bordered table-dark">
    <thead>
      <tr>
      <th scope="col">Название</th>
        <th scope="col">Автор</th>
        <th scope="col">Жанр</th>
        <th scope="col">Год</th>
        <th scope="col">Действия</th>

      </tr>
    </thead>

    <tbody id="tbody">
    </tbody>
  </table>

  </div>
  <!-- /container -->

</body>
</html>
