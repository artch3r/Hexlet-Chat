const ru = {
  translation: {
    navbar: {
      hexletChat: 'Hexlet Chat',
      logout: 'Выйти',
    },
    login: {
      username: 'Ваш ник',
      password: 'Пароль',
      imageAlt: 'Войти',
      footerText: 'Нет аккаунта?',
      footerHrefText: 'Регистрация',
      formTitle: 'Войти',
      formButton: 'Войти',
    },
    signUp: {
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      imageAlt: 'Регистрация',
      footerText: 'Уже есть аккаунт?',
      footerHrefText: 'Войти',
      formTitle: 'Регистрация',
      formButton: 'Зарегистрироваться',
    },
    main: {
      channels: {
        channelManage: 'Управление каналом',
        delete: 'Удалить',
        rename: 'Переименовать',
        channels: 'Каналы',
      },
      messages: {
        newMessage: 'Новое сообщение',
        enterMessage: 'Введите сообщение...',
        send: 'Отправить',
        message_one: '{{count}} сообщение',
        message_few: '{{count}} сообщения',
        message_many: '{{count}} сообщений',
      },
      loading: 'Загрузка...',
    },
    notFound: {
      notFound: 'Страница не найдена',
      canRedirect: 'Но вы можете перейти',
      onMain: 'на главную страницу',
    },
    modal: {
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      deleteChannel: 'Удалить канал',
      channelName: 'Имя канала',
      sure: 'Уверены?',
      cancel: 'Отменить',
      delete: 'Удалить',
      confirm: 'Отправить',
    },
    errors: {
      authFailed: {
        login: 'Неверные имя пользователя или пароль',
        signUp: 'Такой пользователь уже существует',
      },
      incorrectChannelNameLength: 'От 3 до 20 символов',
      incorrectUsernameLength: 'От 3 до 20 символов',
      incorrectMinPasswordLength: 'Не менее 6 символов',
      incorrectMaxPasswordLength: 'Не более 20 символов',
      requiredField: 'Обязательное поле',
      needUnique: 'Должно быть уникальным',
      shouldConfirm: 'Пароли должны совпадать',
      alreadyExist: 'Такой пользователь уже существует',
      networkError: 'Ошибка соединения',
      somethingWrong: 'Что-то пошло не так...',
      update: 'Обновить',
    },
    toasts: {
      addChannel: 'Канал создан',
      deleteChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
      networkError: 'Ошибка соединения',
      unauthorized: 'Ошибка авторизации',
    },
    language: {
      dropdownToggle: 'Язык',
    },
  },
};

export default ru;
