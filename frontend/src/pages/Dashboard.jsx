import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskFormDialog from '../components/TaskFormDialog';
import { getTasks, deleteTask } from '../api/tasks';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      const data = await getTasks(params);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter, priorityFilter]);

  const handleCreate = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        fetchTasks();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDialogClose = (shouldRefresh) => {
    setDialogOpen(false);
    if (shouldRefresh) {
      fetchTasks();
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" component="h1">
            My Tasks
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            data-testid="create-task-button"
          >
            Create Task
          </Button>
        </Box>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{ htmlInput: { 'data-testid': 'search-task-input' } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  inputProps={{ 'data-testid': 'status-filter' }}
                >
                  <MenuItem value=""><em>All</em></MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priorityFilter}
                  label="Priority"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  inputProps={{ 'data-testid': 'priority-filter' }}
                >
                  <MenuItem value=""><em>All</em></MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskCard task={task} onEdit={() => handleEdit(task)} onDelete={() => handleDelete(task.id)} />
            </Grid>
          ))}
        </Grid>

        <TaskFormDialog open={dialogOpen} onClose={handleDialogClose} task={editingTask} />
      </Container>
    </>
  );
}
