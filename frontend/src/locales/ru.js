const ru = {
  translation: {
    navbar: {
      hexletChat: 'Hexlet Chat',
      logout: 'Выйти',
    },
    loginPage: {
      noAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
      enter: 'Войти',
      nickname: 'Ваш ник',
      password: 'Пароль',
      incorrectData: 'Неверные имя пользователя или пароль',
    },
    signUpPage: {
      registration: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      register: 'Зарегистрироваться',
      login: 'Войти',
      alreadyHave: 'Уже есть аккаунт?',
    },
    mainPage: {
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
    },
    notFoundPage: {
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
      incorrectChannelNameLength: 'От 3 до 20 символов',
      incorrectUsernameLength: 'От 3 до 20 символов',
      incorrectPasswordLength: 'От 6 до 20 символов',
      requiredField: 'Обязательное поле',
      needUnique: 'Должно быть уникальным',
      shouldConfirm: 'Пароли должны совпадать',
      alreadyExist: 'Такой пользователь уже существует',
      networkError: 'Ошибка соединения',
    },
    toasts: {
      addChannel: 'Канал создан',
      deleteChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
      networkError: 'Ошибка соединения',
      'Network Error': 'Ошибка соединения',
    },
  },
};

export default ru;
