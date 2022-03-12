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
    public class ClassController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ClassController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<ClassDto>> GetClasses()
        {
            var classes = await _context
                                        .Classes
                                        .Include(t => t.Teacher)
                                        .Include(c => c.Course)
                                        .ToListAsync();

            var classDtos = _mapper.Map<List<Class>, List<ClassDto>>(classes);

            return classDtos;
        }

        [HttpGet("{id}")]
        public async Task<ClassDto> GetClass(int id)
        {
            var @class = await _context
                                        .Classes
                                        .Include(s => s.Students)
                                        .Include(c => c.Course)
                                        .Include(t => t.Teacher)
                                        .Where(c => c.Id == id)
                                        .SingleOrDefaultAsync();

            var classDto = _mapper.Map<ClassDto>(@class);

            return classDto;



        }

        [HttpPost]
        public async Task<ClassDto> CreateClass([FromBody] ClassDto classDto)
        {
            var @class = _mapper.Map<Class>(classDto);

            await UpdateClassesStudents(classDto, @class);

            await _context.Classes.AddAsync(@class);

            await _context.SaveChangesAsync();


            classDto.Id = @class.Id;
            return classDto;
        }

        [HttpPut("{id}")]
        public async Task EditClass(int id, [FromBody] ClassDto classDto)
        {
            var @class = await _context
                                        .Classes
                                        .Include(c => c.Teacher)
                                        .Include(c => c.Course)
                                        .Include(c => c.Students)
                                        .Where(c => c.Id == id)
                                        .SingleOrDefaultAsync();

            _mapper.Map(classDto, @class);

            await UpdateClassesStudents(classDto, @class);

            if (classDto.CourseId.HasValue)
            {
                var course = await _context.Courses.FindAsync(classDto.CourseId);
                @class.Course = course;
            }
            if (classDto.TeacherId.HasValue)
            {
                var teacher = await _context.Teachers.FindAsync(classDto.TeacherId);
                @class.Teacher = teacher;
            }

            _context.Classes.Update(@class);
            await _context.SaveChangesAsync();
        }



        [HttpDelete("{id}")]
        public async Task DeleteClass(int id)
        {
            var @class = await _context.Classes.FindAsync(id);

            _context.Classes.Remove(@class);
            await _context.SaveChangesAsync();

        }


        private async Task UpdateClassesStudents(ClassDto classDto, Class @class)
        {
            var studentsIds = GetStudentIdsFromDto(classDto);

            var students = await _context
                                    .Students
                                    .Where(s => studentsIds.Contains(s.Id))
                                    .ToListAsync();

            @class.Students.Clear();
            @class.Students.AddRange(students);
        }

        private List<int> GetStudentIdsFromDto(ClassDto classDto)
        {
            var studentsIds = new List<int>();

            foreach (var @class in classDto.Students)
            {
                studentsIds.Add(@class.Id);
            }

            return studentsIds;
        }
    }
}
