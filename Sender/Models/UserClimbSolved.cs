using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace Sender.Models
{
    public class UserClimbSolved
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        [Required]
        public int ClimbId { get; set; }
        public Climb Climb { get; set; }
    }
}
