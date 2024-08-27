document.addEventListener('DOMContentLoaded', function() {
  const actionsContainer = document.getElementById('newActionsContainer');
  const modal = document.getElementById('myModal');
  const actionButton = document.getElementById('actionButton');
  const closeButtons = document.querySelectorAll('.close');
  addAction('channel'); // Установить действие по умолчанию при загрузке страницы

  var toggleButton = document.getElementById('toggle-photo');
  var content = document.getElementById('photo-content');
  var arrowIcon = document.getElementById('arrow-icon');
  var fileInput = document.getElementById('photo-upload');
  var fileDisplayInput = document.querySelector('.file-display-input');
  var toggleSettings = document.getElementById('toggle-settings');
  var settingsContent = document.getElementById('settings-content');
  var arrowIconSettings = toggleSettings.querySelector('.arrow-icon-settings');
  var linkButton = document.querySelector('.content-button-text-link');
  var textButton = document.querySelector('.content-button-text-text');
  var linkContent = document.getElementById('linkContent');
  var textContent = document.getElementById('textContent');

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

  document.querySelector('form').addEventListener('submit', function(event) {
    var contentType = document.getElementById('content_type').value;
    var titleInput, contentInput;

    if (contentType === 'link') {
      titleInput = document.querySelector('#linkContent input[name="link_title"]');
      contentInput = document.querySelector('#linkContent input[name="link_content"]');
    } else {
      titleInput = document.querySelector('#textContent input[name="text_title"]');
      contentInput = document.querySelector('#textContent textarea[name="text_content"]');
    }

    if (!titleInput.value.trim() || !contentInput.value.trim()) {
      event.preventDefault();
      alert('Пожалуйста, заполните все обязательные поля для выбранного типа контента.');
    }
  });

  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
      const actionType = this.dataset.action;
      addAction(actionType);
    });
  });

  fileInput.addEventListener('change', function() {
    var fileName = this.files[0].name;
    fileDisplayInput.value = fileName;
  });

  toggleSettings.addEventListener('click', function() {
    var isExpanded = settingsContent.style.display === 'block';
    settingsContent.style.display = isExpanded ? 'none' : 'block';
    arrowIconSettings.classList.toggle('fa-arrow-down');
    arrowIconSettings.classList.toggle('fa-arrow-up');
  });

  toggleButton.addEventListener('click', function() {
    if (content.style.display === 'block') {
      content.style.display = 'none';
      arrowIcon.classList.remove('fa-arrow-up');
      arrowIcon.classList.add('fa-arrow-down');
    } else {
      content.style.display = 'block';
      arrowIcon.classList.remove('fa-arrow-down');
      arrowIcon.classList.add('fa-arrow-up');
    }
  });

  function showLinkContent() {
    linkContent.style.display = 'block';
    textContent.style.display = 'none';
    linkButton.parentNode.classList.add('active');
    textButton.parentNode.classList.remove('active');
  }

  function showTextContent() {
    linkContent.style.display = 'none';
    textContent.style.display = 'block';
    textButton.parentNode.classList.add('active');
    linkButton.parentNode.classList.remove('active');
  }

  function updateManagementFormData() {
    let totalForms = document.getElementById('id_actions-TOTAL_FORMS');
    let initialForms = document.getElementById('id_actions-INITIAL_FORMS');
    let formCount = actionsContainer.querySelectorAll('.action-content').length;

    totalForms.value = formCount;
    initialForms.value = formCount;
  }

  function updateFormVisibility() {
    var contentType = document.getElementById('content_type').value;
    var linkFields = document.getElementById('linkContent');
    var textFields = document.getElementById('textContent');
    var submitButton = document.querySelector('.submit-button');

    document.querySelectorAll('#linkContent input, #textContent input, #textContent textarea').forEach(field => {
      field.removeAttribute('required');
    });

    if (contentType === 'link') {
      linkFields.style.display = 'block';
      textFields.style.display = 'none';
      document.querySelector('#linkContent input[name="link_title"]').setAttribute('required', '');
      document.querySelector('#linkContent input[name="link_content"]').setAttribute('required', '');
      submitButton.disabled = false;
    } else if (contentType === 'text') {
      linkFields.style.display = 'none';
      textFields.style.display = 'block';
      document.querySelector('#textContent input[name="text_title"]').setAttribute('required', '');
      document.querySelector('#textContent textarea[name="text_content"]').setAttribute('required', '');
      submitButton.disabled = false;
    }
  }

  document.querySelectorAll('.content-button').forEach(button => {
    button.addEventListener('click', function(event) {
      var selectedContentType = this.querySelector('a').classList.contains('content-button-text-link') ? 'link' : 'text';
      document.getElementById('content_type').value = selectedContentType;
      updateFormVisibility();
    });
  });

  window.onload = function() {
    updateFormVisibility();
    document.getElementById('content_type').value = 'link'; // Установить значение по умолчанию
    showLinkContent(); // Отображаем контент по умолчанию
  };

  linkButton.addEventListener('click', function(event) {
    event.preventDefault();
    showLinkContent();
  });

  textButton.addEventListener('click', function(event) {
    event.preventDefault();
    showTextContent();
  });

  function addAction(actionType) {
    if (actionsContainer.getElementsByClassName(actionType + '-action').length > 0) {
      alert('Это действие уже добавлено.');
      return;
    }

    if (actionsContainer.querySelectorAll('.action-content').length >= 2) {
      alert('Вы можете добавить не более двух действий.');
      return;
    }

    let actionContentDiv = document.createElement('div');
    actionContentDiv.className = 'action-content';

    let actionDiv = document.createElement('div');
    actionDiv.className = actionType + '-action action';

    let actionInfo = getActionInfo(actionType);
    actionDiv.innerHTML = `<i class="fa-brands fa-youtube"></i> ${actionInfo.title}`;
    actionContentDiv.appendChild(actionDiv);

    let urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.className = 'input-field ' + actionType;
    urlInput.placeholder = actionInfo.placeholder;
    urlInput.name = `actions-${getFormIndex()}-link`;
    actionContentDiv.appendChild(urlInput);

    let actionTypeInput = document.createElement('input');
    actionTypeInput.type = 'hidden';
    actionTypeInput.name = `actions-${getFormIndex()}-action_type`;
    actionTypeInput.value = actionType;
    actionContentDiv.appendChild(actionTypeInput);

    if (actionType === 'comment') {
      let commentInput = document.createElement('textarea');
      commentInput.className = 'input-field comment';
      commentInput.placeholder = 'Введите текст комментария...';
      commentInput.name = `actions-${getFormIndex()}-comment`;
      actionContentDiv.appendChild(commentInput);
    }

    let deleteButton = createDeleteButton(actionContentDiv);
    actionContentDiv.appendChild(deleteButton);

    actionsContainer.appendChild(actionContentDiv);

    updateManagementFormData();
    modal.style.display = 'none'; // Закрытие модального окна после добавления действия
  }

  function getFormIndex() {
    return actionsContainer.querySelectorAll('.action-content').length;
  }

  function createDeleteButton(actionContentDiv) {
    let deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    deleteButton.className = 'delete-action-button';
    deleteButton.addEventListener('click', function() {
      actionContentDiv.remove();
      updateManagementFormData();
    });
    return deleteButton;
  }

  function getActionInfo(actionType) {
    switch (actionType) {
      case 'channel':
        return {
          title: 'Подписаться на канал',
          placeholder: 'Введите URL канала...'
        };
      case 'video':
        return {
          title: 'Поставить лайк на видео',
          placeholder: 'Введите URL видео...'
        };
      case 'comment':
        return {
          title: 'Оставить комментарий',
          placeholder: 'Введите URL видео...'
        };
      case 'watch':
        return {
          title: 'Посмотреть видео',
          placeholder: 'Введите URL видео для просмотра...'
        };
      default:
        return {
          title: '',
          placeholder: ''
        };
    }
  }
});