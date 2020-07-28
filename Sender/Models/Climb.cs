using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Sender.Models
{
    public class Climb
    {
        [Required] 
        public int Id { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        [Required]
        public int GradeId { get; set; }
        public Grade Grade { get; set; }
        [Required]
        public string Color { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        public string VideoUrl { get; set; }
        [Required]
        public string Gym { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public int StateId { get; set; }
        public State State { get; set; }
        public string Notes { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }



    }
}
