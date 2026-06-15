import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Chip, Box } from '@mui/material';
import { format } from 'date-fns';

export default function TaskCard({ task, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      default: return 'warning';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      default: return 'success';
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {task.title}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip label={task.status} color={getStatusColor(task.status)} size="small" sx={{ mr: 1 }} />
          <Chip label={task.priority} color={getPriorityColor(task.priority)} size="small" variant="outlined" />
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          {task.description}
        </Typography>
        {task.due_date && (
          <Typography variant="caption" color="text.secondary" display="block">
            Due: {format(new Date(task.due_date), 'PPP')}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onEdit} data-testid={`edit-task-${task.id}`}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={onDelete} data-testid={`delete-task-${task.id}`}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
