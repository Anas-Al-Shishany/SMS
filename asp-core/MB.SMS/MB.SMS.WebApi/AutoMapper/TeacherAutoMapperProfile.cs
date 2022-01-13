using AutoMapper;
using MB.SMS.Dtos;
using MB.SMS.Entities;

namespace MB.SMS.WebApi.AutoMapper
{
    public class TeacherAutoMapperProfile : Profile
    {
        public TeacherAutoMapperProfile()
        {
            CreateMap<Teacher, TeacherDto>().ReverseMap();
        }
    }
}
