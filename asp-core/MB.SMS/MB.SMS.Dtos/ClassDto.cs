using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.SMS.Dtos
{
    public class ClassDto
    {
        public ClassDto()
        {
            Students = new List<StudentDto>();
        }
        public int Id { get; set; }
        public string RoomName { get; set; }
        public int Semester { get; set; }
        public string Time { get; set; }
        public List<StudentDto> Students { get; set; }

        public int? CourseId { get; set; }
        public CourseDto Course { get; set; }

        public int? TeacherId { get; set; }
        public TeacherDto Teacher { get; set; }
    }
}
