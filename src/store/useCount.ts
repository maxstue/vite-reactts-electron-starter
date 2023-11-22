import { useState } from 'react'
import { createGlobalStore } from 'hox';

export const [useTaskStore, getTaskStore] = createGlobalStore(() => {
  const [tasks, setTasks] = useState([])

  function addTask(task) {
    setTasks(v => [...v, task])
  }

  function finishTask(task) {
    setTasks(v => v.filter(t => t !== task))
  }

  return {
    tasks,
    addTask,
    finishTask,
  }
})