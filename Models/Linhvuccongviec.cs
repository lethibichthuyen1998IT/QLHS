using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Linhvuccongviec
    {
        public Linhvuccongviec()
        {
            Danhmuc = new HashSet<Danhmuc>();
        }

        public int Masolinhvuc { get; set; }
        public string Tenlinhvuc { get; set; }

        public virtual ICollection<Danhmuc> Danhmuc { get; set; }
    }
}
