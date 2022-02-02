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
                                        .Where(c => c.Id == id)
                                        .SingleOrDefaultAsync();

            var classDto = _mapper.Map<ClassDto>(@class);

            return classDto;



        }

        [HttpPost]
        public async Task<ClassDto> CreateClass([FromBody] ClassDto classDto)
        {
            var driver = _mapper.Map<Class>(classDto);
            await _context.Classes.AddAsync(driver);
            await _context.SaveChangesAsync();

            classDto.Id = driver.Id;
            return classDto;
        }

        [HttpPut("{id}")]
        public async Task EditClass(int id, [FromBody] ClassDto classDto)
        {
            var @class = await _context
                                        .Classes
                                        .FindAsync(id);

            _mapper.Map(classDto, @class);

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
    }
}
