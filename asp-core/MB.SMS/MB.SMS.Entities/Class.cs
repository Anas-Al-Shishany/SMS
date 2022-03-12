using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.SMS.Entities
{
    public class Class
    {

        public Class()
        {
            Students = new List<Student>();
        }

        public int Id { get; set; }
        public string RoomName { get; set; }
        public int Semester { get; set; }
        public string Time { get; set; }
        public List<Student> Students { get; set; }

        public int? CourseId { get; set; }
        public Course Course { get; set; }

        public int? TeacherId { get; set; }
        public Teacher Teacher { get; set; }
    }
}
