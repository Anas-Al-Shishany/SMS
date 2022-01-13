﻿using System;
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
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public StudentController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<List<StudentDto>> GetStudents()
        {
            var students = await _context
                                        .Students
                                        .ToListAsync();

            var studentDtos = _mapper.Map<List<Student>, List<StudentDto>>(students);

            return studentDtos;
        }

        [HttpGet("{id}")]
        public async Task<StudentDto> GetStudent(int id)
        {
            var student = await _context
                                        .Students
                                        .Include(s => s.Classes)
                                        .Where(s => s.Id == id)
                                        .SingleOrDefaultAsync();

            var studentDto = _mapper.Map<StudentDto>(student);

            return studentDto;

           

        }


        [HttpPut("{id}")]
        public async Task EditStudent(int id, [FromBody] StudentDto studentDto)
        {
            var student = await _context
                                        .Students
                                        .FindAsync(id);

            _mapper.Map(studentDto, student);

            _context.Students.Update(student);
            await _context.SaveChangesAsync();
        }


        [HttpPost]
        public async Task<StudentDto> CreateStudent([FromBody] StudentDto studentDto)
        {
            var student = _mapper.Map<Student>(studentDto);

            await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();

            studentDto.Id = student.Id;

            return studentDto;

            
        }

        [HttpDelete("{id}")]
        public async Task DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            
            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

        }

        
    }
}
