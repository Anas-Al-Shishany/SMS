using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.SMS.Dtos
{
    public class CourseDto
    {
        public CourseDto()
        {
            Classes = new List<ClassDto>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ClassDto> Classes { get; set; }
    }
}
