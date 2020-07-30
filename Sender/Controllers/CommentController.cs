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
    public class CommentController : ControllerBase
    {
        private readonly CommentRepository _commentRepository;
        public CommentController(ApplicationDbContext context)
        {
            _commentRepository = new CommentRepository(context);
        }

        [HttpGet("getByClimb/{id}")]
        public IActionResult GetByClimbId(int id)
        {
            return Ok(_commentRepository.GetCommentsByClimbId(id));
        }

        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            comment.DateCreated = DateTime.Now;
            _commentRepository.AddComment(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.DeleteComment(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }
            _commentRepository.Update(comment);
            return NoContent();

        }
    }
}