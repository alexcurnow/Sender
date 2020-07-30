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
    public class LimbController : ControllerBase
    {
        private readonly LimbRepository _limbRepository;
        public LimbController(ApplicationDbContext context)
        {
            _limbRepository = new LimbRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_limbRepository.GetAll());
        }
    }
}
