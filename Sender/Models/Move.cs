using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Sender.Models
{
    public class Move
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int ClimbId { get; set; }
        public Climb Climb { get; set; }
        [Required]
        public int LimbId { get; set; }
        public Limb Limb { get; set; }
        [Required]
        public int SequenceNumber { get; set; }
        [Required]
        public int Xcoord { get; set; }
        [Required]
        public int Ycoord { get; set; }
        [Required]
        public int Radius { get; set; }
    }
}
