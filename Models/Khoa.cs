using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Khoa
    {
        public Khoa()
        {
            Bomon = new HashSet<Bomon>();
            Thongbao = new HashSet<Thongbao>();
        }

        public string Makhoa { get; set; }
        public string Tenkhoa { get; set; }

        public virtual ICollection<Bomon> Bomon { get; set; }
        public virtual ICollection<Thongbao> Thongbao { get; set; }
    }
}
