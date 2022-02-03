using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.SMS.Entities
{
    public class Teacher
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string SchoolDegree { get; set; }
        public string AlamaMater { get; set; }
        public List<Class> Classes { get; set; }

    }
}
