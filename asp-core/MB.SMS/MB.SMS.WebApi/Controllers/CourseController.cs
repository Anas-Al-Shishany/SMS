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
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CourseController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<List<CourseDto>> GetCourses()
        {
            var courses = await _context
                                        .Courses
                                        .ToListAsync();

            var courseDtos = _mapper.Map<List<Course>, List<CourseDto>>(courses);

            return courseDtos;
        }

        [HttpGet("{id}")]
        public async Task<CourseDto> GetCourse(int id)
        {
            var course = await _context
                                        .Courses
                                        .Include(c => c.Classes)
                                        .Where(c => c.Id == id)
                                        .SingleOrDefaultAsync();

            var courseDto = _mapper.Map<CourseDto>(course);

            return courseDto;



        }


        [HttpPut("{id}")]
        public async Task EditCourse(int id, [FromBody] CourseDto courseDto)
        {
            var course = await _context
                                        .Courses
                                        .FindAsync(id);

            _mapper.Map(courseDto, course);

            _context.Courses.Update(course);
            await _context.SaveChangesAsync();
        }


        [HttpPost]
        public async Task<CourseDto> CreateCourse([FromBody] CourseDto courseDto)
        {
            var course = _mapper.Map<Course>(courseDto);

            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();

            courseDto.Id = course.Id;

            return courseDto;


        }

        [HttpDelete("{id}")]
        public async Task DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

        }
    }
}
