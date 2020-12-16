using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Khenthuong
    {
        public int Manamhoc { get; set; }
        public string Mavienchuc { get; set; }
        public string Loaikhenthuong { get; set; }

        public virtual Namhoc ManamhocNavigation { get; set; }
        public virtual Vienchuc MavienchucNavigation { get; set; }
    }
}
