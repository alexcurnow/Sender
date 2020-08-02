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
    public class ClimbController : ControllerBase
    {

        private readonly ClimbRepository _climbRepository;
        public ClimbController(ApplicationDbContext context)
        {
            _climbRepository = new ClimbRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_climbRepository.GetAll());
        }

        [HttpGet("getByUser/{id}")]
        public IActionResult GetByUser(int id)
        {
            return Ok(_climbRepository.GetByUserProfileId(id));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_climbRepository.GetById(id));
        }

        [HttpPost]
        public IActionResult Post(Climb climb)
        {
            climb.DateCreated = DateTime.Now;
            _climbRepository.AddClimb(climb);
            return CreatedAtAction("Get", new { id = climb.Id }, climb);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _climbRepository.DeleteClimb(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Climb climb)
        {
            if (id != climb.Id)
            {
                return BadRequest();
            }
            _climbRepository.Update(climb);
            return NoContent();

        }
    } 
}
