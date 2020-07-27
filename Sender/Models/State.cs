using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Sender.Models
{
    public class State
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Acronym { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
