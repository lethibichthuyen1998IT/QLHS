using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Chucnang
    {
        public Chucnang()
        {
            Quyen = new HashSet<Quyen>();
        }

        public string Machucnang { get; set; }
        public string Tenchucnang { get; set; }

        public virtual ICollection<Quyen> Quyen { get; set; }
    }
}
