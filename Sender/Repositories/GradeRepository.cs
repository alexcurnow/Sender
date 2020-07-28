using Sender.Data;
using Sender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sender.Repositories
{
    public class GradeRepository
    {
        private readonly ApplicationDbContext _context;

        public GradeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Grade> GetAll()
        {
            return _context.Grade
                            .ToList();
        }
    }
}
