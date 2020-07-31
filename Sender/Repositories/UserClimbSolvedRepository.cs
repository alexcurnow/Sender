using Microsoft.EntityFrameworkCore;
using Sender.Data;
using Sender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sender.Repositories
{
    public class UserClimbSolvedRepository
    {
        private readonly ApplicationDbContext _context;

        public UserClimbSolvedRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<UserClimbSolved> GetAll()
        {
            return _context.UserClimbSolved.Include(uc => uc.Climb).Include(uc => uc.UserProfile).ToList();
        }

        public List<UserClimbSolved> GetByUserProfileId(int id)
        {
            return _context.UserClimbSolved
                            .Include(uc => uc.Climb)
                            .Include(uc => uc.UserProfile)
                            .Where(uc => uc.UserProfileId == id)
                            .ToList();
        }

        public void AddUserClimbSolved(UserClimbSolved userClimbSolved)
        {
            _context.Add(userClimbSolved);
            _context.SaveChanges();
        }
    }
}

