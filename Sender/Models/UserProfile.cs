using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Sender.Models
{
    public class UserProfile
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string FirebaseUserId { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string ImageLocation { get; set; }
    }
}
