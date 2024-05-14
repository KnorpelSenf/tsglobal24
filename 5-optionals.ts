interface Update {
  message?: Message;
  edited_message?: Message;
}
interface Message {
  text?: string;
  photo?: { file_id: string };
}

type FilterQuery = string & keyof Update;

class Context {
  constructor(public update: Update) {}
}

type Handler<C extends Context> = (ctx: C) => void;

class Bot<C extends Context> {
  use(handler: Handler<C>) {}
  on<Q extends FilterQuery>(
    filterQuery: Q | Q[],
    handler: Handler<Filter<C, Q>>,
  ) {}
}

type Filter<C extends Context, Q extends string> = Q extends unknown
  ? C & { update: Record<Q, object> }
  : never;

const bot = new Bot();

bot.on("message", (ctx) => {
  const message = ctx.update.message;
});
bot.on("edited_message", (ctx) => {
  const message = ctx.update.edited_message;
});

bot.on(["message", "edited_message"], (ctx) => {
  if (ctx.update.message) {
  } else {
  }
});
