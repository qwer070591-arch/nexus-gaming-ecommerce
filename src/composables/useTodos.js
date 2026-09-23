import { onMounted, ref, watch, computed } from "vue";

export function useTodos(){
    const STORAGE_KEY = 'professional_todo_app_data'

    const filter = ref('all')
    
    const loadSavedTodos = () => {
        const data = localStorage.getItem(STORAGE_KEY)
        if (!data) return []
        try {
            return JSON.parse(data)
        }   catch(e){
            console.error('Failed to parse local todos', e)
            return []
        }
    }

    const  todos = ref(loadSavedTodos())

    watch(todos, (newVal) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
    },{ deep: true })

    const addTodo = (text) => {
        if(!text || !text.trim()) return
        todos.value.unshift({
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            text: text.trim(),
            completed: false
        })
    }

    const toggleTodo = (id) => {
        const target = todos.value.find(t => t.id === id)
        if(target){
            target.completed = !target.completed
        }
    }

    const removeTodo = (id) => {
        todos.value = todos.value.filter(t => t.id !== id)
    }

    const clearCompleted = () => {
        todos.value = todos.value.filter(t => !t.completed)
    }

    // 新增：更新任務文字的功能
    const updateTodo = (id, newText) => {
        const target = todos.value.find(t => t.id === id)
        if (target && newText.trim()) {
            target.text = newText.trim()
        }
    }

    const filteredTodos = computed(() => {
        if (filter.value === 'active'){
            return todos.value.filter(t => !t.completed)
        }
        else if (filter.value === 'completed') {
            return todos.value.filter(t => t.completed)
        }
        return todos.value
    })

    return {
        todos,
        filter,
        addTodo,
        toggleTodo,
        removeTodo,
        clearCompleted,
        filteredTodos,
        updateTodo
    } 
}