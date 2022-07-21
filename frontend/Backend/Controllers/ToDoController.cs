using Microsoft.AspNetCore.Mvc;
using Backend.Repositories;
using Backend.Model;
using Backend.Dtos;
namespace Backend.Controllers
{
    [ApiController]
    [Route("todo")]
    public class ToDoController: ControllerBase
    {
        private readonly IToDoRepository repository;
        
        public ToDoController(IToDoRepository repository)
        {
            this.repository=repository;

        }

        [HttpGet]
        public IEnumerable<ToDoDto> GetTasks()
        {
            var items=repository.GetTasks().Select(item=> item.AsDto());
            return items;

        }

        [HttpGet("{id}")]
        public ActionResult<ToDoDto> GetTask(Guid id)
        {
            var item=repository.GetTask(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();

        }

        [HttpPost]
        public ActionResult<ToDoDto> CreateTask(CreateToDoDto todoDto)
        {
            ToDo todo=new ()
            {
                Id=Guid.NewGuid(),
                task=todoDto.task,
                category=todoDto.category,
                status=todoDto.status

            };

            repository.CreateTask(todo);

            return CreatedAtAction(nameof(GetTask), new{id=todo.Id}, todo.AsDto());

        }

        [HttpPut("{id}")]
        public ActionResult UpdateItem(Guid id,UpdateToDoDto todo)
        {
            var existingItem=repository.GetTask(id);
            if(existingItem is null)
            {
                return NotFound();
            }
            ToDo updatedItem=existingItem with
            {
                task=todo.task,
                category=todo.category,
                status=todo.status
            };
            repository.UpdateTask(updatedItem);
            return NoContent();

        }

        [HttpDelete("{id}")]
        public ActionResult DeleteItem(Guid id)
        {
            var existingItem=repository.GetTask(id);
            if(existingItem is null)
            {
                return NotFound();
            }

            repository.DeleteTask(id);
            return NoContent();


        }

    } 
    
}