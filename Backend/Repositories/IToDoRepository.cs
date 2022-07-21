using Backend.Model;
namespace Backend.Repositories
{
    public interface IToDoRepository
    {
        ToDo GetTask(Guid id);
        IEnumerable<ToDo> GetTasks();

        void CreateTask(ToDo todo);
        void UpdateTask(ToDo todo);
        void DeleteTask(Guid id);
        
    }
    
}