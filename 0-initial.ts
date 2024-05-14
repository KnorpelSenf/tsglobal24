type Update =
  | { message: Message }
  | { edited_message: Message };
type Message =
  | { text: string }
  | { photo: { file_id: string } };

class Context {
  constructor(public update: Update) {}
}

type Handler<C extends Context> = (ctx: C) => void;
