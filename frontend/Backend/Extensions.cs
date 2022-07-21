using Backend.Model;
using Backend.Dtos;
namespace Backend
{
    public static class Extensions{
        public static ToDoDto AsDto(this ToDo item)
        {
            return new ToDoDto
            {
                Id=item.Id,
                task=item.task,
                category=item.category,
                status=item.status

            };
        }
    }
    
}