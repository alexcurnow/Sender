using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sender.Data;
using Sender.Models;

namespace Sender.Repositories
{
    public class CommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Comment> GetCommentsByClimbId(int id)
        {
            return _context.Comment.Include(c => c.Climb)
                            .Include(c => c.UserProfile)
                            .Where(c => c.ClimbId == id)
                            .OrderByDescending(c => c.DateCreated)
                            .ToList();
        }

        public void AddComment(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void DeleteComment(int id)
        {
            var comment = _context.Comment.FirstOrDefault(c => c.Id == id);
            _context.Comment.Remove(comment);
            _context.SaveChanges();

        }
        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}