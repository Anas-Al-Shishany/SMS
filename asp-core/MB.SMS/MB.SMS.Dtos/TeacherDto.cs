using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.SMS.Dtos
{
    public class TeacherDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string SchoolDegree { get; set; }
        public string AlamaMater { get; set; }
        public List<ClassDto> Classes { get; set; }
    }
}
