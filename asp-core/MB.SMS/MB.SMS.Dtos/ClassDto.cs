using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.SMS.Dtos
{
    public class ClassDto
    {
        public int Id { get; set; }
        public string Room_Name { get; set; }
        public int Semester { get; set; }
        public string Time { get; set; }
        public List<StudentDto> Students { get; set; }

        public int? Course_Id { get; set; }
        public CourseDto Course { get; set; }

        public int Teacher_Id { get; set; }
        public TeacherDto Teacher { get; set; }
    }
}
