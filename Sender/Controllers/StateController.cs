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
    public class StateController : ControllerBase
    {
        private readonly StateRepository _stateRepository;
        public StateController(ApplicationDbContext context)
        {
            _stateRepository = new StateRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_stateRepository.GetAll());
        }
    }
}
