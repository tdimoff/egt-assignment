import React, { useCallback } from 'react';
import { TableRow, TableCell, Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ITask } from '../../types/ITask.interface';
import { toggleTaskStatus } from '../../store/taskSlice';

interface TaskItemProps {
  task: ITask;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(task.completed);

  {/* TODO: Make a request to toggle the completion status */}
  const toggleStatus = useCallback(() => {
    setChecked(!checked);

    dispatch(toggleTaskStatus(task.id));
  }, [checked, dispatch, task.id]);

  return (
    <TableRow>
      <TableCell>{task.title}</TableCell>
      <TableCell>
        <Checkbox
          checked={checked}
          onChange={toggleStatus} 
        />
      </TableCell>
    </TableRow>
  );
}

export default TaskItem;
