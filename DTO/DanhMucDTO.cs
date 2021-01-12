using QuanLyHieuSuat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyHieuSuat.DTO
{
    public class DanhMucDTO
    {
        public int Masodanhmuc { get; set; }
        public int? Masolinhvuc { get; set; }
        public string Tendanhmuc { get; set; }
        public string Tenlinhvuc { get; set; }
        public int? Diemdg { get; set; }

        public virtual Linhvuccongviec MasolinhvucNavigation { get; set; }
        public virtual ICollection<Congviec> Congviec { get; set; }
    }
}
