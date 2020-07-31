using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sender.Data;
using Sender.Models;
using Sender.Repositories;

namespace Sender.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserClimbSolvedController : ControllerBase
    {
        private readonly UserClimbSolvedRepository _userclimbSolvedRepository;
        public UserClimbSolvedController(ApplicationDbContext context)
        {
            _userclimbSolvedRepository = new UserClimbSolvedRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userclimbSolvedRepository.GetAll());
        }

        [HttpGet("getbyuserprofile/{id}")]
        public IActionResult GetByUserProfileId(int id)
        {
            return Ok(_userclimbSolvedRepository.GetByUserProfileId(id));
        }

        [HttpPost]
        public IActionResult Post(UserClimbSolved userclimbSolved)
        {
            _userclimbSolvedRepository.AddUserClimbSolved(userclimbSolved);
            return CreatedAtAction("Get", new { id = userclimbSolved.Id }, userclimbSolved);
        }
    }
}
