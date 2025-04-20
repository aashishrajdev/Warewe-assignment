import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { RequestHistory } from "./entities/RequestHistory";

const config: Options = {
  entities: [RequestHistory],
  dbName: "rest_client_db",
  driver: PostgreSqlDriver,
  debug: process.env.NODE_ENV === "development",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "your_postgres_password",
};

export default config;
