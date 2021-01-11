export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}

export interface Task {
  description?: string;
  label?: 'blue-a' | 'blue-b' | 'blue-c' | 'blue-d' | 'blue-e' | 'gray';
}
