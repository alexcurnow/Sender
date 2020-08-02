using Microsoft.EntityFrameworkCore;
using Sender.Data;
using Sender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sender.Repositories
{
    public class ClimbRepository
    {
        private readonly ApplicationDbContext _context;

        public ClimbRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Climb> GetAll()
        {
            return _context.Climb
                            .Include(c => c.UserProfile)
                            .Include(c => c.Grade)
                            .Include(c => c.State)
                            .OrderByDescending(c => c.DateCreated)
                            .ToList();
        }

        public List<Climb> GetByUserProfileId(int id)
        {
            return _context.Climb
                            .Include(c => c.UserProfile)
                            .Include(c => c.Grade)
                            .Include(c => c.State)
                            .OrderByDescending(c => c.DateCreated)
                            .Where(c => c.UserProfileId == id)
                            .ToList();
        }

        public void AddClimb(Climb climb)
        {
            _context.Add(climb);
            _context.SaveChanges();
        }

        public Climb GetById(int id)
        {
           return _context.Climb
                      .Include(c => c.UserProfile)
                            .Include(c => c.Grade)
                            .Include(c => c.State)
                            .FirstOrDefault(c => c.Id == id);
        }

        public void DeleteClimb(int id)
        {
            var climb = _context.Climb.FirstOrDefault(c => c.Id == id);
            _context.Climb.Remove(climb);
            _context.SaveChanges();

        }
        public void Update(Climb climb)
        {
            _context.Entry(climb).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public List<Climb> Search(string criterion)
        {
            var query = _context.Climb
                                .Include(c => c.Grade)
                                .Include(c => c.State)
                                .Where(c => c.Grade.Name.Contains(criterion) ||
                                c.Gym.Contains(criterion) ||
                                c.City.Contains(criterion) ||
                                c.State.Name.Contains(criterion) ||
                                c.State.Acronym.Contains(criterion) ||
                                c.Notes.Contains(criterion))
                                .OrderByDescending(c => c.DateCreated).ToList();

            return query;

        }
    }
}
