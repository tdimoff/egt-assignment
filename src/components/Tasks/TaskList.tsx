import { 
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Paper,
    Container
} from '@mui/material';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../store/taskSlice';
import { AppDispatch } from '../../store';
import type { RootState } from "../../store";

{/* TODO: Filtering functionality */}
export default function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const totalTasks = useSelector((state: RootState) => state.tasks.total);
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const styles = {
    paper: {
      overflow: 'hidden',
      margin: 'auto',
      marginTop: 2
    }
  };


  useEffect(() => {
    dispatch(fetchTasks({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (e: MouseEvent, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={4} sx={styles.paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map(task => (
                <TaskItem task={task} key={task.id} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={totalTasks}
            page={page} 
            onPageChange={handleChangePage as any}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage} 
          />
        </Paper>
      </Container>
    </>
  );
}
