export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    date: Date | string;
    persons: Person[] 
}

export interface Person {
    name: string;
    age: number;
    skills: Skill[]
}

export interface Skill {
    description: string;
}