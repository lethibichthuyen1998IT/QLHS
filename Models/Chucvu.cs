using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Chucvu
    {
        public Chucvu()
        {
            Quyen = new HashSet<Quyen>();
        }

        public string Machucvu { get; set; }
        public string Tenchucvu { get; set; }

        public virtual ICollection<Quyen> Quyen { get; set; }
    }
}
