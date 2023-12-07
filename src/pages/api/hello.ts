// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};
const tasks = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res.status(200).json(tasks);
    return;
  }

  let CurrentID = 0;

  if (tasks.length > 0) {
    CurrentID = tasks[tasks.length - 1].id + 1;
  }

  if (req.method === "POST") {
    const task = {
      Description: req.body,
      id: CurrentID,
      status: false,
    };

    tasks.push(task);
    res.status(200).json(tasks);
    return;
  }

  if (req.method === "PUT") {
    const finishedTaskId = req.body;
    const finishedTask = tasks.find(
      (task) => task.id === Number(finishedTaskId)
    );
    finishedTask.status = true;

    res.status(200).json(tasks);
    return;
  }

  if (req.method === "DELETE") {
    for (let i = tasks.length - 1; i >= 0; i--) {
      if (tasks[i].status === true) {
        tasks.splice(i, 1);
      }
    }

    res.status(200).json(tasks);
    return;
  }

  res.status(404).json({ message: "Method not Supported" });
}
