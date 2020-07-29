using Sender.Data;
using Sender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sender.Repositories
{
    public class LimbRepository
    {
        private readonly ApplicationDbContext _context;

        public LimbRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Limb> GetAll()
        {
            return _context.Limb.ToList();
        }
    }
}
