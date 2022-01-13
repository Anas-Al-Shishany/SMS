using AutoMapper;
using MB.SMS.Dtos;
using MB.SMS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MB.SMS.WebApi.AutoMapper
{
    public class CourseAutoMapperProfile : Profile
    {
        public CourseAutoMapperProfile()
        {
            CreateMap<Course, CourseDto>().ReverseMap();
        }
    }
}
