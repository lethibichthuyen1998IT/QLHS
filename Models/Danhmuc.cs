using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Danhmuc
    {
        public Danhmuc()
        {
            Congviec = new HashSet<Congviec>();
        }

        public int Masodanhmuc { get; set; }
        public int? Masolinhvuc { get; set; }
        public string Tendanhmuc { get; set; }

        public virtual Linhvuccongviec MasolinhvucNavigation { get; set; }
        public virtual ICollection<Congviec> Congviec { get; set; }
    }
}
