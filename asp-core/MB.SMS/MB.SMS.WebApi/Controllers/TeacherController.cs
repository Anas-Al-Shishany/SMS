using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.SMS.Entities;
using MB.SMS.WebApi.Data;
using AutoMapper;
using MB.SMS.Dtos;

namespace MB.SMS.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public TeacherController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<TeacherDto>> GetTeachers()
        {
            var teachers = await _context
                                        .Teachers
                                        .ToListAsync();
            var teacherDtos = _mapper.Map<List<Teacher>, List<TeacherDto>>(teachers);

            return teacherDtos;
        }

        [HttpGet("{id}")]
        public async Task<TeacherDto> GetTeacher(int id)
        {
            var teacher = await _context
                                        .Teachers
                                        .Include(t => t.Classes)
                                        .Where(t => t.Id == id)
                                        .SingleOrDefaultAsync();

            var teacherDto = _mapper.Map<TeacherDto>(teacher);

            return teacherDto;

            
        }

        [HttpPut("{id}")]
        public async Task EditTeacher(int id, [FromBody] TeacherDto teacherDto)
        {
            var teacher = await _context.Teachers.FindAsync(id);

            _mapper.Map(teacherDto, teacher);


            _context.Teachers.Update(teacher);
            await _context.SaveChangesAsync();
        }

        [HttpPost]
        public async Task<TeacherDto> CreateTeacher([FromBody] TeacherDto teacherDto)
        {
            var teacher = _mapper.Map<Teacher>(teacherDto);


            await _context.Teachers.AddAsync(teacher);
            await _context.SaveChangesAsync();

            teacherDto.Id = teacher.Id;

            return teacherDto;

        }

        [HttpDelete("{id}")]
        public async Task DeleteTeacher(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);
            
            _context.Teachers.Remove(teacher);  
            await _context.SaveChangesAsync();

        }


        private async Task UpdateTeacherClasses(TeacherDto teacherDto, Teacher teacher)
        {
            var classesIds = GetClassIdsFromDto(teacherDto);

            var classes = await _context
                                    .Classes
                                    .Where(c => classesIds.Contains(c.Id))
                                    .ToListAsync();

            teacher.Classes.Clear();
            teacher.Classes.AddRange(classes);
        }

        private List<int> GetClassIdsFromDto(TeacherDto teacherDto)
        {
            var classesIds = new List<int>();

            foreach (var @class in teacherDto.Classes)
            {
                classesIds.Add(@class.Id);
            }

            return classesIds;
        }

    }
}
