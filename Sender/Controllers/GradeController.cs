using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sender.Data;
using Sender.Repositories;

namespace Sender.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        private readonly GradeRepository _gradeRepository;
        public GradeController(ApplicationDbContext context)
        {
            _gradeRepository = new GradeRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_gradeRepository.GetAll());
        }
    }
}
