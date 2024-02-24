import { Client } from "pg";

const DATABASE_URL =
  "postgresql://DrPeaTea:9YVLS1IBDiPJ@ep-shrill-unit-78959937.ap-southeast-1.aws.neon.tech/todolist?sslmode=require";

const client = new Client({
  connectionString: DATABASE_URL,
});

client.connect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get Todos:
  if (req.method === "GET") {
    const isCompleted =
      req.query.completed === "true" || req.query.completed === "false"
        ? req.query.completed === "true"
        : undefined;

    let text = "SELECT * from todolist";
    const values = [];

    if (isCompleted !== undefined) {
      text += " WHERE is_completed = $1";
      values.push(isCompleted);
    }

    const result = await client.query(text, values);
    const todos = result.rows;
    res.status(200).json(todos);
    return;
  }

  // Create Todo:
  if (req.method === "POST") {
    const text = `INSERT INTO todolist(task_description) VALUES($1) RETURNING *`;
    const description = req.body.description || "Task Was left Empty";
    const values = [description];
    const result = await client.query(text, values);
    const todos = result.rows;
    res.status(200).json(todos);
    return;
  }

  //Delete a single task:
  if (req.method === "DELETE") {
    if (req.body.id === 0) {
      const text = "DELETE FROM todolist WHERE is_completed = true";
      await client.query(text);
      res
        .status(200)
        .json({ message: "Completed tasks deleted successfully." });
      return;
    } else {
      const text = "DELETE FROM todolist WHERE id = $1";
      const taskId = req.body.id;
      const values = [taskId];
      const result = await client.query(text, values);
      const todos = result.rows;
      res.status(200).json(todos);
      return;
    }
  }

  // Updating tasks
  if (req.method === "PUT") {
    let id = req.body.id;
    let description = req.body.description;
    let status = req.body.status;

    if (status !== undefined) {
      const text = "UPDATE todolist SET is_completed = $1 WHERE id = $2";
      const values = [status, id];
      const result = await client.query(text, values);
      const todos = result.rows;
      res.status(200).json(todos);
    }
    if (description !== undefined) {
      const text = "UPDATE todolist SET task_description = $1 WHERE id = $2";
      const values = [description, id];
      const result = await client.query(text, values);
      const todos = result.rows;
      res.status(200).json(todos);
    }

    return;
  }
}
