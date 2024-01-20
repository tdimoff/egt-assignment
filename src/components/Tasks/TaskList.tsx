import { 
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
  } from '@mui/material';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../store/taskSlice';
import { AppDispatch } from '../../store';
import type { RootState } from "../../store";

export default function TaskList() {
    const tasks = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
      dispatch(fetchTasks())
    }, [])
  
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
  
        <TableBody>
          {/* {tasks.map(task => (
            <TaskItem task={task} key={task.id} />
          ))} */}
        </TableBody>
      </Table>
    );
}
  
