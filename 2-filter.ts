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

class Bot<C extends Context> {
  use(handler: Handler<C>) {}
  on<Q extends string>(filterQuery: Q, handler: Handler<Filter<C, Q>>) {}
}

type Filter<C extends Context, Q extends string> = C & {
  update: Extract<Update, Record<Q, object>>;
};

const bot = new Bot();

bot.on("message", (ctx) => {
  const message = ctx.update.message;
});
bot.on("edited_message", (ctx) => {
  const message = ctx.update.edited_message;
});
