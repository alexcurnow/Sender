using Microsoft.EntityFrameworkCore;
using Sender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sender.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Climb> Climb { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Grade> Grade { get; set; }
        public DbSet<Limb> Limb { get; set; }
        public DbSet<Move> Move { get; set; }
        public DbSet<State> State { get; set; }
        public DbSet<UserClimbSolved> UserClimbSolved { get; set; }
        public DbSet<UserProfile> UserProfile { get; set; }
    }
}
