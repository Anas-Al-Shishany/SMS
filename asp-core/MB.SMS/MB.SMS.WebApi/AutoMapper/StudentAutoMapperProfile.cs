using AutoMapper;
using MB.SMS.Dtos;
using MB.SMS.Entities;

namespace MB.SMS.WebApi.AutoMapper
{
    public class StudentAutoMapperProfile : Profile
    {
        public StudentAutoMapperProfile()
        {
            CreateMap<Student, StudentDto>().ReverseMap();
        }
    }
}
