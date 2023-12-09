// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};
const toDoArray = [];
let CurrentID = 0;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //basic GET gets the array
  if (req.method === "GET") {
    res.status(200).json(toDoArray);
    return;
  }

  //POST takes the request body and makes it the description, takes the current id and then adds 1 for the next task
  if (req.method === "POST") {
    const task = {
      Description: req.body,
      id: CurrentID,
      status: false,
    };
    toDoArray.push(task);
    CurrentID++;
    res.status(200).json(toDoArray);
    return;
  }

  //PUT first tries to find if there is a matching ID. If matching will swap the status, If no match return 400 error
  if (req.method === "PUT") {
    const finishedTaskId = req.body;
    const finishedTask = toDoArray.find(
      (task) => task.id === Number(finishedTaskId)
    );

    //Checks if object
    if (finishedTask) {
      if (finishedTask.status === false) {
        finishedTask.status = true;
      } else {
        finishedTask.status = false;
      }
      res.status(200).json(toDoArray);
    } else {
      res.status(400).json({ message: "Task not found" });
    }
    return;
  }

  //Delete loops through the array backwards, if any object has status of true, remove from array
  if (req.method === "DELETE") {
    for (let i = toDoArray.length - 1; i >= 0; i--) {
      if (toDoArray[i].status === true) {
        toDoArray.splice(i, 1);
      }
      //going forward version less efficient
      //for (let i = 0; i >= toDoArray.length - 1; i++) {
      //if (toDoArray[i].status === true) {
      //  toDoArray.splice(i, 1);
      // i--        <--- this is a extra line needed if going forwards or else will skip a object
    }
    res.status(200).json(toDoArray);
    return;
  }

  //Error 405 if not using GET, POST, PUT or DELETE
  res.status(405).json({ message: "Method not Supported" });
}
