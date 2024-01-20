import { 
    TableRow,
    TableCell,
    Checkbox,
} from '@mui/material';
import { useState } from 'react';

interface Task {
    id: string
    title: string
    completed: boolean  
}

interface TaskItemProps {
  task: Task
}

function TaskItem({ task }: TaskItemProps) {
    const [checked, setChecked] = useState(task.completed);
    const toggleStatus = () => {
      // toggle API call
    }
  
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
    )
}

export default TaskItem
