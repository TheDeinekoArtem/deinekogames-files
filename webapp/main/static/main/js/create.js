document.addEventListener('DOMContentLoaded', function() {
  const actionsContainer = document.getElementById('newActionsContainer');
  const modal = document.getElementById('myModal');
  const actionButton = document.getElementById('actionButton');
  const closeButtons = document.querySelectorAll('.close');

  actionButton.addEventListener('click', function() {
    modal.style.display = 'flex';
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  });

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
      const actionType = this.dataset.action;
      addAction(actionType);
    });
  });

  function addAction(actionType) {
    console.log('Попытка добавить действие:', actionType);

    if (actionsContainer.getElementsByClassName(actionType + '-action').length > 0) {
      console.log('Ошибка: действие уже добавлено');
      alert('Это действие уже добавлено.');
      return;
    }

    if (actionsContainer.querySelectorAll('.action').length >= 2) {
      console.log('Ошибка: достигнуто максимальное количество действий');
      alert('Вы можете добавить не более двух действий.');
      return;
    }

    let actionDiv = document.createElement('div');
    actionDiv.className = actionType + '-action action';

    let actionName = '';
    let placeholderText = '';
    switch (actionType) {
      case 'channel':
        actionName = 'Подписаться на канал';
        placeholderText = 'Введите URL канала...';
        break;
      case 'video':
        actionName = 'Поставить лайк на видео';
        placeholderText = 'Введите URL видео...';
        break;
      case 'comment':
        actionName = 'Оставить комментарий';
        placeholderText = 'Введите URL видео...';
        placeholderText = 'Введите текст комментария...';
        break;
      case 'watch':
        actionName = 'Посмотреть видео 30 секунд';
        placeholderText = 'Введите URL видео для просмотра...';
        break;
    }

    actionDiv.innerHTML = `<i class="fa-brands fa-youtube"></i> ${actionName}`;
    actionsContainer.appendChild(actionDiv);


    // Общее поле для URL
    let urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.className = 'input-field';
    urlInput.placeholder = 'Введите URL...';
    actionsContainer.appendChild(urlInput);

    // Если действие - комментирование, добавляем дополнительное поле для текста комментария
    if (actionType === 'comment') {
      let commentInput = document.createElement('textarea');
      commentInput.className = 'input-field';
      commentInput.placeholder = 'Введите текст комментария...';
      actionsContainer.appendChild(commentInput);
    }

    modal.style.display = 'none';
  }
});
