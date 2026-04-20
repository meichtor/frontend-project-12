export default {
  translation: {
    header: {
      title: 'Hexlet Chat',
      logout: 'Выйти',
    },
    channels: {
      title: 'Каналы',
      add: 'Добавить канал',
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    modals: {
      cancel: 'Отменить',
      addChannel: {
        title: 'Добавить канал',
        submitting: 'Отправка...',
        submit: 'Отправить',
        success: 'Канал создан',
      },
      renameChannel: {
        title: 'Переименовать канал',
        submitting: 'Отправка...',
        submit: 'Отправить',
        success: 'Канал переименован'
      },
      removeChannel: {
        title: 'Удалить канал',
        confirm: 'Уверены?',
        submit: 'Удалить',
        success: 'Канал удалён'
      },
    },
    validation: {
      required: 'Обязательное поле',
      networkError: 'Ошибка сети. Попробуйте снова',
      channels: {
        channelNameLength: 'От 3 до 20 символов',
        channelNameUnique: 'Должно быть уникальным',
      },
      login: {
        invalidUserCredentials: 'Неверные имя пользователя или пароль',
      },
      signup: {
        usernameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        passwordsMustMatch: 'Пароли должны совпадать',
        userExists: 'Такой пользователь уже существует',
      }
    },
    chat: {
      placeholder: 'Введите сообщение...',
      newMessage: 'Новое сообщение',
      send: 'Отправить',
      messagesCount_one: '{{count}} сообщение',
      messagesCount_few: '{{count}} сообщения',
      messagesCount_many: '{{count}} сообщений',
    },
    login: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      submitting: 'Вход...',
      submit: 'Войти',
      noAccount: 'Нет аккаунта?',
      signup: 'Регистрация',
    },
    signup: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submitting: 'Регистрация...',
      submit: 'Зарегистрироваться',
    },
    errors: {
      error: 'Ошибка',
      loading: 'Ошибка загрузки',
      retry: 'Попробовать снова',
      tryReload: 'Попробуйте обновить страницу',
      sending: 'Ошибка отправки'
    },
    notifications: {
      channelAdded: 'Канал создан',
      channelRemoved: 'Канал удалён',
      channelRenamed: 'Канал переименован',
    },
    notfound: {
      title: 'Страница не найдена',
      back: 'Назад',
    }
  },
}