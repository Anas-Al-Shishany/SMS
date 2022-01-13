using AutoMapper;
using MB.SMS.Dtos;
using MB.SMS.Entities;

namespace MB.SMS.WebApi.AutoMapper
{
    public class ClassAutoMapperProfile : Profile
    {
        public ClassAutoMapperProfile()
        {
            CreateMap<Class, ClassDto>().ReverseMap();
        }
    }
}
