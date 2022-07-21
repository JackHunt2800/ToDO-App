namespace Backend.Model
{
    public record ToDo
    {
        public Guid Id {get;init;}
        public string task {get;init;}
        public string category {get;init;}
        public string status {get;set;}


    }

    
}