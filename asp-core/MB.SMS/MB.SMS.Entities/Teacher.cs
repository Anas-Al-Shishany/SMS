using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.SMS.Entities
{
    public class Teacher
    {
        public Teacher()
        {
            Classes = new List<Class>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string SchoolDegree { get; set; }
        public string AlmaMater { get; set; }
        public List<Class> Classes { get; set; }

    }
}
