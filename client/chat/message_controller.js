export class MessageController {
  constructor(user_id) {
    this.user_id = user_id;
  }

  get_messages() {
    return [
      { body: 'Hi', mine: false },
      { body: 'whadup?', mine: true },
      { body: 'I need binzin ASAHP!!!', mine: false },
      { body: 'Id rather go join the Schmekel', mine: true },
    ];
  }

  send_message(body) {

  }

  get_chatrooms() {

  }
}