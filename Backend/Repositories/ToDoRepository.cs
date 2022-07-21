//incharge of storing items in the system
using Backend.Model;
using Backend.Repositories;
namespace Backend.Repositories
{
    

    public class ToDoRepository : IToDoRepository
    {
        private readonly List<ToDo> items = new()
        {
            new ToDo{Id= Guid.NewGuid(), task="Go ty gym", category="Fitness", status="false"},
            new ToDo{Id= Guid.NewGuid(), task="Learn c#", category="Education", status="true"}

        };

        public IEnumerable<ToDo> GetTasks()
        {
            return items;

        }

        public ToDo GetTask(Guid id)
        {
            return items.Where(item => item.Id == id).SingleOrDefault();
        }

        public void CreateTask(ToDo todo)
        {
            items.Add(todo);
        }

        public void UpdateTask(ToDo todo)
        {
            var index=items.FindIndex(existingItem=>existingItem.Id == todo.Id);
            items[index]=todo;
        }

        public void DeleteTask(Guid id)
        {
            var index=items.FindIndex(existingItem=>existingItem.Id == id);
            items.RemoveAt(index);
        }



    }

}