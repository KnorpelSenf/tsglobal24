type Update =
  | { message: Message }
  | { edited_message: Message };
type Message =
  | { text: string }
  | { photo: { file_id: string } };

type KeyOfUnion<U> = U extends unknown ? string & keyof U : never;
type FilterQuery = KeyOfUnion<Update>;

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
  ? C & { update: Extract<Update, Record<Q, object>> }
  : never;

const bot = new Bot();

bot.on("message", (ctx) => {
  const message = ctx.update.message;
});
bot.on("edited_message", (ctx) => {
  const message = ctx.update.edited_message;
});

bot.on(["message", "edited_message"], (ctx) => {
  if ("message" in ctx.update) {
  } else {
  }
});
