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
  // const description = req.body.description || "hello";

  // Create Todo:
  //   const text = `INSERT INTO todolist(task_description) VALUES($1) RETURNING *`;
  //   const values = ["hello"];

  // const result = await client.query(text, values);

  // Get Todos:
  //   const text = "SELECT * from todolist";
  //   const result = await client.query(text);
  //   const todos = result.rows;

  // Update Todo
  //   const text = "UPDATE todolist SET is_completed = $1 WHERE id = $2";
  //   const values = [true, 1];

//   const text = "DELETE FROM todolist WHERE id = $1";
//   const values = [1];

// const text = "DELETE FROM todolist WHERE is_completed = true";

//   const result = await client.query(text, values);

  // UPDATE todolist
  // SET task_description = 'Your new task description here'
  // WHERE id = 1;

  // Add a todo to the database

  res.status(200).json({ data: result.rows });
}
