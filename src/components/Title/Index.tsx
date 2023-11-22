import React, { useEffect } from 'react';
import { useTaskStore } from '../../store/useCount';
import "./Index.scss"

export default function Title() {
  const { tasks, addTask } = useTaskStore();
  console.log(tasks);
  useEffect(() => {
    addTask(['Task 1', 'Task 2', 'Task 3'])
  }, []);
  
  return <div className='demo'>{tasks}</div>;
}
