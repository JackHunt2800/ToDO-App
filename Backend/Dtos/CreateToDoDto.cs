using System.ComponentModel.DataAnnotations;
namespace Backend.Dtos
{
    //required is used to stop posting data as null
     public class CreateToDoDto
    {
        [Required]
        public string task {get;init;}
        [Required]
        public string category {get;init;}
        [Required]
        public string status {get;set;}


    }
    
}