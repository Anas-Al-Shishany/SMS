using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.SMS.Dtos
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int GPA { get; set; }
        public List<ClassDto> Classes { get; set; }
    }
}
