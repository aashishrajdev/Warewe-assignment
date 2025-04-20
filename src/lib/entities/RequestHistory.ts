import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

@Entity()
export class RequestHistory {
  @PrimaryKey({ type: "number" })
  id!: number;

  @Property({ type: "string" })
  method!: string;

  @Property({ type: "string" })
  url!: string;

  @Property({ type: "json", nullable: true })
  headers?: Record<string, string>;

  @Property({ type: "json", nullable: true })
  body?: JsonValue;

  @Property({ type: "json", nullable: true })
  response?: JsonValue;

  @Property({ type: "json", nullable: true })
  responseHeaders?: Record<string, string>;

  @Property({ type: "number", nullable: true })
  statusCode?: number;

  @Property({ type: "number", nullable: true })
  duration?: number;

  @Property({ type: "date" })
  createdAt: Date = new Date();
}
