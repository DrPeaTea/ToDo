// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};
let toDoArray = [];
let currentID = 1;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //this checks the request payload for whats contained inside
  let id = req.body.id;
  let description = req.body.description;
  let status = req.body.status;

  //basic GET gets the array
  if (req.method === "GET") {
    res.status(200).json(toDoArray);
    return;
  }

  //POST takes the request body and makes it the description, takes the current id and then adds 1 for the next task
  if (req.method === "POST") {
    //checks if desciption is in the payload to create new task
    if (description) {
      const task = {
        description: description,
        id: currentID,
        status: false,
      };
      toDoArray.push(task);
      currentID++;
      res.status(200).json(task);
      return;
    } else {
      res
        .status(400)
        .json({ message: "a description of the task is required for POST" });
    }
  }

  //PUT first tries to find if there is a matching ID. If matching will swap the status, If no match return 400 error
  if (req.method === "PUT") {
    const finishedTask = toDoArray.find((task) => task.id === id);

    //Checks if object exist
    if (finishedTask) {
      if (description && status) {
        finishedTask.description = description;
        finishedTask.status = status;
        
      } else if (description) {
        finishedTask.description = description;
       
      } else if (status) {
        finishedTask.status = status;
      
      } else {
        res
          .status(400)
          .json({ message: "a description or status of the task is required for PUT" });
      }
     
      res.status(200).json(finishedTask);
    } else {
      res.status(400).json({ message: "Task not found" });
    }
    return;
  }

  //Delete checks if a ID exists, first checks if is 0 then will filter out all finished tasks, otherwise will delete the task with the matching ID
  if (req.method === "DELETE") {
    const deletedTask = toDoArray.find((task) => task.id === id)
    if (id === 0) {
      toDoArray = toDoArray.filter((task) => task.status === false);
    } else if (deletedTask){
      toDoArray = toDoArray.filter((task) => task.id !== id);
    }
    else {res.status(400).json({ message: "Task not found" })}
    res.status(200).json(toDoArray);
    return;
  }

  //Error 405 if not using GET, POST, PUT or DELETE
  res.status(405).json({ message: "Method not Supported" });
}
