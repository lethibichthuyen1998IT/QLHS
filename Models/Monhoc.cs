using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Monhoc
    {
        public Monhoc()
        {
            Phancong = new HashSet<Phancong>();
        }

        public int Idmonhoc { get; set; }
        public string Tenmonhoc { get; set; }
        public int? Sotc { get; set; }
        public int? Sotietth { get; set; }
        public int? Sotietlt { get; set; }

        public virtual ICollection<Phancong> Phancong { get; set; }
    }
}
