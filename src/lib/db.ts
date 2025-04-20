import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config";

let orm: MikroORM;

export async function getORM() {
  if (!orm) {
    orm = await MikroORM.init(config);
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
  }
  return orm;
}
