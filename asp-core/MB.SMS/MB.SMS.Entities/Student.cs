﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.SMS.Entities
{
    public class Student
    {

        public Student()
        {
            Classes = new List<Class>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int GPA { get; set; }
        public List<Class> Classes { get; set; }

    }
}
