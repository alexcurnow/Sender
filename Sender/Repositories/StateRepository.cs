using Sender.Data;
using Sender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sender.Repositories
{
    public class StateRepository
    {
        private readonly ApplicationDbContext _context;

        public StateRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<State> GetAll()
        {
            return _context.State
                            .ToList();
        }
    }
}
