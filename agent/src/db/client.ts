import { Pool, type PoolClient, type QueryResultRow } from "pg";

export type Db = ReturnType<typeof createDb>;

export function createDb(connectionString: string) {
  const pool = new Pool({ connectionString });

  return {
    pool,
    query<T extends QueryResultRow = QueryResultRow>(sql: string, params: unknown[] = []) {
      return pool.query<T>(sql, params);
    },
    async withTransaction<T>(fn: (client: PoolClient) => Promise<T>) {
      const client = await pool.connect();
      try {
        await client.query("begin");
        const result = await fn(client);
        await client.query("commit");
        return result;
      } catch (error) {
        await client.query("rollback");
        throw error;
      } finally {
        client.release();
      }
    },
    async close() {
      await pool.end();
    }
  };
}
