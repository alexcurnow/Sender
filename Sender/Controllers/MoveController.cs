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
    public class MoveController : ControllerBase
    {
        private readonly MoveRepository _moveRepository;
        public MoveController(ApplicationDbContext context)
        {
            _moveRepository = new MoveRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_moveRepository.GetAll());
        }

        [HttpGet("getbyclimb/{id}")]
        public IActionResult GetByClimb(int id)
        {
            return Ok(_moveRepository.GetByClimbId(id));
        }

        [HttpPost]
        public IActionResult Post(Move move)
        {
            _moveRepository.AddMove(move);
            return CreatedAtAction("Get", new { id = move.Id }, move);
        }
    }
}
