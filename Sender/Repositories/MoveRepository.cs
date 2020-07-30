using Microsoft.EntityFrameworkCore;
using Sender.Data;
using Sender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sender.Repositories
{
    public class MoveRepository
    {
        private readonly ApplicationDbContext _context;

        public MoveRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Move> GetAll()
        {
            return _context.Move.Include(m => m.Climb).Include(m => m.Limb).ToList();
        }

        public List<Move> GetByClimbId(int id)
        {
            return _context.Move
                            .Include(m => m.Climb)
                            .Include(m => m.Limb)
                            .Where(m => m.ClimbId == id)
                            .OrderBy(m => m.SequenceNumber)
                            .ToList();
        }

        public void AddMove(Move move)
        {
            _context.Add(move);
            _context.SaveChanges();
        }
    }
}
