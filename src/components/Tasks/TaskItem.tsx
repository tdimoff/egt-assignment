import React, { useCallback } from "react";
import { TableRow, TableCell, Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import { ITask } from "../../types/ITask.interface";
import { updateTaskStatusThunk } from "../../store/taskSlice";
import { AppDispatch } from "../../store";

interface TaskItemProps {
  task: ITask;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [checked, setChecked] = React.useState(task.completed);

  const toggleStatus = useCallback(() => {
    setChecked(!checked);
    dispatch(updateTaskStatusThunk({ taskId: task.id, completed: !checked }));
  }, [checked, dispatch, task.id]);

  return (
    <TableRow>
      <TableCell>{task.title}</TableCell>
      <TableCell>
        <Checkbox checked={checked} onChange={toggleStatus} />
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;
